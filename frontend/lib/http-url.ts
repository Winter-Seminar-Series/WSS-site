/** The URL when it is an absolute http(s) one, else `null`: the only schemes allowed into an `href`. */
export function parseHttpUrl(value: string | null | undefined): URL | null {
  try {
    const url = new URL((value ?? '').trim());
    return url.protocol === 'https:' || url.protocol === 'http:' ? url : null;
  } catch {
    return null;
  }
}
