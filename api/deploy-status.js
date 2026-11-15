const DEFAULT_STATUS_URL = 'https://zev4y8ny7l.execute-api.us-east-1.amazonaws.com/status';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('CDN-Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch(process.env.DEPLOY_STATUS_URL || DEFAULT_STATUS_URL, {
      method: 'GET',
      headers: { accept: 'application/json' },
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) {
      return res.status(502).json({ error: 'status_unavailable' });
    }

    const data = await response.json();
    return res.status(200).json({
      state: typeof data.state === 'string' ? data.state : 'unknown',
      updatedAt: data.updated_at ?? null,
      lastActivityAt: data.last_activity_at ?? null,
    });
  } catch {
    return res.status(502).json({ error: 'status_unavailable' });
  } finally {
    clearTimeout(timeoutId);
  }
}
