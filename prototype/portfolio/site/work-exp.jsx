// Selected Work + Research/Publications sections

function Work() {
  const t = useT();
  const c = useC();
  const all = Array.isArray(c.work) ? c.work : [];
  const [filter, setFilter] = React.useState('all');
  const filtered = filter === 'all' ? all : all.filter(w => (w.kind || '') === filter);
  return (
    <section id="work" style={{ padding: '80px 48px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 36, flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div style={{ fontFamily: MONO, fontSize: 11, color: t.accent, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>02 — Selected Work</div>
          <h2 style={{ fontFamily: SANS, fontWeight: 300, fontSize: 'clamp(36px, 4.5vw, 56px)', letterSpacing: -1.5, margin: 0 }}>
            Things I&apos;ve <em style={{ color: t.accent, fontWeight: 500, fontStyle: 'normal' }}>shipped</em>, written, or researched.
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 4, fontFamily: MONO, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' }}>
          {[['all', 'All'], ['research', 'Research'], ['engineering', 'Engineering']].map(([k, l]) => (
            <button key={k} onClick={() => setFilter(k)} style={{
              padding: '8px 14px', background: filter === k ? t.ink : 'transparent',
              color: filter === k ? t.bg : t.muted, border: `1px solid ${filter === k ? t.ink : t.rule}`,
              borderRadius: 2, cursor: 'pointer', fontFamily: MONO, fontSize: 11,
              letterSpacing: 1, textTransform: 'uppercase', transition: 'all 0.2s',
            }}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${t.rule}` }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '90px 1fr 1fr 100px 100px',
          padding: '14px 0', fontFamily: MONO, fontSize: 10, color: t.muted,
          letterSpacing: 1.2, textTransform: 'uppercase', borderBottom: `1px solid ${t.ruleSoft}`,
        }}>
          <span>№</span><span>Title</span><span>Venue / Role</span><span>Kind</span><span style={{ textAlign: 'right' }}>Year</span>
        </div>
        {filtered.length === 0 && (
          <div style={{ padding: '40px 0', color: t.muted, fontFamily: MONO, fontSize: 13 }}>
            No entries for this filter.
          </div>
        )}
        {filtered.map((row, i) => {
          const hasLink = row.link && row.link.trim();
          return (
            <a
              key={row.id || i}
              href={hasLink ? row.link : '#'}
              onClick={hasLink ? undefined : (e => e.preventDefault())}
              target={hasLink ? '_blank' : undefined}
              rel={hasLink ? 'noreferrer' : undefined}
              style={{
                display: 'grid', gridTemplateColumns: '90px 1fr 1fr 100px 100px',
                padding: '24px 0', borderBottom: `1px solid ${t.rule}`,
                fontSize: 16, alignItems: 'baseline', textDecoration: 'none', color: t.ink,
                transition: 'background 0.25s, padding 0.25s',
                paddingLeft: 0, paddingRight: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = t.bgAlt; e.currentTarget.style.paddingLeft = '12px'; e.currentTarget.style.paddingRight = '12px'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.paddingLeft = '0'; e.currentTarget.style.paddingRight = '0'; }}>
              <span style={{ fontFamily: MONO, fontSize: 12, color: t.muted }}>{row.id || ''}</span>
              <span style={{ fontWeight: 500, paddingRight: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
                {row.thumbnail && (
                  <img src={row.thumbnail} alt="" style={{
                    width: 36, height: 36, objectFit: 'cover', borderRadius: 2,
                    border: `1px solid ${t.rule}`, flexShrink: 0,
                  }} onError={e => e.currentTarget.style.display = 'none'} />
                )}
                <span>{row.title}</span>
              </span>
              <span style={{ color: t.muted, fontSize: 14, paddingRight: 24 }}>{row.venue}</span>
              <span style={{ fontFamily: MONO, fontSize: 10, color: t.muted, letterSpacing: 1, textTransform: 'uppercase' }}>· {row.kind}</span>
              <span style={{ textAlign: 'right', fontFamily: MONO, fontSize: 12, color: t.muted }}>{row.year} →</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function Experience() {
  const t = useT();
  const c = useC();
  const exp = Array.isArray(c.experience) ? c.experience : [];
  return (
    <section id="research" style={{ padding: '80px 48px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div style={{ fontFamily: MONO, fontSize: 11, color: t.accent, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>03 — Experience &amp; Research</div>
          <h2 style={{ fontFamily: SANS, fontWeight: 300, fontSize: 'clamp(36px, 4.5vw, 56px)', letterSpacing: -1.5, margin: 0 }}>
            Where I&apos;ve been<br/><em style={{ color: t.accent, fontWeight: 500, fontStyle: 'normal' }}>working</em> &amp; <em style={{ color: t.accent, fontWeight: 500, fontStyle: 'normal' }}>thinking</em>.
          </h2>
        </div>
        <div style={{ fontFamily: MONO, fontSize: 11, color: t.muted, letterSpacing: 1, textTransform: 'uppercase' }}>{exp.length} entries</div>
      </div>

      {exp.map((row, i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '180px 1fr',
          padding: '32px 0', borderTop: `1px solid ${t.rule}`,
          gap: 32,
        }}>
          <div style={{ fontFamily: MONO, fontSize: 12, color: t.muted, paddingTop: 6, letterSpacing: 0.5 }}>{row.period}</div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 6, color: t.ink }}>{row.role}</div>
            <div style={{ fontSize: 14, color: t.accent, marginBottom: 12, fontFamily: MONO, letterSpacing: 0.3 }}>{row.org}</div>
            <div style={{ fontSize: 15, color: t.muted, lineHeight: 1.6, maxWidth: 760 }}>{row.description}</div>
          </div>
        </div>
      ))}
    </section>
  );
}

window.Work = Work;
window.Experience = Experience;
