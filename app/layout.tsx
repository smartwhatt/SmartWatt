import type { Metadata } from 'next'
import { Ubuntu, Ubuntu_Mono } from 'next/font/google'
import './globals.css'

const ubuntu = Ubuntu({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-ubuntu',
  display: 'swap',
})

const ubuntuMono = Ubuntu_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-ubuntu-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Smart Wattanapornmongkol — Engineer & AI Researcher',
  description:
    'Engineering student at Chulalongkorn University. AI researcher at OpenThaiGPT Lab. Interested in data-centric ML, infrastructure, and the boring work that makes systems ship.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-theme is toggled client-side by ThemeProvider
    <html lang="en" data-theme="light" className={`${ubuntu.variable} ${ubuntuMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
