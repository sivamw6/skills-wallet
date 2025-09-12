const BASE = ""; // MSW intercepts, leave empty.

export async function api(path, { method = "GET", body, headers } = {}) {
  const res = await fetch(BASE + path, {
    method,
    headers: { "Content-Type": "application/json", ...(headers || {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`API ${method} ${path} failed`);
  return res.json();
}
