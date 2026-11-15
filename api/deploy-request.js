const DEFAULT_STATUS_URL = 'https://zev4y8ny7l.execute-api.us-east-1.amazonaws.com/status';
const DEFAULT_WAKE_URL = 'https://zev4y8ny7l.execute-api.us-east-1.amazonaws.com/wake';
const DEFAULT_ALLOWED_ORIGINS =
  'https://mcastillo.dev,https://www.mcastillo.dev,http://localhost:4321';
const DEFAULT_NOTIFY_TO = 'macd.chicho@gmail.com';
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;

const POSITION_LABELS = {
  recruiter: 'Recruiter',
  developer: 'Developer',
  qa: 'QA',
  devops: 'DevOps',
  sre: 'SRE',
  product: 'Product Manager',
  designer: 'Designer',
  data: 'Data Engineer',
  manager: 'Engineering Manager',
  student: 'Student',
};

const rateHits = new Map();

function parseBody(body) {
  if (!body) return null;
  if (typeof body === 'string') return JSON.parse(body);
  if (Buffer.isBuffer(body)) return JSON.parse(body.toString('utf8'));
  return body;
}

function clean(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value
    .normalize('NFC')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function normalizeLinkedin(value) {
  const raw = clean(value, 200);
  if (!raw) return '';

  if (/^https?:\/\//i.test(raw)) {
    try {
      const url = new URL(raw);
      if (/(^|\.)linkedin\.com$/i.test(url.hostname)) return url.toString();
    } catch {
      return '';
    }
    return '';
  }

  const slug = raw.replace(/^@/, '').replace(/^in\//i, '').replace(/\/+$/, '');

  if (/^[a-zA-Z0-9][a-zA-Z0-9-]{0,99}$/.test(slug)) {
    return `https://www.linkedin.com/in/${slug}`;
  }

  return '';
}

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

function getAllowedOrigins() {
  return (process.env.DEPLOY_ALLOWED_ORIGINS || DEFAULT_ALLOWED_ORIGINS)
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
}

function getIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded || '';
  return raw.split(',')[0].trim() || String(req.headers['x-real-ip'] || '').trim() || 'unknown';
}

function checkRateLimit(ip) {
  const now = Date.now();
  const current = rateHits.get(ip);

  if (!current || current.reset <= now) {
    rateHits.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW_MS });
  } else if (current.count >= RATE_LIMIT_MAX) {
    return false;
  } else {
    current.count += 1;
  }

  if (rateHits.size > 5000) {
    for (const [key, value] of rateHits) {
      if (value.reset <= now) rateHits.delete(key);
    }
  }

  return true;
}

async function readStackState() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch(process.env.DEPLOY_STATUS_URL || DEFAULT_STATUS_URL, {
      method: 'GET',
      headers: { accept: 'application/json' },
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) return 'unknown';

    const data = await response.json();
    return typeof data.state === 'string' ? data.state : 'unknown';
  } catch {
    return 'unknown';
  } finally {
    clearTimeout(timeoutId);
  }
}

async function triggerWake() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(process.env.DEPLOY_WAKE_URL || DEFAULT_WAKE_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{}',
      cache: 'no-store',
      signal: controller.signal,
    });
    return response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function sendEmail({ name, position, company, linkedin, state, action, ip, userAgent }) {
  const to = (process.env.DEPLOY_NOTIFY_TO || DEFAULT_NOTIFY_TO)
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  const timestamp = new Date().toISOString();
  const rows = [
    ['Nombre', name],
    ['Posición', position],
    ['Empresa', company],
    ['LinkedIn', linkedin || 'No especificado'],
    ['Estado previo del stack', state],
    ['Acción', action],
    ['IP', ip],
    ['User-Agent', userAgent || 'No especificado'],
    ['Fecha', timestamp],
  ];

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e5e5;color:#6b6b6b;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e5e5;color:#111111;font-size:14px;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join('');

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#111111;">
      <p style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#ff4d3f;margin:0 0 8px;">mcastillo.dev · deploy gate</p>
      <h1 style="font-size:24px;line-height:1.2;margin:0 0 12px;">Solicitud de deploy de Triplanner</h1>
      <p style="font-size:14px;line-height:1.6;color:#444444;margin:0 0 20px;">
        Alguien envió el formulario para despertar el stack AWS efímero.
      </p>
      <table style="border-collapse:collapse;width:100%;border:1px solid #e5e5e5;">
        ${htmlRows}
      </table>
      <p style="font-size:12px;line-height:1.6;color:#888888;margin:20px 0 0;">
        Este mensaje se generó automáticamente desde el botón de deploy del caso de estudio.
      </p>
    </div>`;

  const text = [
    'Solicitud de deploy de Triplanner',
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Generado automáticamente desde mcastillo.dev.',
  ].join('\n');

  const response = await fetch(process.env.RESEND_API_URL || 'https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM,
      to,
      subject: `Solicitud de deploy · ${name}`,
      html,
      text,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Resend responded ${response.status}: ${detail.slice(0, 300)}`);
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('CDN-Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const origin = String(req.headers.origin || '');
  if (!getAllowedOrigins().includes(origin)) {
    return res.status(403).json({ error: 'origin_not_allowed' });
  }

  let body;
  try {
    body = parseBody(req.body);
  } catch {
    return res.status(400).json({ error: 'invalid_body' });
  }

  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'invalid_body' });
  }

  if (clean(body.website, 200)) {
    return res.status(200).json({ ok: true, stack: 'online', suppressed: true });
  }

  const ip = getIp(req);
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'rate_limited' });
  }

  const name = clean(body.name, 80);
  if (!name) {
    return res.status(400).json({ error: 'invalid_name' });
  }

  const position = clean(body.position, 80);
  const company = clean(body.company, 120);
  const linkedin = normalizeLinkedin(body.linkedin);

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM) {
    console.error('deploy-request: RESEND_API_KEY or RESEND_FROM is not configured');
    return res.status(503).json({ error: 'not_configured' });
  }

  const state = await readStackState();
  const alreadyUp = state === 'awake';
  const alreadyWaking = state === 'waking';
  const shouldWake = !alreadyUp && !alreadyWaking;

  const companyLabel =
    company === 'freelancer'
      ? 'Freelancer'
      : company === 'none'
        ? 'No pertenece a ninguna empresa'
        : company || 'No especificada';
  const positionLabel = Object.hasOwn(POSITION_LABELS, position)
    ? POSITION_LABELS[position]
    : position || 'No especificada';
  const actionLabel = alreadyUp
    ? 'Stack ya despierto · sin workflow'
    : alreadyWaking
      ? 'Wake ya en progreso · sin nuevo workflow'
      : 'Wake solicitado';

  try {
    await sendEmail({
      name,
      position: positionLabel,
      company: companyLabel,
      linkedin,
      state,
      action: actionLabel,
      ip,
      userAgent: clean(req.headers['user-agent'], 300),
    });
  } catch (error) {
    console.error('deploy-request: email failed', error);
    return res.status(502).json({ error: 'email_failed' });
  }

  let wakeDispatched = false;
  if (shouldWake) {
    wakeDispatched = await triggerWake();
    if (!wakeDispatched) {
      return res.status(502).json({ error: 'wake_failed' });
    }
  }

  return res.status(200).json({
    ok: true,
    stack: alreadyUp ? 'online' : 'waking',
    wakeDispatched,
    emailSent: true,
  });
}
