import {
  DbSiteMeta,
  DbSiteHero,
  DbSiteSignal,
  DbWorkItem,
  DbExperienceItem,
  DbEducationItem,
  DbContactMeta,
  DbContactMethod,
  SiteContent,
} from './types'

// ── Row → domain mappers ──────────────────────────────────────

export function mapMeta(row: DbSiteMeta): SiteContent['meta'] {
  return {
    name: row.name,
    shortName: row.short_name,
    location: row.location,
    timezone: row.timezone,
    available: row.available,
    copyrightYear: row.copyright_year,
  }
}

export function mapHero(row: DbSiteHero): SiteContent['hero'] {
  return {
    indexNumber: row.index_number,
    headlineLine1: row.headline_line1,
    headlineLine2: row.headline_line2,
    headlineLine3: row.headline_line3,
    intro: row.intro,
    currently: row.currently,
    openTo: row.open_to,
    stack: row.stack,
  }
}

export function mapSignal(row: DbSiteSignal): SiteContent['signal'] {
  return { caption: row.caption }
}

export function mapWork(row: DbWorkItem): SiteContent['work'][number] {
  return {
    id: row.id,
    displayId: row.display_id,
    title: row.title,
    venue: row.venue,
    year: row.year,
    kind: row.kind,
    link: row.link,
    thumbnail: row.thumbnail,
    sortOrder: row.sort_order,
  }
}

export function mapExperience(row: DbExperienceItem): SiteContent['experience'][number] {
  return {
    id: row.id,
    period: row.period,
    role: row.role,
    org: row.org,
    description: row.description,
    sortOrder: row.sort_order,
  }
}

export function mapEducation(row: DbEducationItem): SiteContent['education'][number] {
  return {
    id: row.id,
    year: row.year,
    school: row.school,
    description: row.description,
    sortOrder: row.sort_order,
  }
}

export function mapContactMethod(row: DbContactMethod): SiteContent['contact']['methods'][number] {
  return {
    id: row.id,
    label: row.label,
    value: row.value,
    href: row.href,
    sortOrder: row.sort_order,
  }
}

// ── Domain → DB update payloads ───────────────────────────────

export function heroToDb(hero: SiteContent['hero']) {
  return {
    index_number:   hero.indexNumber,
    headline_line1: hero.headlineLine1,
    headline_line2: hero.headlineLine2,
    headline_line3: hero.headlineLine3,
    intro:          hero.intro,
    currently:      hero.currently,
    open_to:        hero.openTo,
    stack:          hero.stack,
  }
}

export function metaToDb(meta: SiteContent['meta']) {
  return {
    name:           meta.name,
    short_name:     meta.shortName,
    location:       meta.location,
    timezone:       meta.timezone,
    available:      meta.available,
    copyright_year: meta.copyrightYear,
  }
}

export function workToDb(item: SiteContent['work'][number], sortOrder?: number) {
  return {
    display_id: item.displayId,
    title:      item.title,
    venue:      item.venue,
    year:       item.year,
    kind:       item.kind,
    link:       item.link,
    thumbnail:  item.thumbnail,
    sort_order: sortOrder ?? item.sortOrder ?? 0,
  }
}

export function experienceToDb(item: SiteContent['experience'][number], sortOrder?: number) {
  return {
    period:      item.period,
    role:        item.role,
    org:         item.org,
    description: item.description,
    sort_order:  sortOrder ?? item.sortOrder ?? 0,
  }
}

export function educationToDb(item: SiteContent['education'][number], sortOrder?: number) {
  return {
    year:        item.year,
    school:      item.school,
    description: item.description,
    sort_order:  sortOrder ?? item.sortOrder ?? 0,
  }
}

export function contactMethodToDb(item: SiteContent['contact']['methods'][number], sortOrder?: number) {
  return {
    label:      item.label,
    value:      item.value,
    href:       item.href,
    sort_order: sortOrder ?? item.sortOrder ?? 0,
  }
}
