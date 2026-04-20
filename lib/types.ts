// ── Content types matching the DB schema + content.json shape ──

export interface Meta {
  name: string
  shortName: string
  location: string
  timezone: string
  available: boolean
  copyrightYear: string
}

export interface Hero {
  indexNumber: string
  headlineLine1: string
  headlineLine2: string
  headlineLine3: string
  intro: string
  currently: string
  openTo: string
  stack: string
}

export interface Signal {
  caption: string
}

export type WorkKind = 'research' | 'engineering'

export interface WorkItem {
  id: string         // UUID from DB
  displayId: string  // e.g. "001"
  title: string
  venue: string
  year: string
  kind: WorkKind
  link: string
  thumbnail: string
  sortOrder?: number
}

export interface ExperienceItem {
  id: string
  period: string
  role: string
  org: string
  description: string
  sortOrder?: number
}

export interface EducationItem {
  id: string
  year: string
  school: string
  description: string
  sortOrder?: number
}

export interface ContactMethod {
  id: string
  label: string
  value: string
  href: string
  sortOrder?: number
}

export interface Contact {
  intro: string
  methods: ContactMethod[]
}

export interface SiteContent {
  meta: Meta
  hero: Hero
  signal: Signal
  work: WorkItem[]
  experience: ExperienceItem[]
  education: EducationItem[]
  contact: Contact
}

// ── DB row shapes (snake_case as returned by Supabase) ──

export interface DbSiteMeta {
  id: number
  name: string
  short_name: string
  location: string
  timezone: string
  available: boolean
  copyright_year: string
  updated_at: string
}

export interface DbSiteHero {
  id: number
  index_number: string
  headline_line1: string
  headline_line2: string
  headline_line3: string
  intro: string
  currently: string
  open_to: string
  stack: string
  updated_at: string
}

export interface DbSiteSignal {
  id: number
  caption: string
  updated_at: string
}

export interface DbWorkItem {
  id: string
  display_id: string
  title: string
  venue: string
  year: string
  kind: WorkKind
  link: string
  thumbnail: string
  sort_order: number
  created_at: string
  updated_at: string
}

export interface DbExperienceItem {
  id: string
  period: string
  role: string
  org: string
  description: string
  sort_order: number
  created_at: string
  updated_at: string
}

export interface DbEducationItem {
  id: string
  year: string
  school: string
  description: string
  sort_order: number
  created_at: string
  updated_at: string
}

export interface DbContactMeta {
  id: number
  intro: string
  updated_at: string
}

export interface DbContactMethod {
  id: string
  label: string
  value: string
  href: string
  sort_order: number
  created_at: string
  updated_at: string
}
