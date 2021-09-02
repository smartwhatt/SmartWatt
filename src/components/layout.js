// Component imports
import dynamic from 'next/dynamic'
const Navbar = dynamic(() => import('./navbar'))
const Footer = dynamic(() => import('./footer'))

// React import
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';

export default function Layout({ children }) {
  const router = useRouter();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState("fadeOut");

  useEffect(() => {
    setTransitionStage("fadeIn");
  }, []);

  useEffect(() => {
    if (children !== displayChildren) setTransitionStage("fadeOut");
  }, [children, setDisplayChildren, displayChildren]);

  function fadeHandle(){
    if (transitionStage === "fadeOut") {
      // console.log("fading out");
      setDisplayChildren(children);
      setTransitionStage("fadeIn");
    }
  }

  return (
    <>
      <Navbar page={router.asPath} />
      <main className={transitionStage} onTransitionEnd={() => fadeHandle()}>{displayChildren}</main>
      <Footer />
    </>
  )
}