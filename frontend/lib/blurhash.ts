import { decode } from 'blurhash';
import { deflateSync } from 'node:zlib';

/**
 * Turns the BlurHash the API stores next to every image (https://blurha.sh) into a tiny PNG data URL for
 * `next/image`'s `blurDataURL`. Server-only: it uses `node:zlib`, so decode in `api/` and pass the URL down.
 */

/** next/image scales and blurs the placeholder, so a few pixels per side already look smooth. */
const SIZE = 16;
const CACHE_LIMIT = 1000;

const cache = new Map<string, string | null>();

const CRC_TABLE = Uint32Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(bytes: Uint8Array): number {
  let c = 0xffffffff;
  for (const byte of bytes) c = CRC_TABLE[(c ^ byte) & 255] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function pngChunk(type: string, data: Uint8Array): Buffer {
  const chunk = Buffer.alloc(12 + data.length);
  chunk.writeUInt32BE(data.length, 0);
  chunk.write(type, 4, 'ascii');
  chunk.set(data, 8);
  chunk.writeUInt32BE(crc32(chunk.subarray(4, 8 + data.length)), 8 + data.length);
  return chunk;
}

function encodePng(rgba: Uint8ClampedArray): Buffer {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(SIZE, 0);
  header.writeUInt32BE(SIZE, 4);
  header[8] = 8; // bit depth
  header[9] = 6; // truecolor with alpha, which is what `decode` returns
  const stride = SIZE * 4;
  const rows = Buffer.alloc((stride + 1) * SIZE); // each scanline starts with filter type 0
  for (let y = 0; y < SIZE; y++) rows.set(rgba.subarray(y * stride, (y + 1) * stride), y * (stride + 1) + 1);
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    pngChunk('IHDR', header),
    pngChunk('IDAT', deflateSync(rows, { level: 9 })),
    pngChunk('IEND', new Uint8Array()),
  ]);
}

/**
 * `data:image/png;base64,…` for a BlurHash, or `null` when there is none (old API, image without a hash) or it is
 * malformed: a bad placeholder must never break the page, the image just loads without one.
 */
export function blurDataUrl(hash: string | null | undefined): string | null {
  if (!hash) return null;
  const cached = cache.get(hash);
  if (cached !== undefined) return cached;

  let url: string | null;
  try {
    url = `data:image/png;base64,${encodePng(decode(hash, SIZE, SIZE)).toString('base64')}`;
  } catch {
    url = null;
  }
  if (cache.size >= CACHE_LIMIT) cache.clear();
  cache.set(hash, url);
  return url;
}
