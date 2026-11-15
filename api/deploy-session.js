import { verifyRequestCookie } from '../lib/approval.js';

function getCookie(req, name) {
  const header = req.headers.cookie;
  if (!header) return '';

  for (const part of String(header).split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) return rest.join('=');
  }

  return '';
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('CDN-Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const pending = verifyRequestCookie(getCookie(req, 'deploy_request'));

  return res.status(200).json({
    pending: Boolean(pending),
    expiresAt: pending?.x ?? null,
  });
}
