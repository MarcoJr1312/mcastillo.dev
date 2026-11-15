const DEFAULT_STATUS_URL = 'https://zev4y8ny7l.execute-api.us-east-1.amazonaws.com/status';
const DEFAULT_WAKE_URL = 'https://zev4y8ny7l.execute-api.us-east-1.amazonaws.com/wake';

export async function readStackStatus() {
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
      return { state: 'unknown', updatedAt: null, lastActivityAt: null };
    }

    const data = await response.json();
    return {
      state: typeof data.state === 'string' ? data.state : 'unknown',
      updatedAt: data.updated_at ?? null,
      lastActivityAt: data.last_activity_at ?? null,
    };
  } catch {
    return { state: 'unknown', updatedAt: null, lastActivityAt: null };
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function triggerWake() {
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
