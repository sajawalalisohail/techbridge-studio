'use client'

import { useEffect } from 'react'
import { animate } from 'framer-motion'

const INTRO_KEY = 'tb_intro_played'

const lockScroll = () => {
  const html = document.documentElement
  const body = document.body
  const prev = {
    htmlOverflow: html.style.overflow,
    bodyOverflow: body.style.overflow,
    bodyPaddingRight: body.style.paddingRight,
  }

  const scrollBarWidth = window.innerWidth - html.clientWidth
  html.style.overflow = 'hidden'
  body.style.overflow = 'hidden'
  if (scrollBarWidth > 0) {
    body.style.paddingRight = `${scrollBarWidth}px`
  }

  return () => {
    html.style.overflow = prev.htmlOverflow
    body.style.overflow = prev.bodyOverflow
    body.style.paddingRight = prev.bodyPaddingRight
  }
}

const INTRO_COMPLETE_EVENT = 'tb-intro-complete'

const hideOverlay = (overlay: HTMLElement | null) => {
  if (!overlay) return
  overlay.style.pointerEvents = 'none'
  overlay.style.display = 'none'
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(INTRO_COMPLETE_EVENT))
  }
}

export default function IntroOverlayClient() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const overlay = document.querySelector<HTMLElement>('[data-intro-overlay]')
    const text = overlay?.querySelector<HTMLElement>('[data-intro-text]')
    const sweep = overlay?.querySelector<HTMLElement>('[data-intro-sweep]')

    if (!overlay || !text) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasPlayed = sessionStorage.getItem(INTRO_KEY) === '1'

    if (prefersReducedMotion || hasPlayed) {
      hideOverlay(overlay)
      return
    }

    const unlockScroll = lockScroll()

    const runAnimation = async () => {
      try {
        // Step 1: Fade in the text
        await animate(text, { opacity: 1, y: 0, scale: 1 }, { duration: 0.5, ease: 'easeOut' })

        // Step 2: Trigger the sweep animation via CSS class
        if (sweep) {
          sweep.classList.add('sweeping')
          // Wait for sweep animation to complete (1s)
          await new Promise(resolve => setTimeout(resolve, 1000))
          sweep.classList.remove('sweeping')
          sweep.classList.add('sweep-done')
        }

        // Step 3: Small pause then slide overlay up
        await new Promise(resolve => setTimeout(resolve, 150))
        await animate(overlay, { y: '-100%' }, { duration: 0.6, ease: 'easeInOut' })

        sessionStorage.setItem(INTRO_KEY, '1')
        unlockScroll()
        hideOverlay(overlay)
      } catch (e) {
        // Handle animation interrupt or error
        unlockScroll()
        hideOverlay(overlay)
      }
    }

    runAnimation()

    return () => {
      // In case of unmount during animation
      unlockScroll()
    }
  }, [])

  return null
}
