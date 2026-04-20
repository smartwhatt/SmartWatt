'use client'

import { Field, Input, Textarea, SectionCard, Divider } from './primitives'
import type { SiteContent } from '@/lib/types'

type Updater = (fn: (c: SiteContent) => SiteContent) => void

// ── BasicsSection ─────────────────────────────────────────────
export function BasicsSection({ content, update }: { content: SiteContent; update: Updater }) {
  const meta = content.meta
  const hero = content.hero
  return (
    <SectionCard title="Basics" subtitle="Your name, location, and the top-of-page headline">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Field label="Full name" required>
          <Input value={meta.name} onChange={e => update(c => ({ ...c, meta: { ...c.meta, name: e.target.value } }))} />
        </Field>
        <Field label="Short name" hint="shown in nav & footer">
          <Input value={meta.shortName} onChange={e => update(c => ({ ...c, meta: { ...c.meta, shortName: e.target.value } }))} />
        </Field>
        <Field label="Location" hint="e.g. Bangkok, TH">
          <Input value={meta.location} onChange={e => update(c => ({ ...c, meta: { ...c.meta, location: e.target.value } }))} />
        </Field>
        <Field label="Timezone" hint="e.g. UTC+7">
          <Input value={meta.timezone} onChange={e => update(c => ({ ...c, meta: { ...c.meta, timezone: e.target.value } }))} />
        </Field>
        <Field label="Copyright year">
          <Input value={meta.copyrightYear} onChange={e => update(c => ({ ...c, meta: { ...c.meta, copyrightYear: e.target.value } }))} />
        </Field>
        <Field label="Available for work" hint="shows ● available in nav">
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '10px 12px', background: 'var(--adm-card)', border: '1px solid var(--adm-rule)', borderRadius: 4 }}>
            <input type="checkbox" checked={meta.available}
              onChange={e => update(c => ({ ...c, meta: { ...c.meta, available: e.target.checked } }))}
              style={{ accentColor: 'var(--adm-accent)', width: 16, height: 16, cursor: 'pointer' }} />
            <span style={{ fontSize: 14, color: 'var(--adm-ink)' }}>
              {meta.available ? 'Yes, open to opportunities' : 'Not advertising availability'}
            </span>
          </label>
        </Field>
      </div>

      <Divider />
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--adm-muted)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>Headline</div>
      <div style={{ fontSize: 13, color: 'var(--adm-muted)', marginBottom: 16, lineHeight: 1.5 }}>
        Wrap words in <code style={{ background: 'var(--adm-bg-alt)', padding: '1px 5px', borderRadius: 2, fontFamily: 'var(--font-mono)' }}>[brackets]</code> for accent italic, or{' '}
        <code style={{ background: 'var(--adm-bg-alt)', padding: '1px 5px', borderRadius: 2, fontFamily: 'var(--font-mono)' }}>{'{braces}'}</code> for bold.
      </div>
      <Field label="Line 1"><Input value={hero.headlineLine1} onChange={e => update(c => ({ ...c, hero: { ...c.hero, headlineLine1: e.target.value } }))} /></Field>
      <Field label="Line 2"><Input value={hero.headlineLine2} onChange={e => update(c => ({ ...c, hero: { ...c.hero, headlineLine2: e.target.value } }))} /></Field>
      <Field label="Line 3"><Input value={hero.headlineLine3} onChange={e => update(c => ({ ...c, hero: { ...c.hero, headlineLine3: e.target.value } }))} /></Field>
      <Field label="Intro paragraph" hint="short bio under the headline">
        <Textarea rows={3} value={hero.intro} onChange={e => update(c => ({ ...c, hero: { ...c.hero, intro: e.target.value } }))} />
      </Field>
    </SectionCard>
  )
}

// ── StatusSection ─────────────────────────────────────────────
export function StatusSection({ content, update }: { content: SiteContent; update: Updater }) {
  const hero   = content.hero
  const signal = content.signal
  return (
    <SectionCard title="Status" subtitle="What you're doing right now">
      <Field label="Currently" hint="what you're working on">
        <Textarea rows={3} value={hero.currently}
          onChange={e => update(c => ({ ...c, hero: { ...c.hero, currently: e.target.value } }))}
          placeholder="Drafting a paper on… / Shipping the…" />
      </Field>
      <Field label="Open to" hint="opportunities — line breaks OK">
        <Textarea rows={3} value={hero.openTo}
          onChange={e => update(c => ({ ...c, hero: { ...c.hero, openTo: e.target.value } }))}
          placeholder="Internships · Summer 2027" />
      </Field>
      <Field label="Stack" hint="tools — one line per row">
        <Textarea rows={4} value={hero.stack}
          onChange={e => update(c => ({ ...c, hero: { ...c.hero, stack: e.target.value } }))}
          placeholder="Python · TypeScript · Rust" />
      </Field>
      <Divider />
      <Field label="Signal caption" hint="short line under the animated band">
        <Input value={signal.caption}
          onChange={e => update(c => ({ ...c, signal: { ...c.signal, caption: e.target.value } }))} />
      </Field>
    </SectionCard>
  )
}
