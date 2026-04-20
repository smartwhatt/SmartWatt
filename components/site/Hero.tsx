'use client'

import { useContent } from './ThemeProvider'
import { Fragment } from 'react'

// Parse headline markup: [word] → accent, {word} → bold
function parseHeadline(str: string) {
  if (!str) return null
  const parts = str.split(/(\[[^\]]+\]|\{[^}]+\})/g)
  return parts.map((p, i) => {
    if (/^\[.+\]$/.test(p)) {
      return <em key={i} style={{ color: 'var(--color-accent)', fontWeight: 500, fontStyle: 'normal' }}>{p.slice(1, -1)}</em>
    }
    if (/^\{.+\}$/.test(p)) {
      return <span key={i} style={{ fontWeight: 500 }}>{p.slice(1, -1)}</span>
    }
    return <Fragment key={i}>{p}</Fragment>
  })
}

// Render multiline text preserving \n
export function Lines({ text }: { text: string }) {
  if (!text) return null
  const lines = text.split('\n')
  return (
    <>
      {lines.map((ln, i) => (
        <Fragment key={i}>{ln}{i < lines.length - 1 && <br />}</Fragment>
      ))}
    </>
  )
}

export default function Hero() {
  const c    = useContent()
  const hero = c.hero
  const meta = c.meta

  return (
    <section id="index" style={{
      padding: '160px 48px 80px', maxWidth: 1280, margin: '0 auto', position: 'relative',
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-accent)',
        letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 36,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ width: 32, height: 1, background: 'var(--color-accent)', display: 'inline-block' }} />
        {hero.indexNumber} — {meta.name}{meta.location ? ` · ${meta.location}` : ''}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 56, alignItems: 'start' }}>
        <div>
          <h1 style={{
            fontFamily: 'var(--font-sans)', fontWeight: 300,
            fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 1.0, letterSpacing: -2.5,
            margin: '0 0 32px',
          }}>
            {parseHeadline(hero.headlineLine1)}<br />
            {parseHeadline(hero.headlineLine2)}<br />
            {parseHeadline(hero.headlineLine3)}
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--color-muted)', maxWidth: 580, margin: '0 0 40px' }}>
            {hero.intro}
          </p>
          <div style={{ display: 'flex', gap: 14 }}>
            <a href="#work" style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: 1, textTransform: 'uppercase',
              padding: '12px 18px', background: 'var(--color-ink)', color: 'var(--color-bg)',
              textDecoration: 'none', borderRadius: 2, transition: 'transform 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
              View work →
            </a>
            <a href="#contact" style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: 1, textTransform: 'uppercase',
              padding: '12px 18px', background: 'transparent', color: 'var(--color-ink)',
              textDecoration: 'none', borderRadius: 2, border: '1px solid var(--color-rule)',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-ink)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-rule)')}>
              Get in touch
            </a>
          </div>
        </div>

        <div>
          <div style={{ borderLeft: '1px solid var(--color-rule)', paddingLeft: 24 }}>
            {hero.currently && <>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>Currently</div>
              <div style={{ fontSize: 14, lineHeight: 1.55, marginBottom: 24, color: 'var(--color-ink)' }}>
                <Lines text={hero.currently} />
              </div>
            </>}
            {hero.openTo && <>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>Open to</div>
              <div style={{ fontSize: 14, lineHeight: 1.55, marginBottom: 24, color: 'var(--color-ink)' }}>
                <Lines text={hero.openTo} />
              </div>
            </>}
            {hero.stack && <>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>Stack</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.7, color: 'var(--color-muted)' }}>
                <Lines text={hero.stack} />
              </div>
            </>}
          </div>
        </div>
      </div>
    </section>
  )
}
