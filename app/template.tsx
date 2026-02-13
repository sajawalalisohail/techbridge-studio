'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'

/**
 * Template with optimized page transitions
 * 
 * Key optimizations:
 * - Initial state is VISIBLE (opacity: 1) to prevent blank page flash
 * - Animation only triggers on route changes, not initial load
 * - Reduced motion users get no animation
 * - Home page skips animation (intro handles it)
 */
const pageVariants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()

  // Skip all animations for reduced motion users
  if (prefersReducedMotion) {
    return <>{children}</>
  }

  // For initial page load, use initial={false} to prevent opacity:0 flash
  // The page will start visible and only animate on subsequent route changes
  return (
    <motion.div
      key={pathname}
      initial={false}  // Start visible - prevents blank flash on initial load
      animate="enter"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  )
}
