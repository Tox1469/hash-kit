# hash-kit

Wrappers simples sobre `crypto` para md5, sha1, sha256 e sha512. Inclui streaming de arquivos.

## Instalacao

```bash
npm install hash-kit
```

## Uso

```ts
import { sha256, hashFile, createHashStream } from "hash-kit";

sha256("hello");                       // digest hex
await hashFile("sha256", "big.bin");   // stream de arquivo

const h = createHashStream("sha1");
h.update("a").update("b");
h.digest("hex");
```

## API

- `md5 | sha1 | sha256 | sha512 (data, encoding?)`
- `hash(algo, data, encoding?)`
- `hashFile(algo, path, encoding?)`
- `createHashStream(algo)` -> `update()`, `digest()`

## Licenca

MIT
