# SmartWatt

Personal site of Smart Wattanapornmongkol. Next.js 16, Payload CMS 3, and Postgres.

The site uses the **Quiet** direction: warm paper, a serif voice, generous space, and one
muted moss accent. Content lives in Payload and is editable at `/admin`.

## Stack

- Next.js 16.4 (App Router, Turbopack)
- Payload CMS 3.92 (admin, REST, GraphQL)
- Postgres 17 (Supabase in this project, schema `payload`)
- React 19.3
- CSS Modules, no UI framework

## Requirements

- Node.js 22.23.4 or newer. Node 24 LTS is a safe choice. Payload warns on older 22.x
  releases.
- Postgres 15+.

## Setup

1. Install dependencies.

   ```bash
   npm install
   ```

2. Copy the environment file.

   ```bash
   cp .env.local.example .env.local
   ```

3. Fill these values in `.env.local`:

   - `DATABASE_URL`: Postgres connection string. For Supabase, use the session pooler URL.
   - `PAYLOAD_SECRET`: run `openssl rand -hex 32`.
   - `PAYLOAD_PUSH=true` for local schema changes.
   - `NEXT_PUBLIC_SITE_URL=http://localhost:3000`.
   - `DEV_SEED_TOKEN`: any random string. It protects the local content sync route.

4. Start the app.

   ```bash
   npm run dev
   ```

5. Open <http://localhost:3000>. Open <http://localhost:3000/admin> and sign in.

   This project already has one admin: `smartwattana@gmail.com`. Its password is stored as
   `PAYLOAD_ADMIN_PASSWORD` in `.env.local`. Change the password after the first sign-in.
   For a fresh database, Payload shows a "create first user" form instead.

## Content model

Payload uses the `payload` Postgres schema. It does not touch the old `public` tables.

- Global **Site**: identity, hero copy, about, contact, CV links, SEO.
- Collection **Work**: papers, systems, research, projects.
- Collection **Experience**: appointments, research, teaching.
- Collection **Education**: schools and honours.
- Collection **Users**: admin login.

`sourceId` on Work, Experience, and Education makes content sync idempotent. Do not edit it
by hand.

## Sync from cv-resume

`scripts/sync-cv.ts` reads `locales/en.typ` and `data/common.typ` from
[smartwhatt/cv-resume](https://github.com/smartwhatt/cv-resume), parses the Typst data, and
posts it to the dev-only `/dev/seed` route. That route writes through the Payload local API.

1. Start the dev server: `npm run dev`.
2. Run the sync: `npm run cv:sync`.

Options:

```bash
npm run cv:sync -- --dry                 # print the parsed payload only
npm run cv:sync -- --local ../cv-resume  # read a local clone
npm run cv:sync -- --url http://localhost:3001
```

The route returns 404 in production.

## Design

The homepage is `components/designs/quiet/Quiet.tsx`. Indexing is enabled. The admin and
`/dev/seed` routes stay excluded in `public/robots.txt`.

## Motion

The page stays calm. The movement is small and respects `prefers-reduced-motion`:

- The hero enters in a short stagger: headline lines, intro, now, links, portrait.
- A section's hairline draws left to right, and its content fades up, on first view.
- Experience details open and close with a 220ms height transition.
- A thin tea ring expands from the pointer on press.
- The cup under the portrait has two loops of steam.
- A work title draws a moss underline on hover. The hero arrows shift 2px. The portrait
  scales 1.5% on hover.
- Hover movement only runs on fine pointers. Reduced motion removes movement.

Clients: [QuietMotion.tsx](components/designs/quiet/QuietMotion.tsx) and
[quiet.module.css](components/designs/quiet/quiet.module.css).

## Copy

`docs/site-copy.md` holds the visible site copy. It passes the ASD-STE100 flavored
lint at 0.36 flags per 100 words (3 nominalizations, no long sentences, no passive
voice, no semicolons). The copy layer lives in `scripts/cv-map.ts`, so a CV sync
keeps it.

## Scripts

| Command                 | Action                                                    |
| ----------------------- | --------------------------------------------------------- |
| `npm run dev`           | Start the app and Payload admin                           |
| `npm run build`         | Production build                                          |
| `npm start`             | Serve the production build                                |
| `npm run lint`          | ESLint                                                    |
| `npm run generate:types`| Regenerate `payload-types.ts` from the Payload config     |
| `npm run cv:sync`       | Sync content from the cv-resume repository                |

## Database changes

In development, `PAYLOAD_PUSH=true` lets Payload create and change tables.

Payload's CLI (`payload migrate`, `payload generate:types`) currently fails under this
project's Node/tsx/undici combination. `npm run generate:types` works around it with esbuild.
For schema changes, run the dev server with `PAYLOAD_PUSH=true` against the target database,
then deploy. For a controlled migration workflow, run the Payload CLI from a Node 24
environment.

Production must set `PAYLOAD_PUSH=false`. The tables already exist.

## Deploy to Vercel

Set these environment variables in the Vercel project:

- `DATABASE_URL`
- `PAYLOAD_SECRET`
- `NEXT_PUBLIC_SITE_URL=https://smartwatt.me`
- `PAYLOAD_PUSH=false`

Pages use `revalidate = 60`, so an editor save appears within one minute. The seed route is
disabled in production.

## Known limits

- No file uploads. The portrait is `public/img/profile.png`; work items can use URL fields.
- The admin import map is generated by `next dev`. Custom admin components would need a
  manual `importMap.js` update until the CLI issue is resolved.
- Preview routes are excluded from search engines.
