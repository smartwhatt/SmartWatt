/**
 * Syncs portfolio content from github.com/smartwhatt/cv-resume.
 *
 *   pnpm cv:sync              # parse the remote CV and write it into Payload
 *   pnpm cv:sync --dry        # print the parsed payload, write nothing
 *   pnpm cv:sync --local ../cv-resume --url http://localhost:3001
 *
 * The parsing and mapping happen here; the write goes through the dev-only
 * `/dev/seed` route so Payload's runtime is the one touching the database.
 */
import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { config as loadEnv } from 'dotenv'

import { buildSeed } from './cv-map'
import { asDict, readLet } from './typst'

loadEnv({ path: '.env.local' })

const REPO = 'https://raw.githubusercontent.com/smartwhatt/cv-resume/main'

function arg(name: string) {
  const index = process.argv.indexOf(`--${name}`)
  return index === -1 ? undefined : process.argv[index + 1]
}

const dry = process.argv.includes('--dry')
const baseUrl = arg('url') ?? 'http://localhost:3000'
const localDir = arg('local')

async function source(file: string) {
  if (localDir) {
    return readFile(path.join(localDir, file), 'utf8')
  }

  const response = await fetch(`${REPO}/${file}`, {
    cache: 'no-store',
    headers: { 'user-agent': 'smartwatt-portfolio-cv-sync' },
  })

  if (!response.ok) {
    throw new Error(`Could not fetch ${file}: ${response.status} ${response.statusText}`)
  }

  return response.text()
}

async function main() {
  const [localeSource, commonSource] = await Promise.all([
    source('locales/en.typ'),
    source('data/common.typ'),
  ])

  const locale = asDict(readLet(localeSource, 'locale'), 'locale')
  const common = asDict(readLet(commonSource, 'common'), 'common')
  const data = buildSeed(locale, common)

  if (dry) {
    console.log(JSON.stringify(data, null, 2))
    return
  }

  const token = process.env.DEV_SEED_TOKEN
  if (!token) throw new Error('DEV_SEED_TOKEN is missing from .env.local')

  const response = await fetch(`${baseUrl}/dev/seed`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-seed-token': token },
    body: JSON.stringify(data),
  })

  const body = (await response.json().catch(() => ({}))) as { error?: string; counts?: unknown }

  if (!response.ok) {
    throw new Error(
      `${response.status} ${body.error ?? response.statusText}. Is \`pnpm dev\` running at ${baseUrl}?`,
    )
  }

  console.log('Synced from cv-resume:', JSON.stringify(body.counts))
  console.log(`Site: ${data.site.name} · ${data.work.length} work · ${data.experience.length} experience · ${data.education.length} education`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
