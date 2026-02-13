'use client'

import { useRef, useEffect } from 'react'
import { animate } from 'framer-motion'
import { useLenis } from '@/hooks/useLenis'

interface IntroOverlayProps {
  onComplete?: () => void
}

export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const subtextRef = useRef<HTMLDivElement>(null)
  const { lenis } = useLenis()

  useEffect(() => {
    const overlay = overlayRef.current
    const text = textRef.current
    const subtext = subtextRef.current

    if (!overlay || !text || !subtext) {
      // If refs not ready, complete immediately
      lenis?.start()
      onComplete?.()
      return
    }

    // Stop scroll during intro
    lenis?.stop()

    // Set initial states
    text.style.opacity = '0'
    text.style.transform = 'scale(0.9)'
    subtext.style.opacity = '0'
    subtext.style.transform = 'translateY(15px)'
    overlay.style.transform = 'translateY(0%)'

    const runAnimation = async () => {
      try {
        await animate([
          [text, { opacity: 1, scale: 1 }, { duration: 0.7, ease: 'easeOut', delay: 0.2 }],
          [text, { backgroundPosition: '100% 0' }, { duration: 0.6, ease: 'easeInOut', at: '-0.2' }],
          [subtext, { opacity: 1, y: 0 }, { duration: 0.4, ease: 'easeOut', at: '-0.3' }],
          [overlay, { y: '-100%' }, { duration: 0.7, ease: 'easeInOut', at: '+0.3' }] // +0.3 delay acts as the generic wait
        ])

        lenis?.start()
        onComplete?.()
      } catch (e) {
        // interrupted
        lenis?.start()
        onComplete?.()
      }
    }

    runAnimation()

    // Fallback: force complete after 4 seconds max
    const fallbackTimer = setTimeout(() => {
      overlay.style.opacity = '0'
      overlay.style.pointerEvents = 'none'
      lenis?.start()
      onComplete?.()
    }, 4000)

    return () => {
      clearTimeout(fallbackTimer)
    }
  }, [lenis, onComplete])

  return (
    <div
      ref={overlayRef}
      className="intro-overlay"
      aria-hidden="true"
    >
      <div className="intro-content">
        <div ref={textRef} className="intro-text">
          TECHBRIDGE
        </div>
        <div ref={subtextRef} className="intro-subtext">
          Software Studio
        </div>
      </div>
    </div>
  )
}
