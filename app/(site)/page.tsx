import Quiet from '@/components/designs/quiet/Quiet'
import { getSiteData } from '@/lib/site-data'

export const revalidate = 60

export default async function HomePage() {
  const data = await getSiteData()
  return <Quiet data={data} />
}
