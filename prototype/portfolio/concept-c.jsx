// Concept C — Signal (B + C remix, generalized away from audio)
// Warm dark, terminal density, signature "data signal" band that reads as a
// generic graph/spectrum (not specifically audio). Teal as data color.
function ConceptC() {
  const bg = '#0f0a0f';
  const ink = '#ebdccc';
  const muted = '#7a6f63';
  const card = '#1a1418';
  const accent = '#04b08e';     // teal — primary data
  const accent2 = '#75b1f6';    // blue — secondary data
  const rule = 'rgba(235,220,204,0.1)';

  // deterministic pseudo-random "signal" — reads as data viz, not audio
  const bars = React.useMemo(() => {
    let s = 11;
    const r = () => (s = (s * 9301 + 49297) % 233280, s / 233280);
    return Array.from({ length: 72 }, (_, i) => {
      // smoother, more "graph-like" envelope
      const t = i / 72;
      const env = 0.4 + 0.4 * Math.sin(t * Math.PI * 1.6) + 0.2 * Math.sin(t * Math.PI * 5);
      return Math.max(0.12, Math.min(1, env + (r() - 0.5) * 0.25));
    });
  }, []);

  return (
    <div style={{
      width: '100%', height: '100%', background: bg, color: ink,
      fontFamily: 'Ubuntu, "Inter", sans-serif', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 48px', fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
      }}>
        <span style={{ color: accent }}>~/smartwatt</span>
        <div style={{ display: 'flex', gap: 24, color: muted }}>
          <span>about</span><span>work</span><span>research</span><span>contact</span>
        </div>
        <span style={{ color: muted }}><span style={{ color: accent }}>●</span> available</span>
      </div>

      <div style={{ padding: '56px 48px 32px' }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: accent2,
          letterSpacing: 2, textTransform: 'uppercase', marginBottom: 28,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ width: 32, height: 1, background: accent2 }} />
          Engineer · Researcher · CU ICE &apos;28
        </div>
        <h1 style={{
          fontFamily: 'Ubuntu, sans-serif', fontWeight: 700, fontSize: 84,
          lineHeight: 0.98, letterSpacing: -3, margin: '0 0 28px',
        }}>
          Building the<br/>
          <span style={{ color: accent }}>signal</span><span style={{ color: muted }}>-to-</span><span style={{ color: accent2 }}>system</span><br/>
          loop<span style={{ color: accent }}>.</span>
        </h1>
        <p style={{
          fontSize: 18, lineHeight: 1.55, color: muted, maxWidth: 640, margin: '0 0 8px',
        }}>
          Smart Wattanapornmongkol — engineering student at Chula, AI researcher at
          OpenThaiGPT Lab, backend lead at CU NEX. I work at the seam of applied ML
          and the production systems that put it in front of real users.
        </p>
      </div>

      {/* signal band — generic data viz, not audio-specific */}
      <div style={{ padding: '20px 48px 28px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: muted,
          letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12,
        }}>
          <span>signal · live · 72 samples</span>
          <span style={{ color: accent }}>● tracking</span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'flex-end', gap: 3, height: 88,
          padding: '8px 0', borderTop: `1px solid ${rule}`, borderBottom: `1px solid ${rule}`,
        }}>
          {bars.map((h, i) => {
            const isAccent = i % 9 === 0;
            return (
              <div key={i} style={{
                flex: 1, height: `${h * 100}%`,
                background: isAccent ? accent2 : accent,
                opacity: isAccent ? 1 : 0.65,
                borderRadius: 1,
              }} />
            );
          })}
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', marginTop: 12,
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: muted,
          letterSpacing: 1, textTransform: 'uppercase',
        }}>
          <span>t = 0</span>
          <span>three things shipping right now ↓</span>
          <span>t = now</span>
        </div>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1,
        background: rule, borderTop: `1px solid ${rule}`,
      }}>
        {[
          ['Research', 'Data-centric methods for low-resource ML. Manuscript in submission to Interspeech 2026.', 'Read paper →'],
          ['Engineering', 'Backend lead at CU NEX, building election & attendance systems with Kasikorn BTG.', 'See systems →'],
          ['Publication', 'IEEE ICCI 2024 — direct matching of music and image for contextual analysis.', 'View on IEEE →'],
        ].map(([k, v, cta], i) => (
          <div key={i} style={{ background: bg, padding: '28px 24px' }}>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: accent,
              letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14,
            }}>0{i+1} / {k}</div>
            <div style={{ fontSize: 15, lineHeight: 1.55, color: ink, marginBottom: 18 }}>{v}</div>
            <div style={{ fontSize: 13, color: accent2 }}>{cta}</div>
          </div>
        ))}
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between',
        padding: '20px 48px', borderTop: `1px solid ${rule}`,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: muted,
        letterSpacing: 1, textTransform: 'uppercase',
      }}>
        <span>© 2026 · Smart Wattanapornmongkol</span>
        <span>Bangkok · UTC+7</span>
        <span>github · linkedin · email</span>
      </div>
    </div>
  );
}
window.ConceptC = ConceptC;
