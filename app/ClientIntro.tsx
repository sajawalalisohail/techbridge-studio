'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import IntroOverlay to avoid SSR issues
const IntroOverlay = dynamic(
  () => import('@/components/intro/IntroOverlay'),
  { ssr: false }
)

export default function ClientIntro() {
  const [showIntro, setShowIntro] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check if intro has already played this session
    const introPlayed = sessionStorage.getItem('introPlayed')
    
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // Check if mobile
    const isMobile = window.innerWidth < 1024
    
    // Only show intro on desktop, without reduced motion, and if not already played
    if (!introPlayed && !prefersReducedMotion && !isMobile) {
      setShowIntro(true)
      
      // Safety fallback: force hide intro after 5 seconds max
      const fallbackTimer = setTimeout(() => {
        setShowIntro(false)
        sessionStorage.setItem('introPlayed', 'true')
      }, 5000)
      
      return () => clearTimeout(fallbackTimer)
    } else {
      // Mark as played so other components know
      sessionStorage.setItem('introPlayed', 'true')
    }
  }, [])

  const handleIntroComplete = () => {
    setShowIntro(false)
    sessionStorage.setItem('introPlayed', 'true')
  }

  // Don't render anything until mounted (prevents hydration issues)
  if (!mounted) return null

  if (!showIntro) return null

  return <IntroOverlay onComplete={handleIntroComplete} />
}
