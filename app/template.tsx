'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Skip animation for home page on initial load (intro handles it)
  const isHomePage = pathname === '/'

  return (
    <motion.div
      key={pathname}
      initial={isHomePage ? false : 'initial'}
      animate="enter"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  )
}
