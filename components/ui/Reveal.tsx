'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, Variants } from 'framer-motion'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  once?: boolean
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  duration = 0.45,
  direction = 'up',
  distance = 16,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(ref, { 
    once, 
    margin: '0px 0px -20% 0px',
  })

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

  const variants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: {
          opacity: 0.92,
          ...getInitialPosition(),
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration,
            delay,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
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
}

export function StaggerContainer({ 
  children, 
  className = '',
  staggerDelay = 0.08
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: prefersReducedMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
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
  const [mounted, setMounted] = useState(false)
  const itemVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { 
          opacity: 0.9, 
          y: 12,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}
