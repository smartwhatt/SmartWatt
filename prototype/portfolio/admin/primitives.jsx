// Admin components — profile-editor feel (LinkedIn vibe, resume-update vibe),
// not a CMS. The point is: small surface, one-thing-at-a-time editing, then publish.

// ---------- Primitives ----------

function Field({ label, hint, children, required }) {
  return (
    <label style={{ display: 'block', marginBottom: 18 }}>
      <div style={{
        fontFamily: MONO, fontSize: 10, color: t().muted,
        letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8,
        display: 'flex', gap: 8, alignItems: 'center',
      }}>
        {label}
        {required && <span style={{ color: t().accent }}>*</span>}
        {hint && <span style={{ textTransform: 'none', letterSpacing: 0, color: t().mutedSoft, fontSize: 11 }}>— {hint}</span>}
      </div>
      {children}
    </label>
  );
}

function Input(props) {
  return (
    <input {...props} style={{
      width: '100%', padding: '10px 12px', fontFamily: SANS, fontSize: 15,
      background: t().card, color: t().ink,
      border: `1px solid ${t().rule}`, borderRadius: 4, outline: 'none',
      transition: 'border-color 0.15s, background 0.15s',
      ...(props.style || {}),
    }}
    onFocus={e => e.currentTarget.style.borderColor = t().accent}
    onBlur={e => e.currentTarget.style.borderColor = t().rule} />
  );
}

function Textarea(props) {
  return (
    <textarea {...props} style={{
      width: '100%', padding: '10px 12px', fontFamily: SANS, fontSize: 15,
      background: t().card, color: t().ink,
      border: `1px solid ${t().rule}`, borderRadius: 4, outline: 'none',
      resize: 'vertical', minHeight: 80, lineHeight: 1.5,
      transition: 'border-color 0.15s',
      ...(props.style || {}),
    }}
    onFocus={e => e.currentTarget.style.borderColor = t().accent}
    onBlur={e => e.currentTarget.style.borderColor = t().rule} />
  );
}

function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={onChange} style={{
      width: '100%', padding: '10px 12px', fontFamily: SANS, fontSize: 15,
      background: t().card, color: t().ink,
      border: `1px solid ${t().rule}`, borderRadius: 4, outline: 'none',
      cursor: 'pointer',
    }}>
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

function Btn({ children, onClick, variant = 'default', style = {}, title, disabled }) {
  const base = {
    fontFamily: MONO, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase',
    padding: '10px 14px', borderRadius: 3, cursor: disabled ? 'not-allowed' : 'pointer',
    border: '1px solid transparent', transition: 'all 0.15s', opacity: disabled ? 0.5 : 1,
  };
  const variants = {
    default: { background: t().card, border: `1px solid ${t().rule}`, color: t().ink },
    primary: { background: t().ink, color: t().bg, border: `1px solid ${t().ink}` },
    accent: { background: t().accent, color: '#fff', border: `1px solid ${t().accent}` },
    danger: { background: 'transparent', color: '#c44', border: '1px solid rgba(196,68,68,0.3)' },
    ghost: { background: 'transparent', color: t().muted, border: '1px solid transparent' },
  };
  return (
    <button onClick={disabled ? undefined : onClick} title={title} style={{ ...base, ...variants[variant], ...style }}>
      {children}
    </button>
  );
}

// ---------- Section Card ----------
// Collapsible, resume-section feel: header row with title + small meta, body content.

function SectionCard({ title, subtitle, count, children, defaultOpen = true }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div style={{
      background: t().card, border: `1px solid ${t().rule}`,
      borderRadius: 6, marginBottom: 20, overflow: 'hidden',
    }}>
      <div onClick={() => setOpen(!open)} style={{
        padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16,
        cursor: 'pointer', userSelect: 'none',
        borderBottom: open ? `1px solid ${t().rule}` : 'none',
        transition: 'background 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = t().bgAlt}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
        <span style={{
          fontFamily: MONO, fontSize: 10, color: t().muted,
          letterSpacing: 1, textTransform: 'uppercase', minWidth: 14,
          transition: 'transform 0.2s', display: 'inline-block',
          transform: open ? 'rotate(90deg)' : 'rotate(0)',
        }}>▸</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 500, color: t().ink, letterSpacing: -0.2 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 13, color: t().muted, marginTop: 3 }}>{subtitle}</div>}
        </div>
        {count !== undefined && (
          <span style={{
            fontFamily: MONO, fontSize: 11, color: t().muted,
            letterSpacing: 0.5, padding: '4px 10px', background: t().bgAlt, borderRadius: 10,
          }}>{count} {count === 1 ? 'entry' : 'entries'}</span>
        )}
      </div>
      {open && <div style={{ padding: '24px' }}>{children}</div>}
    </div>
  );
}

// ---------- List-item row (for Work / Experience / Education / Contact) ----------

function ItemRow({ index, total, onMoveUp, onMoveDown, onRemove, title, meta, children, defaultExpanded = false }) {
  const [expanded, setExpanded] = React.useState(defaultExpanded);
  return (
    <div style={{
      border: `1px solid ${t().rule}`, borderRadius: 4,
      marginBottom: 10, overflow: 'hidden', background: t().bg,
    }}>
      <div style={{
        padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
        cursor: 'pointer', userSelect: 'none',
      }} onClick={() => setExpanded(!expanded)}
      onMouseEnter={e => e.currentTarget.style.background = t().bgAlt}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
        <span style={{
          fontFamily: MONO, fontSize: 11, color: t().muted, minWidth: 22,
          textAlign: 'center',
        }}>{String(index + 1).padStart(2, '0')}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 14, fontWeight: 500, color: t().ink,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{title || <span style={{ color: t().muted, fontWeight: 400, fontStyle: 'italic' }}>Untitled</span>}</div>
          {meta && <div style={{
            fontSize: 12, color: t().muted, marginTop: 2,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{meta}</div>}
        </div>
        <div style={{ display: 'flex', gap: 4 }} onClick={e => e.stopPropagation()}>
          <Btn variant="ghost" onClick={() => onMoveUp()} disabled={index === 0} title="Move up" style={{ padding: '6px 8px', fontSize: 13 }}>↑</Btn>
          <Btn variant="ghost" onClick={() => onMoveDown()} disabled={index === total - 1} title="Move down" style={{ padding: '6px 8px', fontSize: 13 }}>↓</Btn>
          <Btn variant="danger" onClick={() => {
            if (confirm('Remove this entry?')) onRemove();
          }} title="Remove" style={{ padding: '6px 10px', fontSize: 11 }}>✕</Btn>
        </div>
        <span style={{
          fontFamily: MONO, fontSize: 10, color: t().muted, marginLeft: 4,
          transition: 'transform 0.2s', display: 'inline-block',
          transform: expanded ? 'rotate(90deg)' : 'rotate(0)',
        }}>▸</span>
      </div>
      {expanded && (
        <div style={{ padding: '18px', borderTop: `1px solid ${t().rule}`, background: t().card }}>
          {children}
        </div>
      )}
    </div>
  );
}

// arrayMove helper
function moveItem(arr, from, to) {
  if (to < 0 || to >= arr.length) return arr;
  const next = arr.slice();
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

Object.assign(window, { Field, Input, Textarea, Select, Btn, SectionCard, ItemRow, moveItem });
