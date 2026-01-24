'use client'

import { useEffect, useState } from 'react'

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render on server to avoid hydration mismatch
  if (!mounted) return null

  return (
    <div className="animated-background" aria-hidden="true">
      {/* Gradient orbs */}
      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />
      <div className="gradient-orb gradient-orb-3" />
      
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Vignette effect */}
      <div className="vignette-overlay" />
    </div>
  )
}
