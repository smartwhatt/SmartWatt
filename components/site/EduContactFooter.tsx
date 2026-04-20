'use client'

import { useState } from 'react'
import { useContent } from './ThemeProvider'
import { Lines } from './Hero'

export function Education() {
  const c   = useContent()
  const edu = c.education

  return (
    <section id="education" style={{ padding: '80px 48px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ marginBottom: 56 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-accent)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
          04 — Education
        </div>
        <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 'clamp(36px, 4.5vw, 56px)', letterSpacing: -1.5, margin: 0 }}>
          A long <em style={{ color: 'var(--color-accent)', fontWeight: 500, fontStyle: 'normal' }}>quiet</em> path.
        </h2>
      </div>

      <div style={{ position: 'relative', paddingLeft: 32 }}>
        <div style={{ position: 'absolute', top: 8, bottom: 8, left: 4, width: 1, background: 'var(--color-rule)' }} />
        {edu.map((row, i) => (
          <div key={row.id || i} style={{
            display: 'grid', gridTemplateColumns: '120px 1fr',
            padding: '20px 0', gap: 32, position: 'relative',
          }}>
            <div style={{
              position: 'absolute', left: -32, top: 28, width: 9, height: 9,
              background: i === 0 ? 'var(--color-accent)' : 'var(--color-bg)',
              border: `1px solid ${i === 0 ? 'var(--color-accent)' : 'var(--color-muted)'}`,
              borderRadius: '50%',
            }} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--color-muted)', paddingTop: 4, letterSpacing: 0.5 }}>{row.year}</div>
            <div>
              <div style={{ fontSize: 19, fontWeight: 500, marginBottom: 4, color: 'var(--color-ink)' }}>{row.school}</div>
              <div style={{ fontSize: 14, color: 'var(--color-muted)', lineHeight: 1.5 }}>{row.description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Contact() {
  const c       = useContent()
  const contact = c.contact
  const methods = contact.methods

  const [form, setForm]     = useState({ name: '', email: '', subject: '', body: '' })
  const [sent, setSent]     = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!form.name.trim())                              errs.name    = 'Required'
    if (!form.email.trim() || !/.+@.+\..+/.test(form.email)) errs.email = 'Valid email required'
    if (!form.subject.trim())                           errs.subject = 'Required'
    if (!form.body.trim() || form.body.length < 10)    errs.body    = 'A few sentences please'
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      setSent(true)
      setForm({ name: '', email: '', subject: '', body: '' })
      setTimeout(() => setSent(false), 6000)
    }
  }

  const inputStyle = (key: string): React.CSSProperties => ({
    width: '100%', background: 'transparent',
    border: 'none', borderBottom: `1px solid ${errors[key] ? '#c44' : 'var(--color-rule)'}`,
    color: 'var(--color-ink)', fontFamily: 'var(--font-sans)', fontSize: 17,
    padding: '14px 0 12px', outline: 'none', transition: 'border-color 0.2s',
  })

  return (
    <section id="contact" style={{ padding: '80px 48px', maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
      <div style={{ marginBottom: 56 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-accent)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
          05 — Contact
        </div>
        <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 'clamp(36px, 4.5vw, 56px)', letterSpacing: -1.5, margin: 0 }}>
          Let&apos;s <em style={{ color: 'var(--color-accent)', fontWeight: 500, fontStyle: 'normal' }}>talk</em>.
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
        {/* Left: links */}
        <div>
          {contact.intro && (
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--color-muted)', marginTop: 0, marginBottom: 32 }}>
              {contact.intro}
            </p>
          )}
          <div style={{ borderTop: '1px solid var(--color-rule)' }}>
            {methods.map((m, i) => (
              <div key={m.id || i} style={{
                display: 'grid', gridTemplateColumns: '120px 1fr',
                padding: '18px 0', borderBottom: '1px solid var(--color-rule)',
                alignItems: 'baseline', gap: 16,
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-muted)', letterSpacing: 1, textTransform: 'uppercase' }}>{m.label}</div>
                {m.href ? (
                  <a href={m.href} target="_blank" rel="noreferrer" style={{
                    fontSize: 15, color: 'var(--color-ink)', textDecoration: 'none',
                    borderBottom: '1px solid var(--color-accent)', paddingBottom: 2,
                    width: 'fit-content',
                  }}>{m.value}</a>
                ) : (
                  <span style={{ fontSize: 15, color: 'var(--color-ink)' }}>{m.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: contact form */}
        <div>
          <form onSubmit={onSubmit} style={{ position: 'relative' }}>
            {sent && (
              <div style={{
                position: 'absolute', inset: 0, background: 'var(--color-bg)',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                alignItems: 'flex-start', zIndex: 10, padding: 24,
                animation: 'fadein 0.4s',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-accent)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>● message received</div>
                <div style={{ fontSize: 24, fontWeight: 500, marginBottom: 8, color: 'var(--color-ink)' }}>Thank you.</div>
                <div style={{ color: 'var(--color-muted)', fontSize: 15, lineHeight: 1.5 }}>I&apos;ll reply as soon as I can — usually within a couple of days.</div>
              </div>
            )}

            {(['name', 'email', 'subject'] as const).map(k => (
              <div key={k} style={{ marginBottom: 20 }}>
                <label style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)',
                  letterSpacing: 1, textTransform: 'uppercase',
                  display: 'flex', justifyContent: 'space-between',
                }}>
                  <span>{k}</span>
                  {errors[k] && <span style={{ color: '#c44', textTransform: 'none' }}>{errors[k]}</span>}
                </label>
                <input
                  type={k === 'email' ? 'email' : 'text'}
                  value={form[k]}
                  onChange={e => setForm({ ...form, [k]: e.target.value })}
                  style={inputStyle(k)} />
              </div>
            ))}

            <div style={{ marginBottom: 28 }}>
              <label style={{
                fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)',
                letterSpacing: 1, textTransform: 'uppercase',
                display: 'flex', justifyContent: 'space-between',
              }}>
                <span>Message</span>
                {errors.body && <span style={{ color: '#c44', textTransform: 'none' }}>{errors.body}</span>}
              </label>
              <textarea rows={5} value={form.body}
                onChange={e => setForm({ ...form, body: e.target.value })}
                style={{ ...inputStyle('body'), resize: 'vertical', minHeight: 120 }} />
            </div>

            <button type="submit" style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: 1, textTransform: 'uppercase',
              padding: '14px 22px', background: 'var(--color-ink)', color: 'var(--color-bg)',
              border: 'none', borderRadius: 2, cursor: 'pointer', transition: 'transform 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
              Send message →
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const c    = useContent()
  const meta = c.meta

  return (
    <footer style={{ borderTop: '1px solid var(--color-rule)', marginTop: 80, padding: '40px 48px 32px' }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 16,
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-muted)',
        letterSpacing: 1, textTransform: 'uppercase',
      }}>
        <span>© {meta.copyrightYear || new Date().getFullYear()} · {meta.name}</span>
        <span>Built with care · Set in Ubuntu</span>
        <span>
          {meta.location}{meta.timezone ? ` · ${meta.timezone}` : ''}
          {meta.available && <span style={{ color: 'var(--color-accent)', marginLeft: 8 }}>●</span>}
        </span>
      </div>
    </footer>
  )
}
