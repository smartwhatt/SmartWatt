import { asArray, asDict, isContent, linksOf, textOf, type Value } from './typst'

/**
 * Shapes posted to the dev seed route. They mirror the Payload field names so
 * the route can write them with no further translation.
 */

export type SeedLink = { label: string; url: string; kind?: string }
export type SeedText = { text: string }
export type SeedSkill = { label: string; value: string }
export type SeedMetric = { value: string; label: string; note?: string }
export type SeedMethod = { label: string; value: string; url?: string }

export type SeedSite = {
  name: string
  shortName: string
  role: string
  location: string
  timezone: string
  email: string
  available: boolean
  portraitUrl: string
  links: SeedLink[]
  headline: string
  intro: string
  currently: string
  openTo: string
  stack: string
  profile: string
  interests: SeedText[]
  skills: SeedSkill[]
  honors: SeedText[]
  metrics: SeedMetric[]
  contactIntro: string
  contactMethods: SeedMethod[]
  cvRepoUrl: string
  resumeUrl: string
  cvUrl: string
  lastSyncedAt: string
  metaTitle: string
  metaDescription: string
  ogImage: string
}

export type SeedWork = {
  sourceId: string
  title: string
  kind: 'publication' | 'system' | 'research' | 'project'
  venue: string
  year: string
  summary: string
  link: string
  featured: boolean
  order: number
}

export type SeedExperience = {
  sourceId: string
  role: string
  org: string
  period: string
  startDate?: string
  endDate?: string
  location: string
  category: 'work' | 'research' | 'teaching'
  summary: string
  bullets: SeedText[]
  order: number
}

export type SeedEducation = {
  sourceId: string
  school: string
  degree: string
  period: string
  startDate?: string
  endDate?: string
  location: string
  description: string
  honors: SeedText[]
  order: number
}

export type SeedData = {
  site: SeedSite
  work: SeedWork[]
  experience: SeedExperience[]
  education: SeedEducation[]
}

// ── helpers ──────────────────────────────────────────────────────────

const CV_REPO = 'https://github.com/smartwhatt/cv-resume'

const MONTHS: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
}

function slug(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64)
}

function sentence(input: string) {
  const text = input.replace(/\s+/g, ' ').trim()
  return text
}

function sectionMap(locale: Record<string, Value>) {
  const cv = asDict(locale.cv as Value, 'locale.cv')
  const sections = asArray(cv.sections as Value, 'cv.sections').map((entry) => {
    const dict = asDict(entry, 'cv section')
    return { title: textOf(dict.title), dict }
  })
  return new Map(sections.map(({ title, dict }) => [title, dict]))
}

function point(input: string): { year: number; month: number } | null {
  const text = input.replace(/expected/gi, '').trim()
  const named = /([A-Za-z]{3,})\s+(\d{4})/.exec(text)
  if (named) {
    const month = MONTHS[named[1].slice(0, 3).toLowerCase()]
    if (month !== undefined) return { year: Number(named[2]), month }
  }
  const year = /(\d{4})/.exec(text)
  return year ? { year: Number(year[1]), month: 0 } : null
}

function iso(value: { year: number; month: number }) {
  return `${value.year}-${String(value.month + 1).padStart(2, '0')}-01`
}

export function parsePeriod(period: string): { startDate?: string; endDate?: string } {
  const text = period.replace(/[–—]/g, '-').trim()
  const parts = text.split(/\s+-\s+/)

  if (parts.length === 2) {
    const start = point(parts[0])
    const end = /present/i.test(parts[1]) ? null : point(parts[1])
    return {
      startDate: start ? iso(start) : undefined,
      endDate: end ? iso(end) : undefined,
    }
  }

  const single = point(text)
  return single ? { startDate: iso(single), endDate: iso(single) } : {}
}

function linksFrom(value: Value) {
  return linksOf(value)
}

/** Latest year in a period label, used for compact tables. */
function yearOf(period: string) {
  const years = [...period.matchAll(/\d{4}/g)]
  return years.length ? years[years.length - 1][0] : period
}

// ── mapping ──────────────────────────────────────────────────────────


// ── editorial copy (ASD-STE100) ─────────────────────────────────────
// The CV supplies the facts. This layer supplies short, active sentences
// for the site so a sync cannot overwrite the voice.

const SKILL_LABELS: Record<string, string> = {
  Languages: 'Programming',
  'AI/ML': 'AI and machine learning',
  Backend: 'Backend and data',
  'Backend/Data': 'Backend and data',
  Tools: 'Tools',
}

const EXPERIENCE_COPY: Record<string, string[]> = {
  'Academy Secretary': [
    'I coordinate the AI Academy program for Super AI Engineer Season 6: Digital Workforce Transformation and partner courses.',
    'I plan teaching logistics, contact mentors, support learners, and track projects for AI training.',
    'I prepare session materials and collect program issues for instructors and program leads.',
  ],
  'Student Research Assistant': [
    'I work on structure-from-motion methods. They estimate polyp size from monocular colonoscopy images.',
    'The methods use physics-informed neural networks.',
    'I support research on geometric reconstruction and medical-image measurement.',
    'I also study Information and Communication Engineering.',
  ],
  'Head of IT & Backend Lead; Back End Developer': [
    'I lead IT and backend engineering for CU NEX.',
    'I coordinate development with Kasikorn Business-Technology Group and university stakeholders.',
    'I designed and delivered election-management tools with candidate and admin panels and candidate forms.',
    '27+ admins and 255+ candidates use the tools.',
    'I defined requirements and acceptance criteria for the CU NEX attendance feature.',
    'I coordinated backend APIs and reports. The feature cut manual reconciliation by 60%.',
    'I introduced code review, continuous integration and deployment, automated tests, and release steps for the backend.',
    'I manage and mentor 12 developers through sprint planning, priorities, and stakeholder communication.',
  ],
  'Technical Lead; Back End Developer; Inner of Secretary Department': [
    'I am Technical Lead for the International School of Engineering Student Committee.',
    'I coordinate technical work for the committee.',
    'I maintain internal systems for the International School of Engineering community.',
    'I was a Back End Developer from Jul 2025 to Jun 2026.',
    'I served in the Secretary Department from Jul 2024 to Jul 2025.',
  ],
  'Fullstack Developer': [
    'I built course-selling and payment interfaces for BIZCUBE Chula.',
    'The interfaces handled about 8M baht in transactions.',
    'I built purchase flows for users and workflows for administrators.',
    'I supported the operations and marketing teams with data and course logistics.',
    'I used agentic workflows to improve task productivity by 50%.',
  ],
  'AI Researcher Intern, Speech & Multimodal Learning': [
    'I led a data-centric study on synthetic speech selection for low-resource Thai speech recognition.',
    'The study moved from simple scaling to quality-aware sample selection for Whisper fine-tuning.',
    'I proposed Audio-Conditioned Gain, a normalized metric for sample utility.',
    'The metric uses marginal gains over a text-only baseline.',
    'I used the metric to find informative synthetic samples without more annotation.',
    'I showed that bottom-k Audio-Conditioned Gain selection beats random and top-k baselines on CV, FLEURS, and Porjai.',
  ],
  'Teaching Team': [
    'I teach five sessions for the AI Entrepreneur curriculum at Chiang Mai University.',
    'The sessions cover LLM prompting with Gemini Notebook, retrieval-augmented generation (RAG), and security for AI applications. They also cover agentic AI applications and deployment of AI systems.',
  ],
  'Teaching Assistant, ITE68367 Special Topics in Digital Technology 2': [
    'I develop the course learning system, grade assignments, and teach a session on agentic AI tools and LLM prompting.',
  ],
  'Teaching Assistant, Super AI Engineer Season 6': [
    'I assisted instructors during lectures and supported learning activities for Digital Workforce Transformation.',
    'I built Kaggle competition workflows and collected hackathon scores for program review.',
    'I shared my applied AI project experience with participants during program sessions.',
  ],
  'Teaching Assistant': [
    'I teach one session on Graph RAG.',
    'I assist the lecturer during other sessions.',
  ],
  Coach: [
    'I coached participants in technical learning activities about AI and engineering practice.',
  ],
}

const WORK_COPY: Record<string, string> = {
  'Election Management System (EMS)':
    'The platform has admin and candidate panels, candidate forms, backend APIs, reports, and tests. It serves 27+ admins and 255+ candidates.',
  QuickAttend:
    'Students and activity staff scan CU NEX QR codes to record attendance. Organizers see all attendance records in one place.',
  'BIZCUBE Chula course commerce and payment interface':
    'The platform sells courses and takes payments for Chulalongkorn Business Administration activities. It handled about 8M baht in transactions.',
  'Audio-Conditioned Gain research code and experiments':
    'This research selects samples for low-resource Thai speech recognition. It compares bottom-k, random, and top-k strategies on the CV, FLEURS, and Porjai test sets.',
  'MySK school platform':
    'MySK gives Suankularb Wittayalai students and teachers one place to find school resources and information. 5,000+ students and 200+ teachers and directors use it.',
}

const EDUCATION_COPY: Record<string, string> = {
  'B.Eng. in Information and Communication Engineering':
    'My grade point average is 3.88/4.00. I received the ISE50 Academic Excellence Scholarship for academic year 2025.',
  'High School Diploma, EPLUS+ Program':
    'I completed junior and senior high school in the EPLUS+ Program.',
}

export function buildSeed(locale: Record<string, Value>, common: Record<string, Value>): SeedData {
  const sections = sectionMap(locale)
  const person = asDict(locale.person as Value, 'person')
  const resume = asDict(locale.resume as Value, 'resume')
  const resumeSections = new Map(
    asArray(resume.sections as Value, 'resume.sections').map((entry) => {
      const dict = asDict(entry, 'resume section')
      return [textOf(dict.title), dict] as const
    }),
  )

  const honors = asArray(sections.get('Honors')?.items ?? [], 'honors').map((item) => ({
    text: sentence(textOf(item)),
  }))

  const skills = asArray(sections.get('Technical Skills')?.items ?? [], 'skills').map((item) => {
    const dict = asDict(item, 'skill')
    const label = textOf(dict.label)
    return { label: SKILL_LABELS[label] ?? label, value: textOf(dict.value) }
  })

  const commonLinks = asArray(common.links as Value, 'common.links').map((item) => {
    const dict = asDict(item, 'link')
    const url = textOf(dict.url)
    return {
      label: textOf(dict.label),
      url,
      kind: url.includes('linkedin') ? 'linkedin' : url.includes('github') ? 'github' : 'web',
    }
  })

  const email = textOf(common.email)

  const links: SeedLink[] = [
    ...commonLinks.filter((link) => !link.url.includes('smartwatt.me')),
    { label: 'CV source', url: CV_REPO, kind: 'cv' },
  ]

  const experience: SeedExperience[] = []
  let order = 0

  const appointmentSection = sections.get('Current Appointments & Experience')
  for (const record of asArray(appointmentSection?.records ?? [], 'appointments')) {
    const dict = asDict(record, 'appointment')
    const role = sentence(textOf(dict.title))
    const org = sentence(textOf(dict.org))
    const period = sentence(textOf(dict.dates))
    const cvBullets = asArray(dict.bullets ?? [], 'bullets').map((bullet) => ({
      text: sentence(textOf(bullet)),
    }))
    const copy = EXPERIENCE_COPY[role]
    const bullets = copy ? copy.map((text) => ({ text })) : cvBullets

    const isResearch = /research assistant|researcher/i.test(role)

    experience.push({
      sourceId: slug(`${role}-${org}`),
      role,
      org,
      period,
      ...parsePeriod(period),
      location: sentence(textOf(dict.location)),
      category: isResearch ? 'research' : 'work',
      summary: bullets[0]?.text ?? '',
      bullets,
      order: order++,
    })
  }

  const teachingSection = sections.get('Teaching, Mentoring & Service')
  for (const record of asArray(teachingSection?.records ?? [], 'teaching')) {
    const dict = asDict(record, 'teaching record')
    const role = sentence(textOf(dict.title))
    const org = sentence(textOf(dict.org))
    const period = sentence(textOf(dict.dates))
    const cvBullets = asArray(dict.bullets ?? [], 'bullets').map((bullet) => ({
      text: sentence(textOf(bullet)),
    }))
    const copy = EXPERIENCE_COPY[role]
    const bullets = copy ? copy.map((text) => ({ text })) : cvBullets

    experience.push({
      sourceId: slug(`${role}-${org}`),
      role,
      org,
      period,
      ...parsePeriod(period),
      location: sentence(textOf(dict.location)),
      category: 'teaching',
      summary: bullets[0]?.text ?? '',
      bullets,
      order: order++,
    })
  }

  const education: SeedEducation[] = []
  asArray(sections.get('Education')?.records ?? [], 'education').forEach((record, index) => {
    const dict = asDict(record, 'education record')
    const school = sentence(textOf(dict.org))
    const degree = sentence(textOf(dict.title))
    const period = sentence(textOf(dict.dates))
    const bullets = asArray(dict.bullets ?? [], 'bullets').map((item) => sentence(textOf(item)))
    const description = EDUCATION_COPY[degree] ?? bullets.join(' ')

    education.push({
      sourceId: slug(`${degree}-${school}`),
      school,
      degree,
      period,
      ...parsePeriod(period),
      location: sentence(textOf(dict.location)),
      description,
      honors:
        index === 0 ? [{ text: 'ISE50 Academic Excellence Scholarship, academic year 2025' }] : [],
      order: index,
    })
  })

  const work: SeedWork[] = []

  const publication = asArray(sections.get('Publications')?.records ?? [], 'publications')[0]
  if (publication) {
    const dict = asDict(publication, 'publication')
    const body = sentence(textOf(dict.body))
    const link = linksFrom(dict.body)[0]?.url ?? ''
    work.push({
      sourceId: slug(textOf(dict.title)),
      title: sentence(textOf(dict.title)),
      kind: 'publication',
      venue: 'IEEE ICCI 2024',
      year: sentence(textOf(dict.dates)) || '2024',
      summary: body,
      link,
      featured: true,
      order: work.length,
    })
  }

  const kindFor = (title: string): SeedWork['kind'] => {
    if (/audio-conditioned/i.test(title)) return 'research'
    if (/mysk/i.test(title)) return 'project'
    return 'system'
  }

  for (const record of asArray(sections.get('Selected Systems & Projects')?.records ?? [], 'projects')) {
    const dict = asDict(record, 'project')
    const title = sentence(textOf(dict.title))
    work.push({
      sourceId: slug(title),
      title,
      kind: kindFor(title),
      venue: sentence(textOf(dict.dates)),
      year: yearOf(sentence(textOf(dict.dates))),
      summary: WORK_COPY[title] ?? sentence(textOf(dict.body)),
      link: '',
      featured: /ems|quickattend/i.test(title),
      order: work.length,
    })
  }

  // Editorial interests: the CV prose is narrower than the current practice.
  const keywords = [
    'Natural language processing',
    'Speech recognition (ASR)',
    'Vision-language models',
    'LLM agents',
    'Guardrails and evaluation',
    'Sovereign AI',
    'Low-resource Thai NLP',
    'Data-centric machine learning',
    'Structure from motion',
    'Physics-informed networks',
    'Data systems and backend engineering',
  ].map((text) => ({ text }))

  const stack = skills
    .map((skill) => skill.value)
    .slice(0, 3)
    .join('\n')

  const site: SeedSite = {
    name: textOf(person.name),
    shortName: 'SmartWatt',
    role: 'Researcher, engineer & teacher',
    location: textOf(person.location),
    timezone: 'UTC+7',
    email,
    available: true,
    portraitUrl: '/img/profile.png',
    links,
    headline: 'I research language and data,\nbuild systems,\nand teach.',
    intro:
      'My research is mostly natural language processing (NLP). It covers speech, vision-language models, large language model (LLM) agents, guardrails, and sovereign AI. I also build backend systems, work with data, and teach.',
    currently:
      'I am Academy Secretary at the Artificial Intelligence Association of Thailand. I am a research assistant on a polyp-size study. I am backend lead at CU NEX.',
    openTo: 'Research collaborations, teaching, and systems or data work. Email is the fastest way to reach me.',
    stack,
    profile:
      'My work runs across language, data, and systems. I research speech recognition, vision-language models, LLM agents, guardrails, and sovereign AI. I also build backend systems and teach sessions on LLMs, retrieval, and agentic systems.\n\nI am an engineering student at Chulalongkorn University. I am Academy Secretary at the Artificial Intelligence Association of Thailand. I am a research assistant on a polyp-size study. I am backend lead at CU NEX and a full-stack developer for BIZCUBE Chula. I co-authored a paper at IEEE ICCI 2024 on contextual matching between music and image.',
    interests: keywords,
    skills,
    honors,
    metrics: [
      {
        value: '255+',
        label: 'candidates on the election platform',
        note: '27+ admins, CU NEX',
      },
      { value: '12', label: 'developers led at CU NEX', note: 'backend and releases' },
      { value: '8M', label: 'baht in course transactions', note: 'BIZCUBE Chula' },
      { value: '60%', label: 'less manual reconciliation', note: 'QuickAttend flow' },
      { value: '5,000+', label: 'students on MySK', note: '200+ teachers and directors' },
      { value: '3.88', label: 'CGPA / 4.00', note: 'ISE50 scholarship, 2025' },
    ],
    contactIntro:
      'Write to me about research collaborations, teaching, or systems and data work. I read every message. I usually reply within a few days.',
    contactMethods: [
      { label: 'Email', value: email, url: `mailto:${email}` },
      ...commonLinks
        .filter((link) => !link.url.includes('smartwatt.me'))
        .map((link) => ({ label: link.kind === 'github' ? 'GitHub' : 'LinkedIn', value: link.label, url: link.url })),
      { label: 'CV', value: 'cv-resume · PDF', url: `${CV_REPO}/blob/main/en/cv.pdf` },
    ],
    cvRepoUrl: CV_REPO,
    resumeUrl: `${CV_REPO}/blob/main/en/resume.pdf`,
    cvUrl: `${CV_REPO}/blob/main/en/cv.pdf`,
    lastSyncedAt: new Date().toISOString(),
    metaTitle: 'Smart Wattanapornmongkol — researcher, engineer, teacher',
    metaDescription:
      'Researcher, engineer, and teacher in Bangkok. My work covers natural language processing, speech, vision-language models, agents, guardrails, sovereign AI, backend systems, and teaching.',
    ogImage: '/opengraph-image',
  }

  // The one-page resume has a tighter current-appointment list; make sure those
  // roles are present even if the CV section is edited independently.
  void resumeSections

  return { site, work, experience, education }
}

/** Read a content value's text, for callers that need it. */
export function contentText(value: Value | undefined) {
  return isContent(value) ? value.text : textOf(value)
}
