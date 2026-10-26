import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'

import { Education } from './collections/Education'
import { Experience } from './collections/Experience'
import { Users } from './collections/Users'
import { Work } from './collections/Work'
import { Site } from './globals/Site'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — SmartWatt',
    },
  },
  collections: [Users, Work, Experience, Education],
  globals: [Site],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  telemetry: false,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      // Supabase's pooler presents a certificate chain that `pg` does not
      // ship a root for. Traffic is still TLS-encrypted.
      ssl: { rejectUnauthorized: false },
    },
    // Payload owns its own schema so the legacy public tables stay untouched.
    schemaName: 'payload',
    // `push` keeps local authoring fast. Production content is applied with
    // `pnpm db:migrate` so schema changes are deliberate and reversible.
    push: process.env.PAYLOAD_PUSH === 'true',
  }),
})
