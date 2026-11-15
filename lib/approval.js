import crypto from 'node:crypto';

const DEFAULT_APPROVAL_TTL_SECONDS = 48 * 60 * 60;
const DEFAULT_PENDING_TTL_SECONDS = 30 * 60;

function getSecret() {
  return process.env.DEPLOY_APPROVAL_SECRET || process.env.RESEND_API_KEY || '';
}

function sign(payload) {
  const secret = getSecret();
  if (!secret) return null;

  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(body).digest('base64url');
  return `${body}.${signature}`;
}

function verify(token) {
  const secret = getSecret();
  if (!secret || typeof token !== 'string') return null;

  const [body, signature] = token.split('.');
  if (!body || !signature) return null;

  const expected = crypto.createHmac('sha256', secret).update(body).digest('base64url');
  if (signature.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (!payload || payload.v !== 1 || typeof payload.x !== 'number') return null;
    if (payload.x < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getApprovalTtlSeconds() {
  const value = Number(process.env.DEPLOY_APPROVAL_TTL_SECONDS ?? DEFAULT_APPROVAL_TTL_SECONDS);
  return Number.isFinite(value) && value > 0 ? value : DEFAULT_APPROVAL_TTL_SECONDS;
}

export function getPendingTtlSeconds() {
  const value = Number(process.env.DEPLOY_PENDING_TTL_SECONDS ?? DEFAULT_PENDING_TTL_SECONDS);
  return Number.isFinite(value) && value > 0
    ? Math.min(value, 24 * 60 * 60)
    : DEFAULT_PENDING_TTL_SECONDS;
}

export function createApprovalToken({ name }) {
  return sign({
    v: 1,
    n: name,
    x: Math.floor(Date.now() / 1000) + getApprovalTtlSeconds(),
    i: crypto.randomBytes(12).toString('base64url'),
  });
}

export function verifyApprovalToken(token) {
  const payload = verify(token);
  if (!payload || typeof payload.n !== 'string') return null;
  return payload;
}

export function createRequestCookie({ ttlSeconds = getPendingTtlSeconds() } = {}) {
  return sign({
    v: 1,
    p: 1,
    x: Math.floor(Date.now() / 1000) + ttlSeconds,
  });
}

export function verifyRequestCookie(token) {
  const payload = verify(token);
  if (!payload || payload.p !== 1) return null;
  return payload;
}
