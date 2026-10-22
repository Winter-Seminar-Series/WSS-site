/** Expiry of a JWT in epoch milliseconds, or 0 when it cannot be read. Does not verify the signature. */
export function jwtExpiresAt(token: string): number {
  const [, payload] = token.split('.');
  if (!payload) return 0;
  try {
    const json: unknown = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    if (json && typeof json === 'object' && 'exp' in json && typeof json.exp === 'number') return json.exp * 1000;
  } catch {
    // Malformed token.
  }
  return 0;
}
