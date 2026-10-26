import type { Payload } from 'payload'

import type { SeedData } from '@/scripts/cv-map'

type Collections = 'work' | 'experience' | 'education'

/**
 * Payload's generated types narrow `collection` to one literal slug, which a
 * loop over three collections cannot satisfy. This local surface keeps the
 * sync honest without an `any` cast in every call.
 */
type DynamicDB = {
  find(args: {
    collection: Collections
    where?: Record<string, unknown>
    limit: number
    pagination: boolean
    depth: number
    overrideAccess: boolean
  }): Promise<{ docs: Array<{ id: string | number; sourceId?: string }> }>
  create(args: {
    collection: Collections
    data: Record<string, unknown>
    overrideAccess: boolean
  }): Promise<unknown>
  update(args: {
    collection: Collections
    id: string | number
    data: Record<string, unknown>
    overrideAccess: boolean
  }): Promise<unknown>
  delete(args: {
    collection: Collections
    id: string | number
    overrideAccess: boolean
  }): Promise<unknown>
  updateGlobal(args: {
    slug: 'site'
    data: Record<string, unknown>
    overrideAccess: boolean
  }): Promise<unknown>
}

async function upsertMany(
  db: DynamicDB,
  collection: Collections,
  items: Array<Record<string, unknown> & { sourceId: string }>,
) {
  const synced: string[] = []

  for (const item of items) {
    const existing = await db.find({
      collection,
      where: { sourceId: { equals: item.sourceId } },
      limit: 1,
      pagination: false,
      depth: 0,
      overrideAccess: true,
    })

    if (existing.docs[0]) {
      await db.update({
        collection,
        id: existing.docs[0].id,
        data: item,
        overrideAccess: true,
      })
    } else {
      await db.create({ collection, data: item, overrideAccess: true })
    }

    synced.push(item.sourceId)
  }

  // Keep the CMS in step with the CV: rows that vanished upstream disappear here.
  const all = await db.find({
    collection,
    limit: 0,
    pagination: false,
    depth: 0,
    overrideAccess: true,
  })

  for (const doc of all.docs) {
    if (doc.sourceId && !synced.includes(doc.sourceId)) {
      await db.delete({ collection, id: doc.id, overrideAccess: true })
    }
  }

  return items.length
}

/** Idempotent: every row is keyed by its stable `sourceId` from the CV. */
export async function applySeed(payload: Payload, data: SeedData) {
  const db = payload as unknown as DynamicDB

  await db.updateGlobal({
    slug: 'site',
    data: data.site,
    overrideAccess: true,
  })

  const work = await upsertMany(db, 'work', data.work)
  const experience = await upsertMany(db, 'experience', data.experience)
  const education = await upsertMany(db, 'education', data.education)

  return { work, experience, education, site: 1 }
}
