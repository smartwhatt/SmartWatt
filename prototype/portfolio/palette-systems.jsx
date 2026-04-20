// Three palette + type systems applied to the Concept A hero.

const SYSTEMS = {
  // 01 — Slate & Ember
  'slate-light': {
    bg: '#f7f6f3', ink: '#1c2024', muted: '#6b6f78', rule: 'rgba(28,32,36,0.12)',
    accent: '#cf5a3b', accent2: '#3a6a8a',
    sans: '"Geist", -apple-system, sans-serif',
    mono: '"Geist Mono", ui-monospace, monospace',
    serif: '"Geist", -apple-system, sans-serif',
    headWeight: 500, headStyle: 'normal', emWeight: 600, emStyle: 'normal',
    typeNote: 'Geist · Geist Mono',
  },
  'slate-dark': {
    bg: '#13161a', ink: '#e8e6e1', muted: '#7a7f88', rule: 'rgba(232,230,225,0.1)',
    accent: '#e07a55', accent2: '#6ea5c7',
    sans: '"Geist", -apple-system, sans-serif',
    mono: '"Geist Mono", ui-monospace, monospace',
    serif: '"Geist", -apple-system, sans-serif',
    headWeight: 500, headStyle: 'normal', emWeight: 600, emStyle: 'normal',
    typeNote: 'Geist · Geist Mono',
  },
  // 02 — Paper & Ink
  'paper-light': {
    bg: '#f4efe6', ink: '#0a0908', muted: '#7a6f60', rule: 'rgba(10,9,8,0.14)',
    accent: '#1d4ed8', accent2: '#7a6f60',
    sans: '"Geist", -apple-system, sans-serif',
    mono: '"Geist Mono", ui-monospace, monospace',
    serif: '"Newsreader", "Georgia", serif',
    headWeight: 400, headStyle: 'normal', emWeight: 400, emStyle: 'italic',
    typeNote: 'Newsreader · Geist · Geist Mono',
  },
  'paper-dark': {
    bg: '#0e0d0b', ink: '#f4efe6', muted: '#8a8074', rule: 'rgba(244,239,230,0.1)',
    accent: '#7da7ff', accent2: '#a89c8a',
    sans: '"Geist", -apple-system, sans-serif',
    mono: '"Geist Mono", ui-monospace, monospace',
    serif: '"Newsreader", "Georgia", serif',
    headWeight: 400, headStyle: 'normal', emWeight: 400, emStyle: 'italic',
    typeNote: 'Newsreader · Geist · Geist Mono',
  },
  // 04 — Ubuntu Blueprint (your Ubuntu + refined blue)
  'ubuntu-light': {
    bg: '#f4f1ec', ink: '#0f1417', muted: '#5e6873', rule: 'rgba(15,20,23,0.13)',
    accent: '#2a6ed6', accent2: '#8a7a6a',
    sans: 'Ubuntu, -apple-system, sans-serif',
    mono: '"Ubuntu Mono", ui-monospace, monospace',
    serif: 'Ubuntu, -apple-system, sans-serif',
    headWeight: 300, headStyle: 'normal', emWeight: 500, emStyle: 'normal',
    typeNote: 'Ubuntu · Ubuntu Mono',
  },
  'ubuntu-dark': {
    bg: '#0d1115', ink: '#f4f1ec', muted: '#7a8390', rule: 'rgba(244,241,236,0.1)',
    accent: '#6ba1ee', accent2: '#a89685',
    sans: 'Ubuntu, -apple-system, sans-serif',
    mono: '"Ubuntu Mono", ui-monospace, monospace',
    serif: 'Ubuntu, -apple-system, sans-serif',
    headWeight: 300, headStyle: 'normal', emWeight: 500, emStyle: 'normal',
    typeNote: 'Ubuntu · Ubuntu Mono',
  },
  // 03 — Slab & Olive
  'olive-light': {
    bg: '#f1ede4', ink: '#15140f', muted: '#7d7466', rule: 'rgba(21,20,15,0.13)',
    accent: '#5d6e3f', accent2: '#a8907a',
    sans: '"IBM Plex Sans", -apple-system, sans-serif',
    mono: '"IBM Plex Mono", ui-monospace, monospace',
    serif: '"IBM Plex Serif", "Georgia", serif',
    headWeight: 400, headStyle: 'normal', emWeight: 400, emStyle: 'italic',
    typeNote: 'IBM Plex Sans · Serif · Mono',
  },
  'olive-dark': {
    bg: '#15140f', ink: '#f1ede4', muted: '#8a8170', rule: 'rgba(241,237,228,0.1)',
    accent: '#9bb077', accent2: '#c2ad97',
    sans: '"IBM Plex Sans", -apple-system, sans-serif',
    mono: '"IBM Plex Mono", ui-monospace, monospace',
    serif: '"IBM Plex Serif", "Georgia", serif',
    headWeight: 400, headStyle: 'normal', emWeight: 400, emStyle: 'italic',
    typeNote: 'IBM Plex Sans · Serif · Mono',
  },
};

function SystemHeader({ name, desc, swatches }) {
  return (
    <div style={{ marginBottom: 24, maxWidth: 1100 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8 }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: '#15140f' }}>{name}</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {swatches.map((c, i) => (
            <div key={i} style={{
              width: 22, height: 22, background: c, borderRadius: 2,
              border: '1px solid rgba(0,0,0,0.08)',
            }} title={c} />
          ))}
        </div>
      </div>
      <div style={{ fontSize: 13, color: '#6b6259', maxWidth: 760, lineHeight: 1.5 }}>{desc}</div>
    </div>
  );
}

function Hero({ system }) {
  const s = SYSTEMS[system];
  return (
    <div style={{
      width: '100%', height: '100%', background: s.bg, color: s.ink,
      fontFamily: s.sans, position: 'relative', overflow: 'hidden',
    }}>
      {/* nav */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 44px', borderBottom: `1px solid ${s.rule}`,
        fontFamily: s.mono, fontSize: 11, color: s.muted,
        letterSpacing: 0.5, textTransform: 'uppercase',
      }}>
        <span style={{ color: s.ink, fontWeight: 600 }}>SmartWatt —</span>
        <div style={{ display: 'flex', gap: 28 }}>
          <span>Index</span><span>Work</span><span>Research</span><span>Contact</span>
        </div>
        <span style={{ color: s.accent }}>● available</span>
      </div>

      {/* hero */}
      <div style={{ padding: '56px 44px 40px', display: 'grid', gridTemplateColumns: '1fr 240px', gap: 40 }}>
        <div>
          <div style={{
            fontFamily: s.mono, fontSize: 11, color: s.accent2,
            letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 28,
          }}>
            01 — Smart Wattanapornmongkol · Bangkok, TH
          </div>
          <h1 style={{
            fontFamily: s.serif, fontWeight: s.headWeight,
            fontSize: 70, lineHeight: 1.02, letterSpacing: -2,
            margin: '0 0 24px',
          }}>
            Building <span style={{
              color: s.accent, fontWeight: s.emWeight, fontStyle: s.emStyle,
            }}>thoughtful</span><br/>
            systems at the<br/>
            research &amp; product seam.
          </h1>
          <p style={{
            fontSize: 16, lineHeight: 1.55, color: s.muted, maxWidth: 480, margin: 0,
          }}>
            Engineering student at Chulalongkorn University. AI researcher at OpenThaiGPT
            Lab, backend lead at CU NEX. Interested in data-centric ML, infrastructure,
            and the boring work that makes systems actually ship.
          </p>
        </div>

        <div style={{ borderLeft: `1px solid ${s.rule}`, paddingLeft: 20 }}>
          <div style={{ fontFamily: s.mono, fontSize: 10, color: s.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Currently</div>
          <div style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 22 }}>
            Drafting an Interspeech 2026 paper. Leading CU NEX backend with KBTG.
          </div>
          <div style={{ fontFamily: s.mono, fontSize: 10, color: s.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Open to</div>
          <div style={{ fontSize: 13, lineHeight: 1.5 }}>
            ML / backend internships · Summer 2027.
          </div>
        </div>
      </div>

      {/* table preview */}
      <div style={{
        display: 'grid', gridTemplateColumns: '90px 1fr 1fr 90px',
        padding: '18px 44px 12px', borderTop: `1px solid ${s.rule}`,
        fontFamily: s.mono, fontSize: 10, color: s.muted,
        letterSpacing: 1, textTransform: 'uppercase',
      }}>
        <span>№</span><span>Title</span><span>Venue / Role</span><span style={{ textAlign: 'right' }}>Year</span>
      </div>
      {[
        ['001', 'Audio-Conditioned Gain — synthetic data selection', 'Interspeech 2026', '2026'],
        ['002', 'Direct matching of music & image', 'IEEE ICCI 2024', '2024'],
        ['003', 'CU NEX election & attendance platform', 'KBTG · backend lead', '2025'],
      ].map((row, i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '90px 1fr 1fr 90px',
          padding: '16px 44px', borderTop: `1px solid ${s.rule}`,
          fontSize: 14, alignItems: 'baseline',
        }}>
          <span style={{ fontFamily: s.mono, fontSize: 11, color: s.muted }}>{row[0]}</span>
          <span style={{ fontWeight: 500 }}>{row[1]}</span>
          <span style={{ color: s.muted, fontSize: 13 }}>{row[2]}</span>
          <span style={{ textAlign: 'right', fontFamily: s.mono, fontSize: 11, color: s.muted }}>{row[3]}</span>
        </div>
      ))}

      {/* footer */}
      <div style={{
        position: 'absolute', bottom: 16, left: 44, right: 44,
        display: 'flex', justifyContent: 'space-between',
        fontFamily: s.mono, fontSize: 10, color: s.muted,
        letterSpacing: 1, textTransform: 'uppercase',
      }}>
        <span>{system.includes('dark') ? 'Dark' : 'Light'} · {s.typeNote}</span>
        <span>Last updated · 18.04.2026</span>
      </div>
    </div>
  );
}

Object.assign(window, { Hero, SystemHeader });
