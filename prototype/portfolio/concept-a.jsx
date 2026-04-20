// Concept A — Editorial Researcher (your palette)
// Cream background, navy ink, teal italic accents
function ConceptA() {
  const bg = '#ebdccc';        // your cream
  const ink = '#0f0a0f';        // your near-black
  const muted = '#564941';      // your warm dark
  const accent = '#04b08e';     // your teal
  const accent2 = '#3a7fc4';    // deepened version of your blue
  const rule = 'rgba(15,10,15,0.15)';
  return (
    <div style={{
      width: '100%', height: '100%', background: bg, color: ink,
      fontFamily: 'Ubuntu, "Inter", sans-serif', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '24px 56px', borderBottom: `1px solid ${rule}`,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: muted,
        letterSpacing: 0.5, textTransform: 'uppercase',
      }}>
        <span style={{ color: ink, fontWeight: 600 }}>SmartWatt —</span>
        <div style={{ display: 'flex', gap: 32 }}>
          <span>Index</span><span>Work</span><span>Research</span><span>Contact</span>
        </div>
        <span style={{ color: accent }}>● available</span>
      </div>

      <div style={{ padding: '72px 56px 56px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: 48 }}>
        <div>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: accent2,
            letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 32,
          }}>
            01 — Smart Wattanapornmongkol · Bangkok, TH
          </div>
          <h1 style={{
            fontFamily: 'Ubuntu, sans-serif', fontWeight: 300,
            fontSize: 88, lineHeight: 1.0, letterSpacing: -2.5,
            margin: '0 0 28px', maxWidth: 880,
          }}>
            Building <span style={{ color: accent, fontStyle: 'italic', fontWeight: 400 }}>thoughtful</span><br/>
            systems at the<br/>
            <span style={{ fontWeight: 500 }}>research</span> &amp; <span style={{ fontWeight: 500 }}>product</span> seam.
          </h1>
          <p style={{
            fontSize: 18, lineHeight: 1.55, color: muted, maxWidth: 540, margin: 0,
          }}>
            Engineering student at Chulalongkorn University. AI researcher at OpenThaiGPT
            Lab, backend lead at CU NEX. Interested in data-centric ML, infrastructure,
            and the boring work that makes systems actually ship.
          </p>
        </div>

        <div style={{ borderLeft: `1px solid ${rule}`, paddingLeft: 24 }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>Currently</div>
          <div style={{ fontSize: 14, lineHeight: 1.5, marginBottom: 24 }}>
            Drafting an Interspeech 2026 paper. Leading the CU NEX backend team alongside KBTG.
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>Open to</div>
          <div style={{ fontSize: 14, lineHeight: 1.5 }}>
            ML / backend internships · Summer 2027. Research collaborations year-round.
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '120px 1fr 1fr 120px',
        padding: '24px 56px 16px', borderTop: `1px solid ${rule}`,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: muted,
        letterSpacing: 1, textTransform: 'uppercase',
      }}>
        <span>№</span><span>Title</span><span>Venue / Role</span><span style={{ textAlign: 'right' }}>Year</span>
      </div>

      {[
        ['001', 'Audio-Conditioned Gain — synthetic data selection', 'Interspeech 2026 · in submission', '2026'],
        ['002', 'Direct matching of music & image for context analysis', 'IEEE ICCI 2024 · published', '2024'],
        ['003', 'CU NEX election & attendance platform', 'KBTG · backend lead', '2025'],
        ['004', 'Whisper fine-tuning · low-resource Thai ASR', 'OpenThaiGPT Lab · research intern', '2025'],
      ].map((row, i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '120px 1fr 1fr 120px',
          padding: '22px 56px', borderTop: `1px solid ${rule}`,
          fontSize: 16, alignItems: 'baseline',
        }}>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: muted }}>{row[0]}</span>
          <span style={{ fontWeight: 500 }}>{row[1]}</span>
          <span style={{ color: muted, fontSize: 14 }}>{row[2]}</span>
          <span style={{ textAlign: 'right', fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: muted }}>{row[3]}</span>
        </div>
      ))}

      <div style={{
        position: 'absolute', bottom: 24, left: 56, right: 56,
        display: 'flex', justifyContent: 'space-between',
        fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: muted,
        letterSpacing: 1, textTransform: 'uppercase',
      }}>
        <span>Last updated · 18.04.2026</span>
        <span>Set in Ubuntu &amp; JetBrains Mono</span>
      </div>
    </div>
  );
}
window.ConceptA = ConceptA;
