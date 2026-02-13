'use client'
import { useEffect, useRef, useState, ReactNode, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { LenisContext } from '@/hooks/useLenis'
import { useNeuralInteraction } from './NeuralInteractionProvider'

interface LenisProviderProps {
  children: ReactNode
}

/**
 * Premium Lenis Configuration
 * 
 * Goals:
 * - Crisp, responsive feel (not floaty/laggy)
 * - Single RAF loop (no duplicates)
 * - Proper cleanup on unmount
 * - Route-aware scroll reset
 * - Reduced motion / touch device respect
 * - Push velocity to neural background for scroll effects
 */
export default function LenisProvider({ children }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const rafIdRef = useRef<number>(0)
  const pathname = usePathname()

  // Neural interaction - for scroll velocity push
  const { setVelocity } = useNeuralInteraction()

  // Check for reduced motion preference
  const prefersReducedMotion = useCallback(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Check for touch device
  const isTouchDevice = useCallback(() => {
    if (typeof window === 'undefined') return false
    return (
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    )
  }, [])

  // Initialize Lenis once on mount
  useEffect(() => {
    // Skip Lenis entirely for reduced motion users
    if (prefersReducedMotion()) {
      return
    }

    // For touch devices, use native scroll (no Lenis smoothing)
    // This gives the best native feel on mobile
    if (isTouchDevice()) {
      return
    }

    // Already initialized - don't recreate
    if (lenisRef.current) {
      return
    }

    /**
     * Premium Lenis Config Rationale:
     * 
     * lerp: 0.1 (was duration: 1.2)
     *   - lerp gives more direct control than duration
     *   - 0.1 = crisp and responsive, catches up quickly
     *   - Lower = snappier, Higher = floatier
     * 
     * wheelMultiplier: 1.0
     *   - 1:1 mapping with wheel input
     *   - No acceleration/deceleration amplification
     * 
     * smoothWheel: true
     *   - Smooths discrete wheel events (mouse scroll wheel)
     *   - Makes notchy mice feel smooth
     * 
     * syncTouch: false (touch devices disabled above anyway)
     *   - Touch scrolling uses native behavior
     * 
     * infinite: false
     *   - Normal bounded scrolling
     */
    const instance = new Lenis({
      lerp: 0.1,                    // Crisp interpolation (0.05-0.15 range is premium)
      wheelMultiplier: 1.0,         // 1:1 wheel response
      smoothWheel: true,            // Smooth discrete wheel events
      touchMultiplier: 1.0,         // Unused since touch devices skip Lenis
      infinite: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    })

    lenisRef.current = instance
    setLenis(instance)

    // Subscribe to scroll events for velocity reporting
    instance.on('scroll', ({ velocity }: { velocity: number }) => {
      setVelocity(velocity)
    })

    // Single RAF loop
    function raf(time: number) {
      instance.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }

    rafIdRef.current = requestAnimationFrame(raf)

    // Cleanup on unmount
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = 0
      }
      instance.destroy()
      lenisRef.current = null
      setLenis(null)
    }
  }, [prefersReducedMotion, isTouchDevice, setVelocity])

  // Handle route changes - scroll to top
  useEffect(() => {
    if (!lenisRef.current) return

    // Scroll to top immediately on route change
    // Use immediate: true to skip animation (instant reset)
    lenisRef.current.scrollTo(0, { immediate: true })
  }, [pathname])

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  )
}

