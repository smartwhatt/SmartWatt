'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'

// ── Field ─────────────────────────────────────────────────────
export function Field({ label, hint, children, required }: {
  label: string; hint?: string; children: ReactNode; required?: boolean
}) {
  return (
    <label style={{ display: 'block', marginBottom: 18 }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--adm-muted)',
        letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8,
        display: 'flex', gap: 8, alignItems: 'center',
      }}>
        {label}
        {required && <span style={{ color: 'var(--adm-accent)' }}>*</span>}
        {hint && <span style={{ textTransform: 'none', letterSpacing: 0, color: 'var(--adm-muted-soft)', fontSize: 11 }}>— {hint}</span>}
      </div>
      {children}
    </label>
  )
}

// ── Input ─────────────────────────────────────────────────────
export function Input({ style, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...props} style={{
      width: '100%', padding: '10px 12px',
      fontFamily: 'var(--font-sans)', fontSize: 15,
      background: 'var(--adm-card)', color: 'var(--adm-ink)',
      border: '1px solid var(--adm-rule)', borderRadius: 4, outline: 'none',
      transition: 'border-color 0.15s, background 0.15s',
      ...style,
    }}
    onFocus={e => (e.currentTarget.style.borderColor = 'var(--adm-accent)')}
    onBlur={e  => (e.currentTarget.style.borderColor = 'var(--adm-rule)')} />
  )
}

// ── Textarea ──────────────────────────────────────────────────
export function Textarea({ style, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea {...props} style={{
      width: '100%', padding: '10px 12px',
      fontFamily: 'var(--font-sans)', fontSize: 15,
      background: 'var(--adm-card)', color: 'var(--adm-ink)',
      border: '1px solid var(--adm-rule)', borderRadius: 4, outline: 'none',
      resize: 'vertical', minHeight: 80, lineHeight: 1.5,
      transition: 'border-color 0.15s',
      ...style,
    }}
    onFocus={e => (e.currentTarget.style.borderColor = 'var(--adm-accent)')}
    onBlur={e  => (e.currentTarget.style.borderColor = 'var(--adm-rule)')} />
  )
}

// ── Select ────────────────────────────────────────────────────
export function Select({ value, onChange, options }: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{
      width: '100%', padding: '10px 12px',
      fontFamily: 'var(--font-sans)', fontSize: 15,
      background: 'var(--adm-card)', color: 'var(--adm-ink)',
      border: '1px solid var(--adm-rule)', borderRadius: 4, outline: 'none', cursor: 'pointer',
    }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

// ── Btn ───────────────────────────────────────────────────────
type BtnVariant = 'default' | 'primary' | 'accent' | 'danger' | 'ghost'
export function Btn({ children, onClick, variant = 'default', style, title, disabled }: {
  children: ReactNode; onClick?: () => void; variant?: BtnVariant
  style?: React.CSSProperties; title?: string; disabled?: boolean
}) {
  const base: React.CSSProperties = {
    fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase',
    padding: '10px 14px', borderRadius: 3,
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: '1px solid transparent', transition: 'all 0.15s',
    opacity: disabled ? 0.5 : 1,
  }
  const variants: Record<BtnVariant, React.CSSProperties> = {
    default: { background: 'var(--adm-card)',    border: '1px solid var(--adm-rule)',    color: 'var(--adm-ink)'  },
    primary: { background: 'var(--adm-ink)',     border: '1px solid var(--adm-ink)',     color: 'var(--adm-bg)'   },
    accent:  { background: 'var(--adm-accent)',  border: '1px solid var(--adm-accent)',  color: '#fff'            },
    danger:  { background: 'transparent',        border: '1px solid rgba(196,68,68,.3)', color: '#c44'            },
    ghost:   { background: 'transparent',        border: '1px solid transparent',        color: 'var(--adm-muted)' },
  }
  return (
    <button onClick={disabled ? undefined : onClick} title={title}
      style={{ ...base, ...variants[variant], ...style }}>
      {children}
    </button>
  )
}

// ── SectionCard ───────────────────────────────────────────────
export function SectionCard({ title, subtitle, count, children, defaultOpen = true }: {
  title: string; subtitle?: string; count?: number
  children: ReactNode; defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{
      background: 'var(--adm-card)', border: '1px solid var(--adm-rule)',
      borderRadius: 6, marginBottom: 20, overflow: 'hidden',
    }}>
      <div onClick={() => setOpen(!open)} style={{
        padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16,
        cursor: 'pointer', userSelect: 'none',
        borderBottom: open ? '1px solid var(--adm-rule)' : 'none',
        transition: 'background 0.15s',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--adm-bg-alt)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--adm-muted)',
          letterSpacing: 1, textTransform: 'uppercase', minWidth: 14,
          transition: 'transform 0.2s', display: 'inline-block',
          transform: open ? 'rotate(90deg)' : 'rotate(0)',
        }}>▸</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 500, color: 'var(--adm-ink)', letterSpacing: -0.2 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 13, color: 'var(--adm-muted)', marginTop: 3 }}>{subtitle}</div>}
        </div>
        {count !== undefined && (
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--adm-muted)',
            letterSpacing: 0.5, padding: '4px 10px', background: 'var(--adm-bg-alt)', borderRadius: 10,
          }}>{count} {count === 1 ? 'entry' : 'entries'}</span>
        )}
      </div>
      {open && <div style={{ padding: '24px' }}>{children}</div>}
    </div>
  )
}

// ── ItemRow ───────────────────────────────────────────────────
export function ItemRow({ index, total, onMoveUp, onMoveDown, onRemove, title, meta, children, defaultExpanded = false }: {
  index: number; total: number
  onMoveUp: () => void; onMoveDown: () => void; onRemove: () => void
  title?: string; meta?: string; children: ReactNode; defaultExpanded?: boolean
}) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  return (
    <div style={{ border: '1px solid var(--adm-rule)', borderRadius: 4, marginBottom: 10, overflow: 'hidden', background: 'var(--adm-bg)' }}>
      <div onClick={() => setExpanded(!expanded)} style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', userSelect: 'none' }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--adm-bg-alt)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--adm-muted)', minWidth: 22, textAlign: 'center' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--adm-ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {title || <span style={{ color: 'var(--adm-muted)', fontWeight: 400, fontStyle: 'italic' }}>Untitled</span>}
          </div>
          {meta && <div style={{ fontSize: 12, color: 'var(--adm-muted)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{meta}</div>}
        </div>
        <div style={{ display: 'flex', gap: 4 }} onClick={e => e.stopPropagation()}>
          <Btn variant="ghost" onClick={onMoveUp}   disabled={index === 0}          style={{ padding: '6px 8px', fontSize: 13 }}>↑</Btn>
          <Btn variant="ghost" onClick={onMoveDown} disabled={index === total - 1}  style={{ padding: '6px 8px', fontSize: 13 }}>↓</Btn>
          <Btn variant="danger" onClick={() => { if (confirm('Remove this entry?')) onRemove() }} style={{ padding: '6px 10px', fontSize: 11 }}>✕</Btn>
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--adm-muted)', marginLeft: 4,
          transition: 'transform 0.2s', display: 'inline-block',
          transform: expanded ? 'rotate(90deg)' : 'rotate(0)',
        }}>▸</span>
      </div>
      {expanded && (
        <div style={{ padding: '18px', borderTop: '1px solid var(--adm-rule)', background: 'var(--adm-card)' }}>
          {children}
        </div>
      )}
    </div>
  )
}

// ── ThumbnailInput ────────────────────────────────────────────
export function ThumbnailInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.size > 500 * 1024) { alert('Image too large (>500KB). Use a URL or compress it first.'); return }
    const reader = new FileReader()
    reader.onload = () => onChange(reader.result as string)
    reader.readAsDataURL(f)
  }
  const fileId = `thumb-upload-${Math.random().toString(36).slice(2)}`
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      {value ? (
        <div style={{ position: 'relative' }}>
          <img src={value} alt="" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 3, border: '1px solid var(--adm-rule)' }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0.3' }} />
          <button onClick={() => onChange('')} style={{
            position: 'absolute', top: -6, right: -6, width: 18, height: 18, borderRadius: '50%',
            background: '#c44', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 11, lineHeight: '18px', padding: 0,
          }}>×</button>
        </div>
      ) : (
        <div style={{ width: 48, height: 48, borderRadius: 3, border: '1px dashed var(--adm-rule)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--adm-muted-soft)', fontSize: 18 }}>◻</div>
      )}
      <div style={{ flex: 1 }}>
        <Input
          value={value?.startsWith('data:') ? '(uploaded image)' : (value || '')}
          readOnly={!!value?.startsWith('data:')}
          placeholder="https://… or upload"
          onChange={e => onChange(e.target.value)} />
        <div style={{ marginTop: 6 }}>
          <label htmlFor={fileId} style={{ display: 'inline-block', cursor: 'pointer' }}>
            <Btn variant="ghost" onClick={() => document.getElementById(fileId)?.click()}>Upload</Btn>
          </label>
          <input id={fileId} type="file" accept="image/*" style={{ display: 'none' }} onChange={onFile} />
        </div>
      </div>
    </div>
  )
}

// ── Divider ───────────────────────────────────────────────────
export function Divider() {
  return <div style={{ height: 1, background: 'var(--adm-rule)', margin: '20px 0' }} />
}

// ── Helper: move item in array ────────────────────────────────
export function moveItem<T>(arr: T[], from: number, to: number): T[] {
  if (to < 0 || to >= arr.length) return arr
  const next = arr.slice()
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}
