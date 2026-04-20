// Concept B — Quiet Engineering (your dark palette)
// Near-black bg, cream ink, teal & navy accents
function ConceptB() {
  const bg = '#0f0a0f';
  const ink = '#ebdccc';        // cream from your palette
  const muted = '#7a6f63';
  const card = '#1a1418';
  const accent = '#04b08e';     // teal
  const accent2 = '#75b1f6';    // navy/blue
  const rule = 'rgba(235,220,204,0.1)';
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
          <span>about</span><span>experience</span><span>research</span><span>contact</span>
        </div>
        <span style={{ color: muted }}><span style={{ color: accent }}>●</span> available</span>
      </div>

      <div style={{ padding: '64px 48px 48px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'start' }}>
        <div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: accent, marginBottom: 24, letterSpacing: 0.5 }}>
            $ whoami
          </div>
          <h1 style={{
            fontFamily: 'Ubuntu, sans-serif', fontWeight: 700, fontSize: 64,
            lineHeight: 1.05, letterSpacing: -2, margin: '0 0 24px',
          }}>
            Smart<br/>Wattanapornmongkol<span style={{ color: accent }}>.</span>
          </h1>
          <div style={{ fontSize: 18, color: muted, lineHeight: 1.5, marginBottom: 32, maxWidth: 540 }}>
            AI researcher and backend engineer. Working at the seam of applied ML and
            production systems used by tens of thousands of students.
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['Python', 'TypeScript', 'Rust', 'PyTorch', 'PostgreSQL', 'Docker', 'AWS', 'GCP'].map(t => (
              <span key={t} style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
                padding: '6px 12px', border: `1px solid ${rule}`, borderRadius: 2,
                color: muted,
              }}>{t}</span>
            ))}
          </div>
        </div>

        <div style={{
          background: card, border: `1px solid ${rule}`, padding: 28, borderRadius: 4,
          fontSize: 14, lineHeight: 1.6,
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            paddingBottom: 14, marginBottom: 18, borderBottom: `1px solid ${rule}`,
            fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: muted,
            letterSpacing: 1, textTransform: 'uppercase',
          }}>
            <span>now.txt</span>
            <span style={{ color: accent }}>● live</span>
          </div>
          <div style={{ marginBottom: 14, color: muted }}><span style={{ color: accent2 }}>research</span> &nbsp;&nbsp;Paper in submission to Interspeech 2026.</div>
          <div style={{ marginBottom: 14, color: muted }}><span style={{ color: accent2 }}>building</span> &nbsp;&nbsp;CU NEX backend with Kasikorn BTG.</div>
          <div style={{ marginBottom: 14, color: muted }}><span style={{ color: accent2 }}>reading &nbsp;</span> &nbsp;&nbsp;data-centric AI &amp; foundation models.</div>
          <div style={{ color: muted }}><span style={{ color: accent2 }}>location</span> &nbsp;&nbsp;Bangkok, Thailand · UTC+7.</div>
        </div>
      </div>

      <div style={{ padding: '48px 48px 0', borderTop: `1px solid ${rule}` }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginBottom: 28,
        }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: accent, letterSpacing: 1.5, textTransform: 'uppercase' }}>
            // experience
          </div>
          <div style={{ fontSize: 12, color: muted }}>04 entries</div>
        </div>

        {[
          ['2025 — Now', 'Head of IT & Backend Lead', 'CU NEX Club · w/ Kasikorn BTG', 'Architecting election & attendance platform · CI/CD · code review culture'],
          ['2025 — 2026', 'AI Researcher Intern', 'OpenThaiGPT · iApp · Super AI SS5', 'Speech & multimodal · proposed ACG metric for sample selection'],
          ['2024 — Now', 'B.Eng, Information & Comm. Engineering', 'Chulalongkorn University · ISE · CGPA 3.90/4.00', 'Expected Oct 2028'],
          ['2024', 'Co-author · IEEE ICCI 2024', 'Direct matching of music & image for context', 'doi:10.1109/ICCI60780.2024.10532575'],
        ].map((row, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '160px 1fr',
            padding: '24px 0', borderTop: i ? `1px solid ${rule}` : 'none',
            gap: 24,
          }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: muted, paddingTop: 4 }}>{row[0]}</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>{row[1]}</div>
              <div style={{ fontSize: 14, color: muted, marginBottom: 8 }}>{row[2]}</div>
              <div style={{ fontSize: 13, color: muted, lineHeight: 1.5 }}>{row[3]}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
window.ConceptB = ConceptB;
