'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { SiteContent } from '@/lib/types'

// ── Auth actions ──────────────────────────────────────────────

export async function login(formData: FormData) {
  const email    = formData.get('email')    as string
  const password = formData.get('password') as string

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin')
  return { ok: true }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/admin')
  redirect('/admin')
}

// ── Content actions ───────────────────────────────────────────

// Save the full content object to Supabase.
// Called from the admin editor's "Save" / "Publish" button.
export async function saveContent(content: SiteContent): Promise<{ ok?: boolean; error?: string }> {
  const supabase = await createClient()

  // Auth guard
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  try {
    // ── single-row tables ────────────────────────────────────
    const [r1, r2, r3, r4] = await Promise.all([
      supabase.from('site_meta').upsert({
        id:             1,
        name:           content.meta.name,
        short_name:     content.meta.shortName,
        location:       content.meta.location,
        timezone:       content.meta.timezone,
        available:      content.meta.available,
        copyright_year: content.meta.copyrightYear,
      }),
      supabase.from('site_hero').upsert({
        id:             1,
        index_number:   content.hero.indexNumber,
        headline_line1: content.hero.headlineLine1,
        headline_line2: content.hero.headlineLine2,
        headline_line3: content.hero.headlineLine3,
        intro:          content.hero.intro,
        currently:      content.hero.currently,
        open_to:        content.hero.openTo,
        stack:          content.hero.stack,
      }),
      supabase.from('site_signal').upsert({
        id:      1,
        caption: content.signal.caption,
      }),
      supabase.from('contact_meta').upsert({
        id:    1,
        intro: content.contact.intro,
      }),
    ])

    const singleRowErrors = [r1, r2, r3, r4].map(r => r.error).filter(Boolean)
    if (singleRowErrors.length) {
      return { error: singleRowErrors[0]!.message }
    }

    // ── list tables: delete all + re-insert ─────────────────
    // work_items
    await supabase.from('work_items').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    if (content.work.length > 0) {
      const { error: wErr } = await supabase.from('work_items').insert(
        content.work.map((w, i) => ({
          display_id: w.displayId,
          title:      w.title,
          venue:      w.venue,
          year:       w.year,
          kind:       w.kind,
          link:       w.link,
          thumbnail:  w.thumbnail,
          sort_order: i,
        }))
      )
      if (wErr) return { error: wErr.message }
    }

    // experience_items
    await supabase.from('experience_items').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    if (content.experience.length > 0) {
      const { error: eErr } = await supabase.from('experience_items').insert(
        content.experience.map((e, i) => ({
          period:      e.period,
          role:        e.role,
          org:         e.org,
          description: e.description,
          sort_order:  i,
        }))
      )
      if (eErr) return { error: eErr.message }
    }

    // education_items
    await supabase.from('education_items').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    if (content.education.length > 0) {
      const { error: edErr } = await supabase.from('education_items').insert(
        content.education.map((e, i) => ({
          year:        e.year,
          school:      e.school,
          description: e.description,
          sort_order:  i,
        }))
      )
      if (edErr) return { error: edErr.message }
    }

    // contact_methods
    await supabase.from('contact_methods').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    if (content.contact.methods.length > 0) {
      const { error: cmErr } = await supabase.from('contact_methods').insert(
        content.contact.methods.map((m, i) => ({
          label:      m.label,
          value:      m.value,
          href:       m.href,
          sort_order: i,
        }))
      )
      if (cmErr) return { error: cmErr.message }
    }

    // Bust the cached homepage so it reflects the new content immediately
    revalidatePath('/')
    revalidatePath('/admin')

    return { ok: true }
  } catch (e) {
    return { error: String(e) }
  }
}
