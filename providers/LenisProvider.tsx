'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import Lenis from 'lenis'
import { LenisContext } from '@/hooks/useLenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface LenisProviderProps {
  children: ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // Check if mobile
    const isMobile = window.innerWidth < 1024
    
    if (prefersReducedMotion || isMobile) {
      // Still refresh ScrollTrigger for animations
      ScrollTrigger.refresh()
      return
    }

    // Initialize Lenis
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 0, // Disable smooth touch
      infinite: false,
    })

    lenisRef.current = lenisInstance
    setLenis(lenisInstance)

    // Integrate with GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker for Lenis
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Refresh ScrollTrigger after setup
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    // Cleanup
    return () => {
      lenisInstance.destroy()
      lenisRef.current = null
      setLenis(null)
    }
  }, [])

  // Refresh ScrollTrigger on resize
  useEffect(() => {
    let resizeTimer: NodeJS.Timeout

    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 200)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    
    // Refresh after fonts load
    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh()
      })
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  )
}
