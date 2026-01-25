'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useLenis } from '@/hooks/useLenis'

interface IntroOverlayProps {
  onComplete?: () => void
}

export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const subtextRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
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
    gsap.set(text, { opacity: 0, scale: 0.9 })
    gsap.set(subtext, { opacity: 0, y: 15 })
    gsap.set(overlay, { yPercent: 0 })

    // Create timeline with fallback timeout
    const tl = gsap.timeline({
      onComplete: () => {
        lenis?.start()
        onComplete?.()
      }
    })

    timelineRef.current = tl

    tl
      .to(text, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out',
        delay: 0.2,
      })
      .to(text, {
        backgroundPosition: '100% 0',
        duration: 0.6,
        ease: 'power1.inOut',
      }, '-=0.2')
      .to(subtext, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      }, '-=0.3')
      .to({}, { duration: 0.3 })
      .to(overlay, {
        yPercent: -100,
        duration: 0.7,
        ease: 'power3.inOut',
      })

    // Fallback: force complete after 4 seconds max
    const fallbackTimer = setTimeout(() => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
      gsap.set(overlay, { yPercent: -100, opacity: 0 })
      lenis?.start()
      onComplete?.()
    }, 4000)

    return () => {
      tl.kill()
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
