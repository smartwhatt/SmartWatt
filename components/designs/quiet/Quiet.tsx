import { parseHeadline } from '@/lib/headline'
import type { ExperienceItem, SiteData, WorkItem } from '@/lib/site-data'
import { NOW } from '@/lib/site-data'

import QuietMotion from './QuietMotion'
import s from './quiet.module.css'

const KIND: Record<WorkItem['kind'], string> = {
  publication: 'Paper',
  system: 'System',
  research: 'Research',
  project: 'Project',
}

function WorkRow({ item }: { item: WorkItem }) {
  const note = item.kind === 'publication' ? item.venue : item.summary

  const body = (
    <>
      <span className={s.workYear}>{item.year}</span>
      <span className={s.workMain}>
        <span className={s.workTitle}>{item.title}</span>
        {note ? <span className={s.workNote}>{note}</span> : null}
      </span>
      <span className={s.workKind}>{KIND[item.kind]}</span>
    </>
  )

  return item.link ? (
    <a className={s.workRow} href={item.link} target="_blank" rel="noreferrer">
      {body}
    </a>
  ) : (
    <div className={s.workRow}>{body}</div>
  )
}


function TeaCup() {
  return (
    <span className={s.teaCup} aria-hidden>
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h20v6a10 10 0 0 1-20 0v-6Z" />
        <path d="M29 21h3.5a4.5 4.5 0 0 1 0 9H29" />
        <path d="M6 36h28" />
        <path className={s.steam} d="M16 14c-2.5-3 2.5-5 0-8" />
        <path className={`${s.steam} ${s.steamTwo}`} d="M23 14c-2.5-3 2.5-5 0-8" />
      </svg>
    </span>
  )
}

function ExperienceRow({ item, compact = false }: { item: ExperienceItem; compact?: boolean }) {
  const lead = item.summary || item.bullets[0] || ''
  const rest = item.bullets.filter((bullet) => bullet !== lead)

  return (
    <article className={`${s.entry} ${compact ? s.entryCompact : ''}`}>
      <span className={s.period}>{item.period}</span>
      <div className={s.entryBody}>
        <h3>{item.role}</h3>
        <p className={s.org}>
          {item.org}
          {item.location ? <span className={s.orgPlace}> · {item.location}</span> : null}
        </p>
        {lead ? <p className={s.lead}>{lead}</p> : null}

        {rest.length ? (
          <details className={s.details}>
            <summary aria-label={`More about ${item.role}`}>Details</summary>
            <ul>
              {rest.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
          </details>
        ) : null}
      </div>
    </article>
  )
}

export default function Quiet({ data }: { data: SiteData }) {
  const { profile, work, experience, education } = data
  const lines = parseHeadline(profile.headline)

  const appointments = experience.filter((item) => item.category !== 'teaching')
  const teaching = experience.filter((item) => item.category === 'teaching')
  const updated = profile.cv.syncedAt
    ? new Date(profile.cv.syncedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null

  return (
    <div className={s.root}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <QuietMotion />
      <header className={s.header}>
        <div className={s.headerInner}>
          <a className={s.brand} href="#top">
            {profile.name}
          </a>
          <nav className={s.nav} aria-label="Sections">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#teaching">Teaching</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className={s.headerMail} href={`mailto:${profile.email}`}>
            Email
          </a>
        </div>
      </header>

      <main id="main">
        <section className={s.hero} id="top">
          <div className={s.heroCopy}>
            <h1>
              {lines.map((line, index) => (
                <span key={index} className={s.headlineLine}>
                  {line.map((segment, segmentIndex) =>
                    segment.emphasis ? (
                      <em key={segmentIndex}>{segment.text}</em>
                    ) : (
                      <span key={segmentIndex}>{segment.text}</span>
                    ),
                  )}
                </span>
              ))}
            </h1>

            <p className={s.intro}>{profile.intro}</p>

            {profile.currently ? (
              <p className={s.now}>
                <span className={s.nowLabel}>Now</span>
                {profile.currently}
              </p>
            ) : null}

            <div className={s.heroLinks}>
              <a href="#work">
                Selected work <span aria-hidden>↓</span>
              </a>
              <a href={profile.cv.full} target="_blank" rel="noreferrer">
                CV <span aria-hidden>↗</span>
              </a>
            </div>
          </div>

          {profile.portraitUrl ? (
            <figure className={s.portrait}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={profile.portraitUrl} alt={`${profile.name}, portrait`} />
              <figcaption>
                {profile.name}
                <br />
                {profile.location}
              </figcaption>
              <span className={s.heroCup}>
                <TeaCup />
              </span>
            </figure>
          ) : null}
        </section>

        <section className={s.section} id="work" data-reveal>
          <span className={s.sectionRule} aria-hidden />
          <h2>Selected work</h2>
          <div className={s.workList}>
            {work.map((item) => (
              <WorkRow key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className={s.section} id="experience" data-reveal>
          <span className={s.sectionRule} aria-hidden />
          <h2>Experience</h2>
          <div className={s.entries}>
            {appointments.map((item) => (
              <ExperienceRow key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className={s.section} id="teaching" data-reveal>
          <span className={s.sectionRule} aria-hidden />
          <h2>Teaching</h2>
          <div className={s.entries}>
            {teaching.map((item) => (
              <ExperienceRow key={item.id} item={item} compact />
            ))}
          </div>
        </section>

        <section className={s.section} id="education" data-reveal>
          <span className={s.sectionRule} aria-hidden />
          <h2>Education</h2>
          <div className={s.entries}>
            {education.map((item) => (
              <article key={item.id} className={s.entry}>
                <span className={s.period}>{item.period}</span>
                <div className={s.entryBody}>
                  <h3>{item.school}</h3>
                  <p className={s.org}>
                    {item.degree}
                    {item.location ? <span className={s.orgPlace}> · {item.location}</span> : null}
                  </p>
                  {item.description ? <p className={s.lead}>{item.description}</p> : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={s.section} id="about" data-reveal>
          <span className={s.sectionRule} aria-hidden />
          <h2>About</h2>
          <div className={s.aboutGrid}>
            <div className={s.prose}>
              {profile.profile.split('\n\n').map((paragraph, index) => (
                <p key={index} className={index === 0 ? s.dropcap : undefined}>
                  {paragraph}
                </p>
              ))}
              {profile.openTo ? (
                <p className={s.openTo}>
                  <span className={s.nowLabel}>Open to</span>
                  {profile.openTo}
                </p>
              ) : null}
            </div>

            <aside className={s.aside}>
              <div>
                <h3>Research interests</h3>
                <ul>
                  {profile.interests.map((interest) => (
                    <li key={interest}>{interest}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3>Tools</h3>
                <dl>
                  {profile.skills.map((skill) => (
                    <div key={skill.label}>
                      <dt>{skill.label}</dt>
                      <dd>{skill.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {profile.honors.length ? (
                <div>
                  <h3>Honors</h3>
                  <ul>
                    {profile.honors.map((honor) => (
                      <li key={honor}>{honor}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </aside>
          </div>
        </section>

        <section className={s.contact} id="contact" data-reveal>
          <span className={s.sectionRule} aria-hidden />
          <h2>Contact</h2>
          <p className={s.contactIntro}>{profile.contactIntro}</p>

          <a className={s.email} href={`mailto:${profile.email}`}>
            {profile.email}
          </a>

          <div className={s.links}>
            {profile.contactMethods
              .filter((method) => method.label !== 'Email' && method.url)
              .map((method) => (
                <a key={method.label} href={method.url ?? '#'} target="_blank" rel="noreferrer">
                  {method.label} <span aria-hidden>↗</span>
                </a>
              ))}
            <a href={profile.cv.repo} target="_blank" rel="noreferrer">
              cv-resume <span aria-hidden>↗</span>
            </a>
          </div>

          {updated ? <p className={s.updated}>Last updated {updated}.</p> : null}
        </section>
      </main>

      <footer className={s.footer}>
        <span>
          © {NOW.getFullYear()} {profile.name}
        </span>
        <span>
          {profile.location}
          {profile.timezone ? ` · ${profile.timezone}` : ''}
        </span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  )
}
