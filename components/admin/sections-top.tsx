'use client'

import { Divider, Field, Input, SectionCard, Textarea } from './primitives'
import type { SiteContent } from '@/lib/types'

type Updater = (fn: (c: SiteContent) => SiteContent) => void

export function BasicsSection({ content, update }: { content: SiteContent; update: Updater }) {
  const meta = content.meta
  const hero = content.hero

  return (
    <SectionCard title="Basics" subtitle="Your name, location, and the top-of-page headline">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" required>
          <Input value={meta.name} onChange={(e) => update((c) => ({ ...c, meta: { ...c.meta, name: e.target.value } }))} />
        </Field>
        <Field label="Short name" hint="shown in nav & footer">
          <Input value={meta.shortName} onChange={(e) => update((c) => ({ ...c, meta: { ...c.meta, shortName: e.target.value } }))} />
        </Field>
        <Field label="Location" hint="e.g. Bangkok, TH">
          <Input value={meta.location} onChange={(e) => update((c) => ({ ...c, meta: { ...c.meta, location: e.target.value } }))} />
        </Field>
        <Field label="Timezone" hint="e.g. UTC+7">
          <Input value={meta.timezone} onChange={(e) => update((c) => ({ ...c, meta: { ...c.meta, timezone: e.target.value } }))} />
        </Field>
        <Field label="Copyright year">
          <Input value={meta.copyrightYear} onChange={(e) => update((c) => ({ ...c, meta: { ...c.meta, copyrightYear: e.target.value } }))} />
        </Field>
        <Field label="Available for work" hint="shows ● available in nav">
          <label className="flex cursor-pointer items-center gap-3 rounded-md border border-[var(--adm-rule)] bg-[var(--adm-card)] px-3 py-3">
            <input
              type="checkbox"
              checked={meta.available}
              onChange={(e) => update((c) => ({ ...c, meta: { ...c.meta, available: e.target.checked } }))}
              className="h-4 w-4 cursor-pointer accent-[var(--adm-accent)]"
            />
            <span className="text-sm text-[var(--adm-ink)]">
              {meta.available ? 'Yes, open to opportunities' : 'Not advertising availability'}
            </span>
          </label>
        </Field>
      </div>

      <Divider />

      <div>
        <div className="mb-3 font-mono text-[0.62rem] uppercase tracking-widest text-[var(--adm-muted)]">
          Headline
        </div>
        <div className="mb-4 text-sm leading-6 text-[var(--adm-muted)]">
          Wrap words in{' '}
          <code className="rounded bg-[var(--adm-bg-alt)] px-1.5 py-0.5 font-mono">[brackets]</code> for accent styling, or{' '}
          <code className="rounded bg-[var(--adm-bg-alt)] px-1.5 py-0.5 font-mono">{'{braces}'}</code> for stronger emphasis.
        </div>
        <div className="space-y-4">
          <Field label="Line 1">
            <Input value={hero.headlineLine1} onChange={(e) => update((c) => ({ ...c, hero: { ...c.hero, headlineLine1: e.target.value } }))} />
          </Field>
          <Field label="Line 2">
            <Input value={hero.headlineLine2} onChange={(e) => update((c) => ({ ...c, hero: { ...c.hero, headlineLine2: e.target.value } }))} />
          </Field>
          <Field label="Line 3">
            <Input value={hero.headlineLine3} onChange={(e) => update((c) => ({ ...c, hero: { ...c.hero, headlineLine3: e.target.value } }))} />
          </Field>
          <Field label="Intro paragraph" hint="short bio under the headline">
            <Textarea rows={3} value={hero.intro} onChange={(e) => update((c) => ({ ...c, hero: { ...c.hero, intro: e.target.value } }))} />
          </Field>
        </div>
      </div>
    </SectionCard>
  )
}

export function StatusSection({ content, update }: { content: SiteContent; update: Updater }) {
  const hero = content.hero
  const signal = content.signal

  return (
    <SectionCard title="Status" subtitle="What you're doing right now">
      <Field label="Currently" hint="what you're working on">
        <Textarea
          rows={3}
          value={hero.currently}
          onChange={(e) => update((c) => ({ ...c, hero: { ...c.hero, currently: e.target.value } }))}
          placeholder="Drafting a paper on… / Shipping the…"
        />
      </Field>
      <Field label="Open to" hint="opportunities — line breaks OK">
        <Textarea
          rows={3}
          value={hero.openTo}
          onChange={(e) => update((c) => ({ ...c, hero: { ...c.hero, openTo: e.target.value } }))}
          placeholder="Internships · Summer 2027"
        />
      </Field>
      <Field label="Stack" hint="tools — one line per row">
        <Textarea
          rows={4}
          value={hero.stack}
          onChange={(e) => update((c) => ({ ...c, hero: { ...c.hero, stack: e.target.value } }))}
          placeholder="Python · TypeScript · Rust"
        />
      </Field>
      <Divider />
      <Field label="Signal caption" hint="short line under the animated band">
        <Input value={signal.caption} onChange={(e) => update((c) => ({ ...c, signal: { ...c.signal, caption: e.target.value } }))} />
      </Field>
    </SectionCard>
  )
}
