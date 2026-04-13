import { createHash, Hash } from 'crypto';
import { createReadStream } from 'fs';

export type Algorithm = 'md5' | 'sha1' | 'sha256' | 'sha512';
export type Encoding = 'hex' | 'base64' | 'base64url';

export function hash(
  algo: Algorithm,
  data: string | Buffer,
  encoding: Encoding = 'hex'
): string {
  return createHash(algo).update(data).digest(encoding);
}

export const md5 = (data: string | Buffer, enc: Encoding = 'hex') =>
  hash('md5', data, enc);
export const sha1 = (data: string | Buffer, enc: Encoding = 'hex') =>
  hash('sha1', data, enc);
export const sha256 = (data: string | Buffer, enc: Encoding = 'hex') =>
  hash('sha256', data, enc);
export const sha512 = (data: string | Buffer, enc: Encoding = 'hex') =>
  hash('sha512', data, enc);

export function hashFile(
  algo: Algorithm,
  path: string,
  encoding: Encoding = 'hex'
): Promise<string> {
  return new Promise((resolve, reject) => {
    const h: Hash = createHash(algo);
    const stream = createReadStream(path);
    stream.on('error', reject);
    stream.on('data', (chunk) => h.update(chunk));
    stream.on('end', () => resolve(h.digest(encoding)));
  });
}

export class HashStream {
  private h: Hash;
  constructor(algo: Algorithm) {
    this.h = createHash(algo);
  }
  update(chunk: string | Buffer): this {
    this.h.update(chunk);
    return this;
  }
  digest(encoding: Encoding = 'hex'): string {
    return this.h.digest(encoding);
  }
}

export function createHashStream(algo: Algorithm): HashStream {
  return new HashStream(algo);
}
