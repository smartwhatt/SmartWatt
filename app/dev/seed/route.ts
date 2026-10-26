import { revalidatePath } from 'next/cache'
import { getPayload } from 'payload'

import config from '@payload-config'
import { applySeed } from '@/lib/seed/apply'
import type { SeedData } from '@/scripts/cv-map'

export const dynamic = 'force-dynamic'

/**
 * Local authoring endpoint. `pnpm cv:sync` posts the CV repository's data here.
 * It is unavailable in production builds.
 */
export async function POST(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }

  const token = request.headers.get('x-seed-token')
  if (!process.env.DEV_SEED_TOKEN || token !== process.env.DEV_SEED_TOKEN) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let data: SeedData
  try {
    data = (await request.json()) as SeedData
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!data?.site?.name) {
    return Response.json({ error: 'Missing site payload' }, { status: 400 })
  }

  const payload = await getPayload({ config })
  const counts = await applySeed(payload, data)

  revalidatePath('/')
  revalidatePath('/atlas')
  revalidatePath('/poster')
  revalidatePath('/sheet')

  return Response.json({ ok: true, counts })
}
