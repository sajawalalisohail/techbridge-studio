'use client'

import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, Variants } from 'framer-motion'

const motionPresets = {
  normal: {
    duration: 0.55,
    ease: [0.22, 1, 0.36, 1] as const,
    distance: 18,
    stagger: 0.08,
    viewportAmount: 0.25,
  },
  debug: {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1] as const,
    distance: 24,
    stagger: 0.12,
    viewportAmount: 0.25,
  },
}

const getMotionFlags = () => {
  if (typeof window === 'undefined') {
    return { forceMotion: false, boost: false, debug: false }
  }
  const params = new URLSearchParams(window.location.search)
  return {
    forceMotion: params.get('motion') === '1',
    boost: params.get('motionBoost') === '1',
    debug: process.env.NODE_ENV !== 'production' && params.get('motionDebug') === '1',
  }
}

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  name?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  once?: boolean
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  duration = motionPresets.normal.duration,
  name,
  direction = 'up',
  distance = motionPresets.normal.distance,
  once = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [revealState, setRevealState] = useState<'hidden' | 'show'>('show')
  const prefersReducedMotion = useReducedMotion()
  const { forceMotion, debug, boost } = useMemo(getMotionFlags, [])
  const spec = boost ? motionPresets.debug : motionPresets.normal
  const motionEnabled = forceMotion || !prefersReducedMotion
  const shouldAnimate = mounted && motionEnabled
  const isInView = useInView(ref, { amount: spec.viewportAmount, once })
  const hasShownRef = useRef(false)
  const mountTimeRef = useRef<number | null>(null)

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance }
      case 'down':
        return { y: -distance }
      case 'left':
        return { x: distance }
      case 'right':
        return { x: -distance }
      case 'none':
        return {}
      default:
        return { y: distance }
    }
  }

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition(),
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: duration ?? spec.duration,
        delay,
        ease: spec.ease,
      },
    },
  }

  useEffect(() => {
    setMounted(true)
    if (debug) {
      mountTimeRef.current = typeof performance !== 'undefined' ? performance.now() : Date.now()
      console.log('[Reveal] mounted:', name ?? 'Reveal', mountTimeRef.current)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight || 0
    const threshold = spec.viewportAmount
    const inViewNow = rect.top < vh * (1 - threshold) && rect.bottom > vh * threshold
    setRevealState(inViewNow ? 'show' : 'hidden')
    if (inViewNow) {
      hasShownRef.current = true
    }
  }, [mounted, spec.viewportAmount])

  useEffect(() => {
    if (!mounted) return
    if (isInView) {
      if (!hasShownRef.current && debug) {
        const now = typeof performance !== 'undefined' ? performance.now() : Date.now()
        console.log('[Reveal] first in view:', name ?? 'Reveal', now, mountTimeRef.current ? now - mountTimeRef.current : undefined)
      }
      setRevealState('show')
      hasShownRef.current = true
    } else if (!once && hasShownRef.current) {
      setRevealState('hidden')
    }
  }, [debug, isInView, mounted, name, once])

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={shouldAnimate ? revealState : 'show'}
      variants={variants}
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
  once?: boolean
}

export function StaggerContainer({ 
  children, 
  className = '',
  staggerDelay = motionPresets.normal.stagger,
  once = false
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [revealState, setRevealState] = useState<'hidden' | 'show'>('show')
  const prefersReducedMotion = useReducedMotion()
  const { forceMotion, boost, debug } = useMemo(getMotionFlags, [])
  const spec = boost ? motionPresets.debug : motionPresets.normal
  const motionEnabled = forceMotion || !prefersReducedMotion
  const shouldAnimate = mounted && motionEnabled
  const isInView = useInView(ref, { amount: spec.viewportAmount, once })
  const hasShownRef = useRef(false)
  const mountTimeRef = useRef<number | null>(null)

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay ?? spec.stagger,
      },
    },
  }

  useEffect(() => {
    setMounted(true)
    if (debug) {
      mountTimeRef.current = typeof performance !== 'undefined' ? performance.now() : Date.now()
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight || 0
    const threshold = spec.viewportAmount
    const inViewNow = rect.top < vh * (1 - threshold) && rect.bottom > vh * threshold
    setRevealState(inViewNow ? 'show' : 'hidden')
    if (inViewNow) {
      hasShownRef.current = true
    }
  }, [mounted, spec.viewportAmount])

  useEffect(() => {
    if (!mounted) return
    if (isInView) {
      if (!hasShownRef.current && debug) {
        const now = typeof performance !== 'undefined' ? performance.now() : Date.now()
        console.log('[StaggerContainer] first in view:', now, mountTimeRef.current ? now - mountTimeRef.current : undefined)
      }
      setRevealState('show')
      hasShownRef.current = true
    } else if (!once && hasShownRef.current) {
      setRevealState('hidden')
    }
  }, [isInView, mounted, once])

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={shouldAnimate ? revealState : 'show'}
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
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion()
  const { forceMotion, boost } = useMemo(getMotionFlags, [])
  const spec = boost ? motionPresets.debug : motionPresets.normal
  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: spec.distance,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: spec.duration,
        ease: spec.ease,
      },
    },
  }

  return (
    <motion.div variants={itemVariants} className={className} initial={false}>
      {children}
    </motion.div>
  )
}
