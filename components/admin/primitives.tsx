'use client'

import { useId, useState } from 'react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function Field({
  label,
  hint,
  children,
  required,
  className,
}: {
  label: string
  hint?: string
  children: ReactNode
  required?: boolean
  className?: string
}) {
  return (
    <label className={cx('block', className)}>
      <div className="mb-2 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[var(--adm-muted)]">
        <span>{label}</span>
        {required ? <span className="text-[var(--adm-accent)]">*</span> : null}
        {hint ? (
          <span className="text-[11px] normal-case tracking-normal text-[var(--adm-muted-soft)]">
            {hint}
          </span>
        ) : null}
      </div>
      {children}
    </label>
  )
}

export function Input({
  className,
  ...props
}: ComponentPropsWithoutRef<'input'>) {
  return (
    <input
      className={cx(
        'w-full rounded-md border border-[var(--adm-rule)] bg-[var(--adm-card)] px-3 py-2.5 text-[15px] text-[var(--adm-ink)] outline-none transition focus:border-[var(--adm-accent)]',
        className,
      )}
      {...props}
    />
  )
}

export function Textarea({
  className,
  ...props
}: ComponentPropsWithoutRef<'textarea'>) {
  return (
    <textarea
      className={cx(
        'min-h-20 w-full resize-y rounded-md border border-[var(--adm-rule)] bg-[var(--adm-card)] px-3 py-2.5 text-[15px] leading-6 text-[var(--adm-ink)] outline-none transition focus:border-[var(--adm-accent)]',
        className,
      )}
      {...props}
    />
  )
}

export function Select({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md border border-[var(--adm-rule)] bg-[var(--adm-card)] px-3 py-2.5 text-[15px] text-[var(--adm-ink)] outline-none transition focus:border-[var(--adm-accent)]"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

type BtnVariant = 'default' | 'primary' | 'accent' | 'danger' | 'ghost'

export function Btn({
  children,
  onClick,
  variant = 'default',
  className,
  title,
  disabled,
  type = 'button',
}: {
  children: ReactNode
  onClick?: () => void
  variant?: BtnVariant
  className?: string
  title?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}) {
  const variants: Record<BtnVariant, string> = {
    default:
      'border-[var(--adm-rule)] bg-[var(--adm-card)] text-[var(--adm-ink)] hover:border-[var(--adm-accent)]',
    primary:
      'border-[var(--adm-ink)] bg-[var(--adm-ink)] text-[var(--adm-bg)]',
    accent:
      'border-[var(--adm-accent)] bg-[var(--adm-accent)] text-white',
    danger:
      'border-[rgba(196,68,68,.3)] bg-transparent text-[#c44]',
    ghost:
      'border-transparent bg-transparent text-[var(--adm-muted)] hover:text-[var(--adm-ink)]',
  }

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      title={title}
      disabled={disabled}
      className={cx(
        'rounded-md border px-3.5 py-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] transition',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  )
}

export function SectionCard({
  title,
  subtitle,
  count,
  children,
  defaultOpen = true,
}: {
  title: string
  subtitle?: string
  count?: number
  children: ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="mb-5 overflow-hidden rounded-xl border border-[var(--adm-rule)] bg-[var(--adm-card)]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cx(
          'flex w-full items-center gap-4 px-6 py-5 text-left transition hover:bg-[var(--adm-bg-alt)]',
          open ? 'border-b border-[var(--adm-rule)]' : '',
        )}
      >
        <span
          className={cx(
            'inline-block font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[var(--adm-muted)] transition',
            open ? 'rotate-90' : '',
          )}
        >
          ▸
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[17px] font-medium text-[var(--adm-ink)]">{title}</div>
          {subtitle ? (
            <div className="mt-1 text-[13px] text-[var(--adm-muted)]">{subtitle}</div>
          ) : null}
        </div>
        {count !== undefined ? (
          <span className="rounded-full bg-[var(--adm-bg-alt)] px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--adm-muted)]">
            {count} {count === 1 ? 'entry' : 'entries'}
          </span>
        ) : null}
      </button>
      {open ? <div className="space-y-5 p-6">{children}</div> : null}
    </div>
  )
}

export function ItemRow({
  index,
  total,
  onMoveUp,
  onMoveDown,
  onRemove,
  title,
  meta,
  children,
  defaultExpanded = false,
}: {
  index: number
  total: number
  onMoveUp: () => void
  onMoveDown: () => void
  onRemove: () => void
  title?: string
  meta?: string
  children: ReactNode
  defaultExpanded?: boolean
}) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--adm-rule)] bg-[var(--adm-bg)]">
      <div className="flex items-center gap-3 px-4 py-3 transition hover:bg-[var(--adm-bg-alt)]">
        <button type="button" onClick={() => setExpanded((value) => !value)} className="flex min-w-0 flex-1 items-center gap-3 text-left">
          <span className="min-w-6 text-center font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--adm-muted)]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-[var(--adm-ink)]">
              {title || <span className="font-normal italic text-[var(--adm-muted)]">Untitled</span>}
            </div>
            {meta ? <div className="mt-1 truncate text-xs text-[var(--adm-muted)]">{meta}</div> : null}
          </div>
        </button>
        <div className="flex items-center gap-1">
          <Btn variant="ghost" onClick={onMoveUp} disabled={index === 0} className="px-2 py-1 text-xs">
            ↑
          </Btn>
          <Btn variant="ghost" onClick={onMoveDown} disabled={index === total - 1} className="px-2 py-1 text-xs">
            ↓
          </Btn>
          <Btn
            variant="danger"
            onClick={() => {
              if (confirm('Remove this entry?')) onRemove()
            }}
            className="px-2.5 py-1 text-xs"
          >
            ✕
          </Btn>
        </div>
        <span
          className={cx(
            'inline-block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--adm-muted)] transition',
            expanded ? 'rotate-90' : '',
          )}
        >
          ▸
        </span>
      </div>
      {expanded ? <div className="space-y-4 border-t border-[var(--adm-rule)] bg-[var(--adm-card)] p-5">{children}</div> : null}
    </div>
  )
}

export function ThumbnailInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const fileId = useId()

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 500 * 1024) {
      alert('Image too large (>500KB). Use a URL or compress it first.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => onChange(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex items-start gap-3">
      {value ? (
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            className="h-12 w-12 rounded-md border border-[var(--adm-rule)] object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.opacity = '0.3'
            }}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -right-1.5 -top-1.5 h-4.5 w-4.5 rounded-full bg-[#c44] text-[11px] leading-none text-white"
          >
            ×
          </button>
        </div>
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-md border border-dashed border-[var(--adm-rule)] text-lg text-[var(--adm-muted-soft)]">
          ◻
        </div>
      )}

      <div className="flex-1">
        <Input
          value={value?.startsWith('data:') ? '(uploaded image)' : value || ''}
          readOnly={Boolean(value?.startsWith('data:'))}
          placeholder="https://… or upload"
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="mt-2">
          <label htmlFor={fileId} className="inline-block cursor-pointer">
            <span className="inline-flex rounded-md border border-transparent bg-transparent px-3.5 py-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--adm-muted)] transition hover:text-[var(--adm-ink)]">
              Upload
            </span>
          </label>
          <input id={fileId} type="file" accept="image/*" className="hidden" onChange={onFile} />
        </div>
      </div>
    </div>
  )
}

export function Divider() {
  return <div className="h-px bg-[var(--adm-rule)]" />
}

export function moveItem<T>(arr: T[], from: number, to: number): T[] {
  if (to < 0 || to >= arr.length) return arr
  const next = arr.slice()
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}
