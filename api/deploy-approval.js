import { readStackStatus, triggerWake } from '../lib/deploy.js';
import { verifyApprovalToken } from '../lib/approval.js';

const SITE_URL = (process.env.DEPLOY_SITE_URL || 'https://mcastillo.dev').replace(/\/+$/, '');
const APP_URL = process.env.DEPLOY_APP_URL || 'https://triplanner.mcastillo.dev';

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[character],
  );
}

function parseForm(body) {
  if (!body) return {};
  if (typeof body === 'string') return Object.fromEntries(new URLSearchParams(body));
  if (Buffer.isBuffer(body)) {
    return Object.fromEntries(new URLSearchParams(body.toString('utf8')));
  }
  return body;
}

function renderPage({ title, heading, lead, content = '' }) {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <meta name="referrer" content="no-referrer" />
    <title>${escapeHtml(title)} · mcastillo.dev</title>
    <style>
      :root {
        color-scheme: dark;
        --canvas: #09090a;
        --surface: #111113;
        --elevated: #19191c;
        --fg: #f2f1ee;
        --fg-soft: #c9c7c1;
        --muted: #8f8d87;
        --line: #2a2a2f;
        --accent: #ff4d3f;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 24px;
        background: var(--canvas);
        color: var(--fg);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
      }
      main { width: 100%; max-width: 560px; }
      .eyebrow {
        margin: 0 0 14px;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 11px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--accent);
      }
      .card {
        border: 1px solid var(--line);
        background: var(--elevated);
        padding: 28px;
      }
      h1 {
        margin: 0 0 14px;
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 34px;
        line-height: 1.05;
        font-weight: 400;
        letter-spacing: -0.03em;
      }
      p { margin: 0; color: var(--fg-soft); font-size: 15px; line-height: 1.65; }
      .meta {
        margin-top: 18px;
        padding-top: 14px;
        border-top: 1px solid var(--line);
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 11px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--muted);
      }
      .actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
      .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 44px;
        border: 1px solid var(--accent);
        background: var(--accent);
        color: var(--canvas);
        padding: 10px 18px;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 11px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        text-decoration: none;
        cursor: pointer;
      }
      .button-secondary {
        border-color: var(--line);
        background: transparent;
        color: var(--fg-soft);
      }
      .button-secondary:hover { border-color: var(--accent); color: var(--accent); }
      .note {
        margin-top: 18px;
        padding: 12px 14px;
        border: 1px solid var(--line);
        background: var(--surface);
        font-size: 12px;
        line-height: 1.6;
        color: var(--muted);
      }
      .error { color: #ff8a80; }
      form { margin: 0; }
    </style>
  </head>
  <body>
    <main>
      <p class="eyebrow">mcastillo.dev · deploy gate</p>
      <div class="card">
        <h1>${escapeHtml(heading)}</h1>
        <p>${lead}</p>
        ${content}
        <p class="meta">Solicitud registrada · Triplanner</p>
      </div>
    </main>
  </body>
</html>`;
}

function sendHtml(res, status, html) {
  res.status(status);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
  );
  res.send(html);
}

function resultPage({ heading, lead, appLink = false }) {
  const link = appLink
    ? `<a class="button" href="${escapeHtml(APP_URL)}" rel="noreferrer">Abrir Triplanner</a>`
    : `<a class="button" href="${escapeHtml(SITE_URL)}">Volver al sitio</a>`;

  return renderPage({
    title: heading,
    heading,
    lead,
    content: `
      <div class="actions">${link}</div>
      <p class="note">Puedes cerrar esta página. El estado del stack se actualiza en el sitio.</p>
    `,
  });
}

export default async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method === 'GET') {
    const url = new URL(req.url || '/', `https://${req.headers.host || 'mcastillo.dev'}`);
    const token = url.searchParams.get('token') || '';
    const action = url.searchParams.get('action') === 'reject' ? 'reject' : 'approve';
    const payload = verifyApprovalToken(token);

    if (!payload) {
      return sendHtml(
        res,
        400,
        renderPage({
          title: 'Enlace inválido',
          heading: 'Enlace inválido',
          lead: 'El enlace expiró o no es válido. Vuelve a pedir el deploy desde el sitio para generar uno nuevo.',
          content: `<div class="actions"><a class="button" href="${escapeHtml(SITE_URL)}">Volver al sitio</a></div>`,
        }),
      );
    }

    const name = escapeHtml(payload.n || 'Solicitud de deploy');
    const isApprove = action === 'approve';
    const title = isApprove ? 'Aprobar deploy' : 'Rechazar deploy';

    return sendHtml(
      res,
      200,
      renderPage({
        title,
        heading: title,
        lead: `Solicitud de <strong>${name}</strong> para despertar el stack AWS efímero de Triplanner.`,
        content: `
          <div class="note">
            ${
              isApprove
                ? 'El stack no se despertará hasta que confirmes. El workflow tarda entre 8 y 12 minutos.'
                : 'No se ejecutará ningún workflow. El stack seguirá dormido.'
            }
          </div>
          <form method="post" action="/api/deploy-approval">
            <input type="hidden" name="token" value="${escapeHtml(token)}" />
            <input type="hidden" name="action" value="${isApprove ? 'approve' : 'reject'}" />
            <div class="actions">
              <button class="button" type="submit">
                ${isApprove ? 'Confirmar y despertar Triplanner' : 'Confirmar rechazo'}
              </button>
              <a class="button button-secondary" href="${escapeHtml(SITE_URL)}">Cancelar</a>
            </div>
          </form>
        `,
      }),
    );
  }

  if (req.method === 'POST') {
    const body = parseForm(req.body);
    const token = typeof body.token === 'string' ? body.token : '';
    const action = body.action === 'reject' ? 'reject' : 'approve';
    const payload = verifyApprovalToken(token);

    if (!payload) {
      return sendHtml(
        res,
        400,
        resultPage({
          heading: 'Enlace inválido',
          lead: 'El enlace expiró o no es válido. Vuelve a pedir el deploy desde el sitio para generar uno nuevo.',
        }),
      );
    }

    if (action === 'reject') {
      return sendHtml(
        res,
        200,
        resultPage({
          heading: 'Deploy rechazado',
          lead: `La solicitud de ${escapeHtml(payload.n || 'deploy')} no fue aprobada. No se despertó el stack ni se ejecutó ningún workflow.`,
        }),
      );
    }

    const { state } = await readStackStatus();

    if (state === 'awake') {
      return sendHtml(
        res,
        200,
        resultPage({
          heading: 'Ya estaba despierto',
          lead: 'El stack ya estaba en línea. No se ejecutó ningún workflow adicional.',
          appLink: true,
        }),
      );
    }

    if (state === 'waking') {
      return sendHtml(
        res,
        200,
        resultPage({
          heading: 'Ya está despertando',
          lead: 'El workflow de wake ya estaba en progreso. No se disparó otro.',
          appLink: true,
        }),
      );
    }

    const ok = await triggerWake();

    if (!ok) {
      return sendHtml(
        res,
        502,
        resultPage({
          heading: 'No se pudo iniciar el workflow',
          lead: 'El control plane no respondió. Revisa AWS o vuelve a intentarlo desde el email.',
        }),
      );
    }

    return sendHtml(
      res,
      200,
      resultPage({
        heading: 'Deploy aprobado',
        lead: 'El stack está despertando. Suele tardar entre 8 y 12 minutos; después estará disponible en triplanner.mcastillo.dev.',
        appLink: true,
      }),
    );
  }

  res.status(405);
  res.setHeader('Allow', 'GET, POST');
  return res.send('Method not allowed');
}
