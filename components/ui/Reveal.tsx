'use client'

import { ReactNode, useMemo } from 'react'
import { motion, useReducedMotion, Variants } from 'framer-motion'

// Boosted presets for better visibility ("Premium Feel")
const motionPresets = {
  normal: {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1] as const,
    distance: 40,
    stagger: 0.15,
    viewportAmount: 0.2,
    margin: "-5%" // Slightly better overlap
  },
  debug: {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1] as const,
    distance: 24,
    stagger: 0.12,
    viewportAmount: 0.25,
    margin: "0%"
  },
}

const getMotionFlags = () => {
  if (typeof window === 'undefined') {
    return { forceMotion: false, boost: false }
  }
  const params = new URLSearchParams(window.location.search)
  return {
    forceMotion: params.get('motion') === '1',
    boost: params.get('motionBoost') === '1',
  }
}

export type RevealVariant = 'fadeUp' | 'fadeDown' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'clipReveal'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  name?: string
  variant?: RevealVariant
  /** @deprecated use variant="fadeUp" or variant="slideLeft" etc */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  once?: boolean
  immediate?: boolean
}

const getVariants = (type: RevealVariant, distance: number, duration: number, ease: any): Variants => {
  const transition = { duration, ease }

  switch (type) {
    case 'fadeUp':
      return {
        hidden: { opacity: 0, y: distance },
        show: { opacity: 1, y: 0, transition }
      }
    case 'fadeDown':
      return {
        hidden: { opacity: 0, y: -distance },
        show: { opacity: 1, y: 0, transition }
      }
    case 'slideLeft':
      return {
        hidden: { opacity: 0, x: 80 },
        show: { opacity: 1, x: 0, transition }
      }
    case 'slideRight':
      return {
        hidden: { opacity: 0, x: -80 },
        show: { opacity: 1, x: 0, transition }
      }
    case 'scaleIn':
      return {
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1, transition }
      }
    case 'clipReveal':
      return {
        hidden: { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)', y: 20 },
        show: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', y: 0, transition: { ...transition, duration: duration * 1.2 } }
      }
    case 'fadeIn':
    default:
      return {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition }
      }
  }
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  duration = motionPresets.normal.duration,
  variant,
  direction,
  distance = motionPresets.normal.distance,
  once = false, // Default to false for bidirectional scroll
  immediate = false,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const { forceMotion, boost } = useMemo(getMotionFlags, [])
  const spec = boost ? motionPresets.debug : motionPresets.normal
  const motionEnabled = forceMotion || !prefersReducedMotion

  // Resolve variant from prop or legacy direction
  let effectiveVariant: RevealVariant = variant || 'fadeUp'
  if (!variant && direction) {
    if (direction === 'up') effectiveVariant = 'fadeUp'
    if (direction === 'down') effectiveVariant = 'fadeDown'
    if (direction === 'left') effectiveVariant = 'slideLeft'
    if (direction === 'right') effectiveVariant = 'slideRight'
    if (direction === 'none') effectiveVariant = 'fadeIn'
  }

  const selectedVariants = getVariants(effectiveVariant, distance, duration, spec.ease)

  if (delay > 0 && selectedVariants.show && !Array.isArray(selectedVariants.show)) {
    // @ts-ignore
    selectedVariants.show.transition = { ...selectedVariants.show.transition, delay }
  }

  if (!motionEnabled) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial="hidden"
      animate={immediate ? "show" : undefined}
      whileInView={immediate ? undefined : "show"}
      viewport={immediate ? undefined : {
        amount: spec.viewportAmount,
        once,
        margin: spec.margin
      }}
      variants={selectedVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Stagger container for multiple reveals
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  delay?: number
  once?: boolean
  viewportAmount?: number
  immediate?: boolean
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = motionPresets.normal.stagger,
  delay = 0,
  once = false, // Default to false for bidirectional scroll
  viewportAmount,
  immediate = false
}: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion()
  const { forceMotion, boost } = useMemo(getMotionFlags, [])
  const spec = boost ? motionPresets.debug : motionPresets.normal
  const motionEnabled = forceMotion || !prefersReducedMotion
  const amount = viewportAmount || spec.viewportAmount

  const containerVariants: Variants = {
    hidden: {
      opacity: 0, // Ensure container hides children 
      transition: {
        when: "afterChildren" // Hide after children
      }
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
        when: "beforeChildren" // Show before children start
      },
    },
  }

  if (!motionEnabled) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial="hidden"
      animate={immediate ? "show" : undefined}
      whileInView={immediate ? undefined : "show"}
      viewport={immediate ? undefined : {
        amount: spec.viewportAmount,
        once,
        margin: spec.margin
      }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Stagger item to be used inside StaggerContainer
interface StaggerItemProps {
  children: ReactNode
  className?: string
  variant?: RevealVariant
  distance?: number
  duration?: number
}

export function StaggerItem({
  children,
  className = '',
  variant = 'fadeUp',
  distance = motionPresets.normal.distance,
  duration = motionPresets.normal.duration
}: StaggerItemProps) {
  const { boost } = useMemo(getMotionFlags, [])
  const spec = boost ? motionPresets.debug : motionPresets.normal

  const itemVariants = getVariants(variant, distance, duration, spec.ease)

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}
