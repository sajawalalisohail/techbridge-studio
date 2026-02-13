'use client'

import { useEffect } from 'react'

/**
 * BackgroundModeController - Client Component
 * 
 * Manages the data-bg-mode attribute on document.body to control
 * the unified background system's appearance.
 * 
 * Modes:
 * - "intro" → stronger, focused gradients (during intro)
 * - "transitioning" → smooth transition animation
 * - "site" → subtle, ambient gradients (normal site)
 */
export default function BackgroundModeController() {
    useEffect(() => {
        if (typeof window === 'undefined') return

        const body = document.body
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const hasPlayed = sessionStorage.getItem('tb_intro_played') === '1'

        // If intro already played or reduced motion, set to site mode immediately
        if (prefersReducedMotion || hasPlayed) {
            body.setAttribute('data-bg-mode', 'site')
            return
        }

        // Start in intro mode
        body.setAttribute('data-bg-mode', 'intro')

        // Listen for intro completion and transition to site mode
        const checkIntroComplete = () => {
            const overlay = document.querySelector('[data-intro-overlay]')
            if (!overlay || (overlay as HTMLElement).style.display === 'none') {
                // Trigger transition
                body.setAttribute('data-bg-mode', 'transitioning')

                // After transition completes, set final site mode
                setTimeout(() => {
                    body.setAttribute('data-bg-mode', 'site')
                }, prefersReducedMotion ? 0 : 1000)

                return true
            }
            return false
        }

        // Poll for intro completion
        const interval = setInterval(() => {
            if (checkIntroComplete()) {
                clearInterval(interval)
            }
        }, 100)

        // Also use MutationObserver for faster detection
        const overlay = document.querySelector('[data-intro-overlay]')
        if (overlay) {
            const observer = new MutationObserver(() => {
                if ((overlay as HTMLElement).style.display === 'none') {
                    if (checkIntroComplete()) {
                        observer.disconnect()
                        clearInterval(interval)
                    }
                }
            })
            observer.observe(overlay, { attributes: true, attributeFilter: ['style'] })

            return () => {
                observer.disconnect()
                clearInterval(interval)
            }
        }

        return () => clearInterval(interval)
    }, [])

    return null
}
