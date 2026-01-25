'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'

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

const hideOverlay = (overlay: HTMLElement | null) => {
  if (!overlay) return
  overlay.style.pointerEvents = 'none'
  overlay.style.display = 'none'
}

export default function IntroOverlayClient() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const overlay = document.querySelector<HTMLElement>('[data-intro-overlay]')
    const text = overlay?.querySelector<HTMLElement>('[data-intro-text]')
    const wipe = overlay?.querySelector<HTMLElement>('[data-intro-wipe]')

    if (!overlay || !text || !wipe) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasPlayed = sessionStorage.getItem(INTRO_KEY) === '1'

    if (prefersReducedMotion || hasPlayed) {
      hideOverlay(overlay)
      return
    }

    const unlockScroll = lockScroll()

    const ctx = gsap.context(() => {
      gsap.set(wipe, { autoAlpha: 0, xPercent: -120 })

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          sessionStorage.setItem(INTRO_KEY, '1')
          unlockScroll()
          hideOverlay(overlay)
        },
      })

      tl.to(text, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
      })
        .to(
          wipe,
          {
            autoAlpha: 0.85,
            xPercent: 120,
            duration: 0.6,
            ease: 'power1.inOut',
          },
          '-=0.2'
        )
        .to(
          overlay,
          {
            yPercent: -100,
            duration: 0.6,
            ease: 'power3.inOut',
          },
          '+=0.15'
        )
    }, overlay)

    return () => {
      ctx.revert()
      unlockScroll()
    }
  }, [])

  return null
}
