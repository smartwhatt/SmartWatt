// Admin theme + shared tokens — a muted, editor-y take on the site palette.
// Admin stays in light mode by default but supports dark like the site.

const ADMIN_THEME = {
  light: {
    bg: '#f5f2ed', bgAlt: '#ece7dc', card: '#ffffff',
    ink: '#14181c', muted: '#5e6873', mutedSoft: '#8a929c',
    rule: 'rgba(15,20,23,0.12)', ruleSoft: 'rgba(15,20,23,0.06)',
    accent: '#2a6ed6', accentDim: 'rgba(42,110,214,0.1)',
    success: '#2e8f5c', warn: '#c47b2a',
  },
  dark: {
    bg: '#0f1317', bgAlt: '#161b20', card: '#191f26',
    ink: '#f1ede6', muted: '#8892a0', mutedSoft: '#606a78',
    rule: 'rgba(244,241,236,0.1)', ruleSoft: 'rgba(244,241,236,0.05)',
    accent: '#6ba1ee', accentDim: 'rgba(107,161,238,0.12)',
    success: '#5cc28a', warn: '#d49756',
  },
};

const SANS = 'Ubuntu, -apple-system, BlinkMacSystemFont, sans-serif';
const MONO = '"Ubuntu Mono", ui-monospace, SFMono-Regular, monospace';

// Live theme ref — mutated by AdminApp when mode toggles. Primitive components
// call t() to get current values (simpler than passing context through every level).
let _currentTheme = ADMIN_THEME.light;
function t() { return _currentTheme; }
function setTheme(mode) { _currentTheme = ADMIN_THEME[mode] || ADMIN_THEME.light; }

Object.assign(window, { ADMIN_THEME, SANS, MONO, t, setTheme });
