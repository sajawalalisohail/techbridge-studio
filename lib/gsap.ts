'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

// Default easing curves for consistent motion
export const easings = {
  smooth: 'power3.out',
  smoothInOut: 'power3.inOut',
  bounce: 'back.out(1.7)',
  expo: 'expo.out',
  // Matches Framer Motion's default
  framer: [0.16, 1, 0.3, 1],
}

// Default durations
export const durations = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.8,
  intro: 1,
}

// Utility to check reduced motion preference
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Utility to check if mobile
export const isMobile = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 1024
}

// Kill all ScrollTriggers (useful for cleanup)
export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
}

// Refresh ScrollTrigger (useful after dynamic content loads)
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh()
}

export { gsap, ScrollTrigger, useGSAP }
