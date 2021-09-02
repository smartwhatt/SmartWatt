// Component imports
import dynamic from 'next/dynamic'
const Navbar = dynamic(() => import('./navbar'))
const Footer = dynamic(() => import('./footer'))

// React import
import { useRouter } from 'next/router'

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      <Navbar page={router.asPath} />
      <main>{children}</main>
      <Footer />
    </>
  )
}