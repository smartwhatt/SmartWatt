'use client'

import { useState, useTransition } from 'react'
import { login } from '@/lib/actions'

export default function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [email,   setEmail]   = useState('')
  const [password, setPassword] = useState('')
  const [err,     setErr]     = useState('')
  const [pending, startTransition] = useTransition()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setErr('')
    const fd = new FormData()
    fd.set('email',    email)
    fd.set('password', password)
    startTransition(async () => {
      const res = await login(fd)
      if (res?.error) {
        setErr(res.error)
        setPassword('')
      } else {
        onUnlock()
      }
    })
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--adm-bg)', padding: 24,
    }}>
      <form onSubmit={submit} style={{
        maxWidth: 380, width: '100%',
        background: 'var(--adm-card)', border: '1px solid var(--adm-rule)',
        borderRadius: 8, padding: 32, boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--adm-accent)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
          ● profile editor
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 500, letterSpacing: -0.5, margin: '0 0 10px', color: 'var(--adm-ink)' }}>
          Sign in to edit.
        </h1>
        <p style={{ color: 'var(--adm-muted)', fontSize: 14, margin: '0 0 24px', lineHeight: 1.5 }}>
          This page is for editing your portfolio content. Only you should have the credentials.
        </p>

        <label style={{ display: 'block', marginBottom: 16 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--adm-muted)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
            Email
          </div>
          <input type="email" autoFocus value={email}
            onChange={e => { setEmail(e.target.value); setErr('') }}
            style={{
              width: '100%', padding: '12px 14px', fontFamily: 'var(--font-sans)', fontSize: 16,
              background: 'var(--adm-bg)', color: 'var(--adm-ink)',
              border: `1px solid ${err ? '#c44' : 'var(--adm-rule)'}`, borderRadius: 4, outline: 'none',
            }} />
        </label>

        <label style={{ display: 'block', marginBottom: 16 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--adm-muted)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
            Password
          </div>
          <input type="password" value={password}
            onChange={e => { setPassword(e.target.value); setErr('') }}
            style={{
              width: '100%', padding: '12px 14px', fontFamily: 'var(--font-sans)', fontSize: 16,
              background: 'var(--adm-bg)', color: 'var(--adm-ink)',
              border: `1px solid ${err ? '#c44' : 'var(--adm-rule)'}`, borderRadius: 4, outline: 'none',
            }} />
        </label>

        {err && <div style={{ color: '#c44', fontSize: 13, marginBottom: 14 }}>{err}</div>}

        <button type="submit" disabled={pending || !email || !password} style={{
          width: '100%', padding: '12px',
          background: 'var(--adm-ink)', color: 'var(--adm-bg)',
          border: 'none', fontFamily: 'var(--font-mono)', fontSize: 12,
          letterSpacing: 1, textTransform: 'uppercase',
          borderRadius: 4, cursor: pending || !email || !password ? 'not-allowed' : 'pointer',
          opacity: pending || !email || !password ? 0.6 : 1,
        }}>
          {pending ? 'Checking…' : 'Unlock →'}
        </button>
      </form>
    </div>
  )
}
