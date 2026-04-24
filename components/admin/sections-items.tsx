'use client'

import { Btn, Divider, Field, Input, ItemRow, moveItem, SectionCard, Select, Textarea, ThumbnailInput } from './primitives'
import type { ContactMethod, EducationItem, ExperienceItem, SiteContent, WorkItem, WorkKind } from '@/lib/types'

type Updater = (fn: (c: SiteContent) => SiteContent) => void

const addButtonClass = 'mt-2'

export function WorkSection({ content, update }: { content: SiteContent; update: Updater }) {
  const items = content.work

  const updItem = (i: number, patch: Partial<WorkItem>) =>
    update((c) => ({ ...c, work: c.work.map((w, j) => (j === i ? { ...w, ...patch } : w)) }))
  const remItem = (i: number) => update((c) => ({ ...c, work: c.work.filter((_, j) => j !== i) }))
  const movItem = (i: number, to: number) => update((c) => ({ ...c, work: moveItem(c.work, i, to) }))

  return (
    <SectionCard title="Selected Work" subtitle="Projects, publications, and ships" count={items.length}>
      {items.map((row, i) => (
        <ItemRow
          key={row.id || i}
          index={i}
          total={items.length}
          title={row.title}
          meta={[row.venue, row.year, row.kind].filter(Boolean).join(' · ')}
          onMoveUp={() => movItem(i, i - 1)}
          onMoveDown={() => movItem(i, i + 1)}
          onRemove={() => remItem(i)}
        >
          <div className="grid gap-4 lg:grid-cols-[100px_minmax(0,1fr)_minmax(0,1fr)_140px]">
            <Field label="ID" hint="3-digit">
              <Input value={row.displayId} onChange={(e) => updItem(i, { displayId: e.target.value })} />
            </Field>
            <Field label="Title" required>
              <Input value={row.title} onChange={(e) => updItem(i, { title: e.target.value })} />
            </Field>
            <Field label="Venue / role">
              <Input value={row.venue} onChange={(e) => updItem(i, { venue: e.target.value })} />
            </Field>
            <Field label="Year">
              <Input value={row.year} onChange={(e) => updItem(i, { year: e.target.value })} />
            </Field>
          </div>
          <div className="grid gap-4 md:grid-cols-[180px_minmax(0,1fr)]">
            <Field label="Kind">
              <Select
                value={row.kind}
                onChange={(v) => updItem(i, { kind: v as WorkKind })}
                options={[
                  { value: 'research', label: 'Research' },
                  { value: 'engineering', label: 'Engineering' },
                ]}
              />
            </Field>
            <Field label="Link" hint="optional">
              <Input value={row.link} placeholder="https://…" onChange={(e) => updItem(i, { link: e.target.value })} />
            </Field>
          </div>
          <Field label="Thumbnail" hint="URL or upload (shown 36×36 next to title)">
            <ThumbnailInput value={row.thumbnail} onChange={(v) => updItem(i, { thumbnail: v })} />
          </Field>
        </ItemRow>
      ))}
      <Btn
        className={addButtonClass}
        onClick={() =>
          update((c) => ({
            ...c,
            work: [
              ...c.work,
              {
                id: `new-${Date.now()}`,
                displayId: String(items.length + 1).padStart(3, '0'),
                title: '',
                venue: '',
                year: new Date().getFullYear().toString(),
                kind: 'engineering',
                link: '',
                thumbnail: '',
              },
            ],
          }))
        }
      >
        + Add work entry
      </Btn>
    </SectionCard>
  )
}

export function ExperienceSection({ content, update }: { content: SiteContent; update: Updater }) {
  const items = content.experience

  const updItem = (i: number, patch: Partial<ExperienceItem>) =>
    update((c) => ({ ...c, experience: c.experience.map((e, j) => (j === i ? { ...e, ...patch } : e)) }))
  const remItem = (i: number) => update((c) => ({ ...c, experience: c.experience.filter((_, j) => j !== i) }))
  const movItem = (i: number, to: number) => update((c) => ({ ...c, experience: moveItem(c.experience, i, to) }))

  return (
    <SectionCard title="Experience & Research" subtitle="Jobs, research roles, and publications" count={items.length}>
      {items.map((row, i) => (
        <ItemRow
          key={row.id || i}
          index={i}
          total={items.length}
          title={row.role}
          meta={[row.period, row.org].filter(Boolean).join(' · ')}
          onMoveUp={() => movItem(i, i - 1)}
          onMoveDown={() => movItem(i, i + 1)}
          onRemove={() => remItem(i)}
        >
          <div className="grid gap-4 md:grid-cols-[180px_minmax(0,1fr)]">
            <Field label="Period" hint="e.g. 2025 — Now">
              <Input value={row.period} onChange={(e) => updItem(i, { period: e.target.value })} />
            </Field>
            <Field label="Role / title" required>
              <Input value={row.role} onChange={(e) => updItem(i, { role: e.target.value })} />
            </Field>
          </div>
          <Field label="Organization / context">
            <Input value={row.org} onChange={(e) => updItem(i, { org: e.target.value })} />
          </Field>
          <Field label="Description">
            <Textarea rows={3} value={row.description} onChange={(e) => updItem(i, { description: e.target.value })} />
          </Field>
        </ItemRow>
      ))}
      <Btn
        className={addButtonClass}
        onClick={() =>
          update((c) => ({
            ...c,
            experience: [...c.experience, { id: `new-${Date.now()}`, period: '', role: '', org: '', description: '' }],
          }))
        }
      >
        + Add experience
      </Btn>
    </SectionCard>
  )
}

export function EducationSection({ content, update }: { content: SiteContent; update: Updater }) {
  const items = content.education

  const updItem = (i: number, patch: Partial<EducationItem>) =>
    update((c) => ({ ...c, education: c.education.map((e, j) => (j === i ? { ...e, ...patch } : e)) }))
  const remItem = (i: number) => update((c) => ({ ...c, education: c.education.filter((_, j) => j !== i) }))
  const movItem = (i: number, to: number) => update((c) => ({ ...c, education: moveItem(c.education, i, to) }))

  return (
    <SectionCard title="Education" subtitle="Schools, newest first" count={items.length}>
      {items.map((row, i) => (
        <ItemRow
          key={row.id || i}
          index={i}
          total={items.length}
          title={row.school}
          meta={[row.year, row.description].filter(Boolean).join(' · ')}
          onMoveUp={() => movItem(i, i - 1)}
          onMoveDown={() => movItem(i, i + 1)}
          onRemove={() => remItem(i)}
        >
          <div className="grid gap-4 md:grid-cols-[120px_minmax(0,1fr)]">
            <Field label="Year">
              <Input value={row.year} onChange={(e) => updItem(i, { year: e.target.value })} />
            </Field>
            <Field label="School" required>
              <Input value={row.school} onChange={(e) => updItem(i, { school: e.target.value })} />
            </Field>
          </div>
          <Field label="Description">
            <Textarea rows={2} value={row.description} onChange={(e) => updItem(i, { description: e.target.value })} />
          </Field>
        </ItemRow>
      ))}
      <Btn
        className={addButtonClass}
        onClick={() =>
          update((c) => ({
            ...c,
            education: [...c.education, { id: `new-${Date.now()}`, year: '', school: '', description: '' }],
          }))
        }
      >
        + Add school
      </Btn>
    </SectionCard>
  )
}

export function ContactSection({ content, update }: { content: SiteContent; update: Updater }) {
  const methods = content.contact.methods

  const updMethod = (i: number, patch: Partial<ContactMethod>) =>
    update((c) => ({
      ...c,
      contact: {
        ...c.contact,
        methods: c.contact.methods.map((m, j) => (j === i ? { ...m, ...patch } : m)),
      },
    }))
  const remMethod = (i: number) =>
    update((c) => ({ ...c, contact: { ...c.contact, methods: c.contact.methods.filter((_, j) => j !== i) } }))
  const movMethod = (i: number, to: number) =>
    update((c) => ({ ...c, contact: { ...c.contact, methods: moveItem(c.contact.methods, i, to) } }))

  return (
    <SectionCard title="Contact" subtitle="How people reach you" count={methods.length}>
      <Field label="Intro paragraph" hint="shown next to the form">
        <Textarea rows={2} value={content.contact.intro} onChange={(e) => update((c) => ({ ...c, contact: { ...c.contact, intro: e.target.value } }))} />
      </Field>
      <Divider />
      <div className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-[var(--adm-muted)]">Methods</div>
      {methods.map((row, i) => (
        <ItemRow
          key={row.id || i}
          index={i}
          total={methods.length}
          title={row.label}
          meta={row.value}
          onMoveUp={() => movMethod(i, i - 1)}
          onMoveDown={() => movMethod(i, i + 1)}
          onRemove={() => remMethod(i)}
        >
          <div className="grid gap-4 lg:grid-cols-[140px_minmax(0,1fr)_minmax(0,1fr)]">
            <Field label="Label" hint="Email, LinkedIn…">
              <Input value={row.label} onChange={(e) => updMethod(i, { label: e.target.value })} />
            </Field>
            <Field label="Display text">
              <Input value={row.value} onChange={(e) => updMethod(i, { value: e.target.value })} />
            </Field>
            <Field label="Link (href)" hint="leave blank for plain text">
              <Input value={row.href} placeholder="mailto:… or https://…" onChange={(e) => updMethod(i, { href: e.target.value })} />
            </Field>
          </div>
        </ItemRow>
      ))}
      <Btn
        className={addButtonClass}
        onClick={() =>
          update((c) => ({
            ...c,
            contact: {
              ...c.contact,
              methods: [...c.contact.methods, { id: `new-${Date.now()}`, label: '', value: '', href: '' }],
            },
          }))
        }
      >
        + Add method
      </Btn>
    </SectionCard>
  )
}
