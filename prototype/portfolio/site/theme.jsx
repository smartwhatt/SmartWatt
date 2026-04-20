// Theme tokens for "Ubuntu Blueprint"
const THEME = {
  light: {
    bg: '#f4f1ec', bgAlt: '#ebe6dc', ink: '#0f1417', muted: '#5e6873',
    rule: 'rgba(15,20,23,0.13)', ruleSoft: 'rgba(15,20,23,0.07)',
    accent: '#2a6ed6', accentDim: 'rgba(42,110,214,0.12)',
    accent2: '#8a7a6a', card: '#fbf9f4',
  },
  dark: {
    bg: '#0d1115', bgAlt: '#13181d', ink: '#f4f1ec', muted: '#7a8390',
    rule: 'rgba(244,241,236,0.1)', ruleSoft: 'rgba(244,241,236,0.05)',
    accent: '#6ba1ee', accentDim: 'rgba(107,161,238,0.15)',
    accent2: '#a89685', card: '#161b22',
  },
};

const SANS = 'Ubuntu, -apple-system, BlinkMacSystemFont, sans-serif';
const MONO = '"Ubuntu Mono", ui-monospace, SFMono-Regular, monospace';

// IntersectionObserver-based reveal hook with safety fallback —
// in some embedded iframes IO never fires; we force-show after 1.2s.
function useReveal(threshold = 0.05) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    let done = false;
    const reveal = () => { if (!done) { done = true; setShown(true); } };
    let obs;
    if (ref.current) {
      try {
        obs = new IntersectionObserver(([e]) => {
          if (e.isIntersecting) { reveal(); obs.disconnect(); }
        }, { threshold, rootMargin: '0px 0px -10% 0px' });
        obs.observe(ref.current);
        const r = ref.current.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        if (r.top < vh && r.bottom > 0) reveal();
      } catch { reveal(); }
    }
    // Safety net runs regardless — never leave content invisible.
    const t = setTimeout(reveal, 600);
    return () => { obs && obs.disconnect(); clearTimeout(t); };
  }, [threshold]);
  return [ref, shown];
}

// Reveal wrapper — fade + small upward translate (disabled in embed; render flat)
function Reveal({ children, delay = 0, as: As = 'div', style = {}, ...rest }) {
  return <As style={style} {...rest}>{children}</As>;
}

// Theme context
const ThemeContext = React.createContext(THEME.light);
function useT() { return React.useContext(ThemeContext); }

// Content context — site content is injected here, read by every section
const ContentContext = React.createContext({});
function useC() { return React.useContext(ContentContext); }

Object.assign(window, { THEME, SANS, MONO, useReveal, Reveal, ThemeContext, useT, ContentContext, useC });
