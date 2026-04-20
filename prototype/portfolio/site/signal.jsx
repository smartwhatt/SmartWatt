// Signal band — animated sample stream
function SignalBand() {
  const t = useT();
  const c = useC();
  const N = 96;
  const [seed, setSeed] = React.useState(1);
  const [hovering, setHovering] = React.useState(false);

  function seedBars(n, sd) {
    let s = sd * 9301 + 49297;
    const r = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    return Array.from({ length: n }, (_, i) => {
      const tt = i / n;
      const env = 0.35 + 0.4 * Math.sin(tt * Math.PI * 1.6) + 0.2 * Math.sin(tt * Math.PI * 5 + sd);
      return Math.max(0.12, Math.min(1, env + (r() - 0.5) * 0.3));
    });
  }

  const [bars, setBars] = React.useState(() => seedBars(N, 1));

  React.useEffect(() => {
    const id = setInterval(() => {
      setSeed(s => {
        const ns = s + 1;
        setBars(seedBars(N, ns));
        return ns;
      });
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const caption = (c.signal && c.signal.caption) || 'three things shipping right now ↓';

  return (
    <section style={{
      padding: '40px 48px 80px', maxWidth: 1280, margin: '0 auto',
    }}
    onMouseEnter={() => setHovering(true)}
    onMouseLeave={() => setHovering(false)}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontFamily: MONO, fontSize: 11, color: t.muted,
        letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14,
      }}>
        <span>signal · live · {N} samples</span>
        <span style={{ color: t.accent }}>● tracking — frame {seed.toString().padStart(4, '0')}</span>
      </div>
      <div style={{
        display: 'flex', alignItems: 'flex-end', gap: 3, height: 120,
        padding: '8px 0', borderTop: `1px solid ${t.rule}`, borderBottom: `1px solid ${t.rule}`,
      }}>
        {bars.map((h, i) => {
          const isAccent = i % 11 === 0;
          return (
            <div key={i} style={{
              flex: 1, height: `${h * 100}%`,
              background: isAccent ? t.accent : t.accent2,
              opacity: isAccent ? 1 : (hovering ? 0.8 : 0.55),
              borderRadius: 1,
              transition: `height 0.6s cubic-bezier(.2,.6,.2,1) ${i * 4}ms, opacity 0.3s`,
            }} />
          );
        })}
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', marginTop: 12,
        fontFamily: MONO, fontSize: 10, color: t.muted,
        letterSpacing: 1, textTransform: 'uppercase',
      }}>
        <span>t = 0</span>
        <span>{caption}</span>
        <span>t = now</span>
      </div>
    </section>
  );
}
window.SignalBand = SignalBand;
