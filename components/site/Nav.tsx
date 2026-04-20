'use client'

import { useState, useEffect } from 'react'
import { useTheme, useModeToggle, useContent } from './ThemeProvider'

export default function Nav() {
  const mode   = useTheme()
  const toggle = useModeToggle()
  const c      = useContent()
  const meta   = c.meta

  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'color-mix(in srgb, var(--color-bg) 94%, transparent)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--color-rule)' : '1px solid transparent',
      transition: 'background 0.3s, border-color 0.3s',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center',
        padding: '18px 48px',
        fontFamily: 'var(--font-mono)', fontSize: 12,
        letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--color-muted)',
      }}>
        <a href="#top" style={{ color: 'var(--color-ink)', fontWeight: 600, textDecoration: 'none' }}>
          {meta.shortName} —
        </a>
        <div style={{ display: 'flex', gap: 28 }}>
          {['Index', 'Work', 'Research', 'Education', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className="nav-link"
              style={{ color: 'var(--color-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-ink)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}>
              {l}
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'flex-end' }}>
          {meta.available && (
            <span style={{ color: 'var(--color-accent)' }}>● available</span>
          )}
          <button
            onClick={() => toggle(mode === 'light' ? 'dark' : 'light')}
            style={{
              background: 'transparent', border: '1px solid var(--color-rule)',
              color: 'var(--color-ink)', fontFamily: 'var(--font-mono)', fontSize: 11,
              letterSpacing: 0.5, textTransform: 'uppercase', padding: '6px 10px',
              borderRadius: 2, cursor: 'pointer', transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-bg-alt)'; e.currentTarget.style.borderColor = 'var(--color-muted)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--color-rule)' }}
            aria-label="Toggle theme">
            {mode === 'light' ? '◐ Dark' : '◑ Light'}
          </button>
        </div>
      </div>
    </nav>
  )
}
