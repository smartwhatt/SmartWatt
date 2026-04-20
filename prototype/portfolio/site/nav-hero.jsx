// Top nav with theme toggle
function Nav({ mode, setMode }) {
  const t = useT();
  const c = useC();
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const meta = c.meta || {};
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? `${t.bg}f0` : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? `1px solid ${t.rule}` : '1px solid transparent',
      transition: 'background 0.3s, border-color 0.3s',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center',
        padding: '18px 48px', fontFamily: MONO, fontSize: 12,
        letterSpacing: 0.5, textTransform: 'uppercase', color: t.muted,
      }}>
        <a href="#top" style={{ color: t.ink, fontWeight: 600, textDecoration: 'none' }}>{meta.shortName || 'Portfolio'} —</a>
        <div style={{ display: 'flex', gap: 28 }}>
          {['Index', 'Work', 'Research', 'Education', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              color: t.muted, textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = t.ink}
            onMouseLeave={e => e.currentTarget.style.color = t.muted}>{l}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'flex-end' }}>
          {meta.available && <span style={{ color: t.accent }}>● available</span>}
          <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} style={{
            background: 'transparent', border: `1px solid ${t.rule}`,
            color: t.ink, fontFamily: MONO, fontSize: 11, letterSpacing: 0.5,
            textTransform: 'uppercase', padding: '6px 10px', borderRadius: 2,
            cursor: 'pointer', transition: 'background 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = t.bgAlt; e.currentTarget.style.borderColor = t.muted; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = t.rule; }}
          aria-label="Toggle theme">
            {mode === 'light' ? '◐ Dark' : '◑ Light'}
          </button>
        </div>
      </div>
    </nav>
  );
}

// Parse headline markup:
//   [word]   → accent italic emphasis
//   {word}   → bold emphasis
// Plain text otherwise. Returns an array of React nodes.
function parseHeadline(str, accent) {
  if (!str) return [];
  const parts = str.split(/(\[[^\]]+\]|\{[^}]+\})/g);
  return parts.map((p, i) => {
    if (/^\[.+\]$/.test(p)) {
      return <em key={i} style={{ color: accent, fontWeight: 500, fontStyle: 'normal' }}>{p.slice(1, -1)}</em>;
    }
    if (/^\{.+\}$/.test(p)) {
      return <span key={i} style={{ fontWeight: 500 }}>{p.slice(1, -1)}</span>;
    }
    return <React.Fragment key={i}>{p}</React.Fragment>;
  });
}

// Render multi-line text with \n preserved as <br/>
function Lines({ text }) {
  if (!text) return null;
  const lines = String(text).split('\n');
  return lines.map((ln, i) => (
    <React.Fragment key={i}>{ln}{i < lines.length - 1 && <br/>}</React.Fragment>
  ));
}

function Hero() {
  const t = useT();
  const c = useC();
  const hero = c.hero || {};
  const meta = c.meta || {};
  return (
    <section id="index" style={{
      padding: '160px 48px 80px', maxWidth: 1280, margin: '0 auto', position: 'relative',
    }}>
      <div style={{
        fontFamily: MONO, fontSize: 12, color: t.accent,
        letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 36,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ width: 32, height: 1, background: t.accent }} />
        {hero.indexNumber || '01'} — {meta.name || ''}{meta.location ? ` · ${meta.location}` : ''}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 56, alignItems: 'start' }}>
        <div>
          <h1 style={{
            fontFamily: SANS, fontWeight: 300,
            fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 1.0, letterSpacing: -2.5,
            margin: '0 0 32px',
          }}>
            {parseHeadline(hero.headlineLine1, t.accent)}<br/>
            {parseHeadline(hero.headlineLine2, t.accent)}<br/>
            {parseHeadline(hero.headlineLine3, t.accent)}
          </h1>
          <p style={{
            fontSize: 19, lineHeight: 1.55, color: t.muted, maxWidth: 580, margin: '0 0 40px',
          }}>
            {hero.intro}
          </p>
          <div style={{ display: 'flex', gap: 14 }}>
            <a href="#work" style={{
              fontFamily: MONO, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase',
              padding: '12px 18px', background: t.ink, color: t.bg,
              textDecoration: 'none', borderRadius: 2,
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              View work →
            </a>
            <a href="#contact" style={{
              fontFamily: MONO, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase',
              padding: '12px 18px', background: 'transparent', color: t.ink,
              textDecoration: 'none', borderRadius: 2, border: `1px solid ${t.rule}`,
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = t.ink}
            onMouseLeave={e => e.currentTarget.style.borderColor = t.rule}>
              Get in touch
            </a>
          </div>
        </div>

        <div>
          <div style={{ borderLeft: `1px solid ${t.rule}`, paddingLeft: 24 }}>
            {hero.currently && <>
              <div style={{ fontFamily: MONO, fontSize: 10, color: t.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>Currently</div>
              <div style={{ fontSize: 14, lineHeight: 1.55, marginBottom: 24, color: t.ink }}>
                <Lines text={hero.currently} />
              </div>
            </>}
            {hero.openTo && <>
              <div style={{ fontFamily: MONO, fontSize: 10, color: t.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>Open to</div>
              <div style={{ fontSize: 14, lineHeight: 1.55, marginBottom: 24, color: t.ink }}>
                <Lines text={hero.openTo} />
              </div>
            </>}
            {hero.stack && <>
              <div style={{ fontFamily: MONO, fontSize: 10, color: t.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>Stack</div>
              <div style={{ fontFamily: MONO, fontSize: 12, lineHeight: 1.7, color: t.muted }}>
                <Lines text={hero.stack} />
              </div>
            </>}
          </div>
        </div>
      </div>
    </section>
  );
}

window.Nav = Nav;
window.Hero = Hero;
