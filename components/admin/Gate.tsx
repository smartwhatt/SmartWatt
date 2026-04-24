'use client'

import { useState, useTransition } from 'react'
import { login } from '@/lib/actions'

export default function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [pending, startTransition] = useTransition()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setErr('')

    const fd = new FormData()
    fd.set('email', email)
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
    <div className="flex min-h-screen items-center justify-center bg-[var(--adm-bg)] px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-[var(--adm-rule)] bg-[var(--adm-card)] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.2)]"
      >
        <div className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--adm-accent)]">
          ● profile editor
        </div>
        <h1 className="text-[26px] font-medium tracking-[-0.03em] text-[var(--adm-ink)]">
          Sign in to edit.
        </h1>
        <p className="mt-3 text-sm leading-6 text-[var(--adm-muted)]">
          This page is for editing your portfolio content. Only you should have the credentials.
        </p>

        <label className="mt-6 block">
          <div className="mb-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[var(--adm-muted)]">
            Email
          </div>
          <input
            type="email"
            autoFocus
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setErr('')
            }}
            className={`w-full rounded-md border bg-[var(--adm-bg)] px-3.5 py-3 text-base text-[var(--adm-ink)] outline-none transition focus:border-[var(--adm-accent)] ${err ? 'border-[#c44]' : 'border-[var(--adm-rule)]'}`}
          />
        </label>

        <label className="mt-4 block">
          <div className="mb-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[var(--adm-muted)]">
            Password
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setErr('')
            }}
            className={`w-full rounded-md border bg-[var(--adm-bg)] px-3.5 py-3 text-base text-[var(--adm-ink)] outline-none transition focus:border-[var(--adm-accent)] ${err ? 'border-[#c44]' : 'border-[var(--adm-rule)]'}`}
          />
        </label>

        {err ? <div className="mt-4 text-sm text-[#c44]">{err}</div> : null}

        <button
          type="submit"
          disabled={pending || !email || !password}
          className="mt-6 w-full rounded-md bg-[var(--adm-ink)] px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--adm-bg)] transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? 'Checking…' : 'Unlock →'}
        </button>
      </form>
    </div>
  )
}
