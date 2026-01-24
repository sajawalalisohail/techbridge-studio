'use client'

import { useRef, useState, useEffect } from 'react'
import { gsap, useGSAP, prefersReducedMotion, isMobile } from '@/lib/gsap'
import { useLenis } from '@/hooks/useLenis'

interface IntroOverlayProps {
  onComplete?: () => void
}

export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const subtextRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const { lenis } = useLenis()

  useEffect(() => {
    // Skip intro on mobile or reduced motion
    if (prefersReducedMotion() || isMobile()) {
      setIsVisible(false)
      onComplete?.()
      return
    }

    // Pause scroll during intro
    lenis?.stop()
  }, [lenis, onComplete])

  useGSAP(() => {
    // Skip if not visible or reduced motion
    if (!isVisible || prefersReducedMotion() || isMobile()) {
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        lenis?.start()
        setIsVisible(false)
        onComplete?.()
      }
    })

    // Initial state
    gsap.set(textRef.current, { opacity: 0, scale: 0.95 })
    gsap.set(subtextRef.current, { opacity: 0, y: 20 })

    // Animation sequence
    tl
      // Fade in brand name
      .to(textRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.3,
      })
      // Gradient sweep through text
      .to(textRef.current, {
        backgroundPosition: '100% 0',
        duration: 0.7,
        ease: 'power1.inOut',
      })
      // Fade in subtext
      .to(subtextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.3')
      // Hold for impact
      .to({}, { duration: 0.4 })
      // Slide overlay up
      .to(overlayRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
      })

  }, { dependencies: [isVisible, lenis], scope: overlayRef })

  if (!isVisible) return null

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
