'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import type { SiteContent } from '@/lib/types'

// ── Theme context ─────────────────────────────────────────────
type ThemeMode = 'light' | 'dark'
const ThemeContext = createContext<ThemeMode>('light')
export function useTheme() { return useContext(ThemeContext) }

// ── Content context ───────────────────────────────────────────
const ContentContext = createContext<SiteContent | null>(null)
export function useContent() { return useContext(ContentContext)! }

// ── ThemeProvider ─────────────────────────────────────────────
// Wraps the whole page. Sets data-theme on <html> so CSS vars apply.
export function ThemeProvider({
  children,
  initial,
}: {
  children: React.ReactNode
  initial: SiteContent
}) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'light'
    return (localStorage.getItem('sw-theme') as ThemeMode) || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode)
    try { localStorage.setItem('sw-theme', mode) } catch {}
  }, [mode])

  // Apply immediately on mount (avoids flash on hydration)
  useEffect(() => {
    const saved = localStorage.getItem('sw-theme') as ThemeMode | null
    if (saved && saved !== mode) setMode(saved)
    document.documentElement.setAttribute('data-theme', mode)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ThemeContext.Provider value={mode}>
      <ContentContext.Provider value={initial}>
        <ModeToggleContext.Provider value={setMode}>
          {children}
        </ModeToggleContext.Provider>
      </ContentContext.Provider>
    </ThemeContext.Provider>
  )
}

// ── Mode toggle context ───────────────────────────────────────
const ModeToggleContext = createContext<(m: ThemeMode) => void>(() => {})
export function useModeToggle() { return useContext(ModeToggleContext) }
