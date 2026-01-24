'use client'

import { useState, useEffect } from 'react'
import { IntroOverlay } from '@/components/intro'

export default function ClientIntro() {
  const [showIntro, setShowIntro] = useState(true)
  const [hasPlayed, setHasPlayed] = useState(false)

  useEffect(() => {
    // Check if intro has already played this session
    const introPlayed = sessionStorage.getItem('introPlayed')
    if (introPlayed) {
      setShowIntro(false)
      setHasPlayed(true)
    }
  }, [])

  const handleIntroComplete = () => {
    setShowIntro(false)
    setHasPlayed(true)
    // Store in session storage so it doesn't play again on navigation
    sessionStorage.setItem('introPlayed', 'true')
  }

  if (!showIntro || hasPlayed) return null

  return <IntroOverlay onComplete={handleIntroComplete} />
}
