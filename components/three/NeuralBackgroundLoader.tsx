'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useNeuralInteraction } from '@/providers/NeuralInteractionProvider'
import { isTouchDevice, detectTierWithReason } from '@/lib/neural-utils'
import NeuralDebugBadge from './NeuralDebugBadge'

const NeuralBackground = dynamic(
  () => import('./NeuralBackground'),
  { ssr: false, loading: () => null }
)

const INTRO_COMPLETE_EVENT = 'tb-intro-complete'
/** Mount Canvas after this delay (0 when intro already played) */
const MOUNT_DELAY_MS = 400
/** When intro already played, mount almost immediately */
const MOUNT_DELAY_AFTER_INTRO_MS = 50
/** Fade in after intro complete, or after this from mount (fallback if event never fires) */
const VISIBILITY_FALLBACK_MS = 1500

/**
 * NeuralBackgroundLoader
 *
 * On desktop: mounts Canvas after MOUNT_DELAY_MS regardless of intro.
 * Fade-in (opacity) happens when intro complete event / overlay gone, or VISIBILITY_FALLBACK_MS.
 * Layer is explicit: fixed inset-0 z-0 so it sits between background and PageSurface.
 */
export default function NeuralBackgroundLoader() {
  const [shouldMount, setShouldMount] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [debug, setDebug] = useState<{
    tier: number
    isTouchDevice: boolean
    prefersReducedMotion: boolean
    saveData: boolean
  } | null>(null)
  const hasStartedRef = useRef(false)
  const visibilityScheduledRef = useRef(false)
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const removeListenerRef = useRef<(() => void) | null>(null)

  const { velocityRef, attractorRef } = useNeuralInteraction()

  useEffect(() => {
    if (hasStartedRef.current) return
    hasStartedRef.current = true

    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const touch = isTouchDevice()
    const mobile = typeof window !== 'undefined' && window.innerWidth < 768
    const conn = typeof navigator !== 'undefined' && (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    const saveData = !!(conn?.saveData)
    const { tier } = detectTierWithReason()

    setDebug({ tier, isTouchDevice: touch, prefersReducedMotion, saveData })

    if (tier === 0) {
      console.log('[NeuralBG] Skip — tier 0 (reduced:', prefersReducedMotion, 'touch:', touch, 'mobile:', mobile, ')')
      return
    }

    const show = () => {
      if (visibilityScheduledRef.current) return
      visibilityScheduledRef.current = true
      setIsVisible(true)
    }

    const hasPlayed = typeof window !== 'undefined' && sessionStorage.getItem('tb_intro_played') === '1'
    const mountDelay = hasPlayed ? MOUNT_DELAY_AFTER_INTRO_MS : MOUNT_DELAY_MS

    // 1) Mount Canvas after short delay (faster when intro already played)
    const mountTimer = setTimeout(() => {
      setShouldMount(true)
      window.addEventListener(INTRO_COMPLETE_EVENT, show)
      removeListenerRef.current = () => window.removeEventListener(INTRO_COMPLETE_EVENT, show)
      setTimeout(show, 100) // in case overlay already hidden (e.g. hasPlayed)
      fallbackTimerRef.current = setTimeout(show, VISIBILITY_FALLBACK_MS)
      // Ensure mesh becomes visible even if event never fires: show after 800ms from mount
      setTimeout(show, 800)
    }, mountDelay)

    return () => {
      clearTimeout(mountTimer)
      removeListenerRef.current?.()
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current)
    }
  }, [])

  const opacity = isVisible ? 1 : 0

  return (
    <>
      {debug && (
        <NeuralDebugBadge
          tier={debug.tier}
          isTouchDevice={debug.isTouchDevice}
          prefersReducedMotion={debug.prefersReducedMotion}
          saveData={debug.saveData}
          isMounted={shouldMount}
          opacity={opacity}
        />
      )}
      {shouldMount && (
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            opacity,
            transition: 'opacity 0.8s ease-out',
            background: '#020617',
          }}
          aria-hidden="true"
        >
          <NeuralBackground
            velocityRef={velocityRef}
            attractorRef={attractorRef}
            visible={isVisible}
          />
        </div>
      )}
    </>
  )
}
