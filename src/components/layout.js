// Component imports
import dynamic from 'next/dynamic'
const Navbar = dynamic(() => import('./navbar'))
const Footer = dynamic(() => import('./footer'))
import { motion } from "framer-motion"
import { NextSeo } from 'next-seo';

// React import
import { useRouter } from 'next/router'
// import { useState, useEffect } from 'react';


export default function Layout({ children }) {
  const router = useRouter();
  // console.log(router.route.split("/"))
  const variants = {
    hidden: { opacity: 0,},
    enter: { opacity: 1},
    exit: { opacity: 0},
}

  return (
    <>
      <NextSeo
        title={`SmartWatt`}
        description="Hello, This is portfolio website of Smart Wattanpornmongkol."
        canonical={`https://www.smartwatt.me${router.route}`}
        openGraph={{
          url: `https://www.smartwatt.me${router.route}`,
          title: `SmartWatt`,
          description: 'Hello, This is portfolio website of Smart Wattanpornmongkol.',
          images: [
            { url: '/img/bg-image.png' },
          ],
          site_name: 'SmartWatt',
        }}
        // twitter={{
        //   handle: '@handle',
        //   site: '@site',
        //   cardType: 'summary_large_image',
        // }}
      />
      <Navbar page={router.asPath} />
        <motion.main
          variants={variants} // Pass the variant object into Framer Motion 
          initial="hidden" // Set the initial state to variants.hidden
          animate="enter" // Animated state to variants.enter
          exit="exit" // Exit state (used later) to variants.exit
          transition={{ duration: 0.5, ease: "easeInOut" }} // Set the transition to linear
          key={router.route}
        >
          {children}
        </motion.main>
      <Footer />
    </>
  )
}