'use client'

import { useState } from 'react'
import Gate from '@/components/admin/Gate'
import AdminApp from '@/components/admin/AdminApp'
import type { SiteContent } from '@/lib/types'

// Admin shell — rendered client-side so the gate/editor can hydrate cleanly.
// The server page (app/admin/page.tsx) passes the initial content + auth state.
export default function AdminShell({
  initial,
  loggedIn,
  userEmail,
}: {
  initial: SiteContent
  loggedIn: boolean
  userEmail: string
}) {
  const [unlocked, setUnlocked] = useState(loggedIn)

  if (!unlocked) {
    return <Gate onUnlock={() => setUnlocked(true)} />
  }

  return <AdminApp initial={initial} userEmail={userEmail} />
}
