import { cache } from 'react'
import { getPayload } from 'payload'

import config from '@payload-config'

export type WorkKind = 'publication' | 'system' | 'research' | 'project'
export type ExperienceCategory = 'work' | 'research' | 'teaching'

export type WorkItem = {
  id: string
  title: string
  kind: WorkKind
  venue: string
  year: string
  summary: string
  link: string
  featured: boolean
}

export type ExperienceItem = {
  id: string
  role: string
  org: string
  period: string
  startDate?: string
  endDate?: string
  location: string
  category: ExperienceCategory
  summary: string
  bullets: string[]
}

export type EducationItem = {
  id: string
  school: string
  degree: string
  period: string
  startDate?: string
  endDate?: string
  location: string
  description: string
  honors: string[]
}

export type Profile = {
  name: string
  shortName: string
  role: string
  location: string
  timezone: string
  available: boolean
  email: string
  portraitUrl: string
  links: { label: string; url: string; kind?: string }[]
  headline: string
  intro: string
  currently: string
  openTo: string
  stack: string
  profile: string
  interests: string[]
  skills: { label: string; value: string }[]
  honors: string[]
  metrics: { value: string; label: string; note?: string }[]
  contactIntro: string
  contactMethods: { label: string; value: string; url?: string }[]
  cv: { repo: string; resume: string; full: string; syncedAt?: string }
}

export type SiteData = {
  profile: Profile
  work: WorkItem[]
  experience: ExperienceItem[]
  education: EducationItem[]
}

type AnyDoc = Record<string, unknown>

function str(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback
}

function arr<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : []
}

function mapWork(doc: AnyDoc): WorkItem {
  return {
    id: String(doc.id),
    title: str(doc.title),
    kind: (doc.kind as WorkKind) ?? 'project',
    venue: str(doc.venue),
    year: str(doc.year),
    summary: str(doc.summary),
    link: str(doc.link),
    featured: Boolean(doc.featured),
  }
}

function mapExperience(doc: AnyDoc): ExperienceItem {
  return {
    id: String(doc.id),
    role: str(doc.role),
    org: str(doc.org),
    period: str(doc.period),
    startDate: str(doc.startDate) || undefined,
    endDate: str(doc.endDate) || undefined,
    location: str(doc.location),
    category: (doc.category as ExperienceCategory) ?? 'work',
    summary: str(doc.summary),
    bullets: arr<{ text?: string }>(doc.bullets)
      .map((bullet) => str(bullet?.text))
      .filter(Boolean),
  }
}

function mapEducation(doc: AnyDoc): EducationItem {
  return {
    id: String(doc.id),
    school: str(doc.school),
    degree: str(doc.degree),
    period: str(doc.period),
    startDate: str(doc.startDate) || undefined,
    endDate: str(doc.endDate) || undefined,
    location: str(doc.location),
    description: str(doc.description),
    honors: arr<{ text?: string }>(doc.honors)
      .map((honor) => str(honor?.text))
      .filter(Boolean),
  }
}

function mapProfile(doc: AnyDoc): Profile {
  return {
    name: str(doc.name, 'Smart Wattanapornmongkol'),
    shortName: str(doc.shortName, 'SmartWatt'),
    role: str(doc.role),
    location: str(doc.location),
    timezone: str(doc.timezone),
    available: Boolean(doc.available),
    email: str(doc.email),
    portraitUrl: str(doc.portraitUrl),
    links: arr<AnyDoc>(doc.links).map((link) => ({
      label: str(link.label),
      url: str(link.url),
      kind: str(link.kind) || undefined,
    })),
    headline: str(doc.headline),
    intro: str(doc.intro),
    currently: str(doc.currently),
    openTo: str(doc.openTo),
    stack: str(doc.stack),
    profile: str(doc.profile),
    interests: arr<AnyDoc>(doc.interests).map((item) => str(item.text)).filter(Boolean),
    skills: arr<AnyDoc>(doc.skills).map((skill) => ({
      label: str(skill.label),
      value: str(skill.value),
    })),
    honors: arr<AnyDoc>(doc.honors).map((item) => str(item.text)).filter(Boolean),
    metrics: arr<AnyDoc>(doc.metrics).map((metric) => ({
      value: str(metric.value),
      label: str(metric.label),
      note: str(metric.note) || undefined,
    })),
    contactIntro: str(doc.contactIntro),
    contactMethods: arr<AnyDoc>(doc.contactMethods).map((method) => ({
      label: str(method.label),
      value: str(method.value),
      url: str(method.url) || undefined,
    })),
    cv: {
      repo: str(doc.cvRepoUrl, 'https://github.com/smartwhatt/cv-resume'),
      resume: str(doc.resumeUrl),
      full: str(doc.cvUrl),
      syncedAt: str(doc.lastSyncedAt) || undefined,
    },
  }
}

/**
 * One request-level read of the CMS. `cache()` collapses the layout metadata,
 * page, and any child component call into a single database round trip.
 */
export const getSiteData = cache(async (): Promise<SiteData> => {
  const payload = await getPayload({ config })

  const [siteDoc, workDocs, experienceDocs, educationDocs] = await Promise.all([
    payload.findGlobal({ slug: 'site', depth: 0 }),
    payload.find({ collection: 'work', sort: 'order', limit: 100, depth: 0 }),
    payload.find({ collection: 'experience', sort: 'order', limit: 100, depth: 0 }),
    payload.find({ collection: 'education', sort: 'order', limit: 100, depth: 0 }),
  ])

  return {
    profile: mapProfile(siteDoc as unknown as AnyDoc),
    work: (workDocs.docs as unknown as AnyDoc[]).map(mapWork),
    experience: (experienceDocs.docs as unknown as AnyDoc[]).map(mapExperience),
    education: (educationDocs.docs as unknown as AnyDoc[]).map(mapEducation),
  }
})

// ── timeline helpers ────────────────────────────────────────────────

export const NOW = new Date()

export function yearOf(date?: string, fallback = NOW.getFullYear() + NOW.getMonth() / 12): number {
  if (!date) return fallback
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return fallback
  return parsed.getFullYear() + parsed.getMonth() / 12
}

export function timelineDomain(experience: ExperienceItem[]) {
  const now = NOW.getFullYear() + NOW.getMonth() / 12
  const values = experience.flatMap((item) => [yearOf(item.startDate), yearOf(item.endDate)])
  const min = Math.floor(Math.min(...values))
  const max = Math.ceil(Math.max(...values, now))
  return { min, max }
}

export function pct(value: number, min: number, max: number) {
  return ((value - min) / (max - min)) * 100
}

export function sortByStart(experience: ExperienceItem[]) {
  return [...experience].sort((a, b) => yearOf(a.startDate, 0) - yearOf(b.startDate, 0))
}
