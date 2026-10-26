import type { Metadata } from 'next'
import { Instrument_Sans, Source_Serif_4 } from 'next/font/google'

import { getSiteData } from '@/lib/site-data'
import './globals.css'

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-source-serif',
  display: 'swap',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-instrument',
  display: 'swap',
})

const fontVariables = `${sourceSerif.variable} ${instrumentSans.variable}`

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.smartwatt.me'

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getSiteData()
  const title = `${profile.name} — ${profile.role || 'Researcher, engineer & teacher'}`

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description: profile.intro,
    alternates: { canonical: '/' },
    openGraph: {
      type: 'profile',
      url: BASE_URL,
      title,
      description: profile.intro,
      siteName: profile.name,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: profile.intro,
    },
  }
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await getSiteData()

  const sameAs = profile.links.map((link) => link.url).filter(Boolean)

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: BASE_URL,
    image: `${BASE_URL}${profile.portraitUrl || '/img/profile.png'}`,
    jobTitle: profile.role,
    email: profile.email ? `mailto:${profile.email}` : undefined,
    address: profile.location ? { '@type': 'PostalAddress', addressLocality: profile.location } : undefined,
    affiliation: [
      { '@type': 'Organization', name: 'Chulalongkorn University' },
      { '@type': 'Organization', name: 'Artificial Intelligence Association of Thailand' },
      { '@type': 'Organization', name: 'CU NEX' },
    ],
    sameAs,
  }

  return (
    <html lang="en" className={fontVariables}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
