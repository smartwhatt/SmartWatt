import { fetchContent } from '@/lib/content'
import { SiteContentProvider } from '@/components/site/SiteContentProvider'
import Nav from '@/components/site/Nav'
import Hero from '@/components/site/Hero'
import SignalBand from '@/components/site/SignalBand'
import { Work, Experience } from '@/components/site/WorkExp'
import { Education, Contact, Footer } from '@/components/site/EduContactFooter'

// Revalidate every 60 s so a publish is reflected within a minute.
// You can lower/remove this once you trust the revalidatePath() in actions.ts.
export const revalidate = 60

export default async function HomePage() {
  const content = await fetchContent()

  return (
    <SiteContentProvider initial={content}>
      <div id="top">
        <Nav />
        <main>
          <Hero />
          <SignalBand />
          <Work />
          <Experience />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </SiteContentProvider>
  )
}
