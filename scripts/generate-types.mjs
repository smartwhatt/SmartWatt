/**
 * Payload's own CLI loads through tsx, which currently breaks on this
 * project's Next/undici combination. Compiling the config with esbuild and
 * importing it natively sidesteps the loader entirely.
 *
 *   npm run generate:types
 */
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { build } from 'esbuild'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bundled = path.join(root, '.tmp', 'payload.config.mjs')

await mkdir(path.dirname(bundled), { recursive: true })
await build({
  entryPoints: [path.join(root, 'payload.config.ts')],
  outfile: bundled,
  bundle: true,
  platform: 'node',
  format: 'esm',
  packages: 'external',
  logLevel: 'error',
})

process.env.PAYLOAD_TS_OUTPUT_PATH = path.join(root, 'payload-types.ts')

const { default: config } = await import(`${pathToFileURL(bundled).href}?v=${Date.now()}`)
const { generateTypes } = await import('payload/node')

await generateTypes(await config)
