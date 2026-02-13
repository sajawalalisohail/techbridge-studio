'use client'

import { useState, useEffect, ReactNode } from 'react'

interface IntroGateProps {
    children: ReactNode
}

/**
 * IntroGate hides the main content until the intro animation completes.
 * This prevents any "flash" of the site content before/during the intro.
 * 
 * The intro overlay itself is rendered separately in layout.tsx BEFORE this gate,
 * so it's always visible on top. This gate just controls when the content beneath
 * becomes visible.
 */
export default function IntroGate({ children }: IntroGateProps) {
    const [introComplete, setIntroComplete] = useState(false)

    useEffect(() => {
        if (typeof window === 'undefined') return

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const hasPlayed = sessionStorage.getItem('tb_intro_played') === '1'

        // If intro already played or reduced motion, show content immediately
        if (prefersReducedMotion || hasPlayed) {
            setIntroComplete(true)
            return
        }

        // Listen for intro completion
        const checkIntroComplete = () => {
            const overlay = document.querySelector('[data-intro-overlay]')
            if (!overlay || (overlay as HTMLElement).style.display === 'none') {
                setIntroComplete(true)
                return true
            }
            return false
        }

        // Check periodically until intro is done
        const interval = setInterval(() => {
            if (checkIntroComplete()) {
                clearInterval(interval)
            }
        }, 100)

        // Also listen for the intro to be hidden via MutationObserver
        const overlay = document.querySelector('[data-intro-overlay]')
        if (overlay) {
            const observer = new MutationObserver(() => {
                if ((overlay as HTMLElement).style.display === 'none') {
                    setIntroComplete(true)
                    observer.disconnect()
                    clearInterval(interval)
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

    return (
        <div
            style={{
                opacity: introComplete ? 1 : 0,
                visibility: introComplete ? 'visible' : 'hidden',
                transition: 'opacity 0.3s ease-out',
            }}
        >
            {children}
        </div>
    )
}
