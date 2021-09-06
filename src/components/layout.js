// Component imports
import dynamic from 'next/dynamic'
const Navbar = dynamic(() => import('./navbar'))
const Footer = dynamic(() => import('./footer'))
import { motion } from "framer-motion"
import { AnimatePresence } from 'framer-motion'

// React import
import { useRouter } from 'next/router'
// import { useState, useEffect } from 'react';


export default function Layout({ children }) {
  const router = useRouter();

  const variants = {
    hidden: { opacity: 0,},
    enter: { opacity: 1},
    exit: { opacity: 0},
}

  return (
    <>
      <Navbar page={router.asPath} />
        <motion.main
          variants={variants} // Pass the variant object into Framer Motion 
          initial="hidden" // Set the initial state to variants.hidden
          animate="enter" // Animated state to variants.enter
          exit="exit" // Exit state (used later) to variants.exit
          transition={{ duration: 1, ease: "easeInOut" }} // Set the transition to linear
          key={router.route}
        >
          {children}
        </motion.main>
      <Footer />
    </>
  )
}