'use client'

import { useCallback, useRef, ReactNode } from 'react'
import { useNeuralInteraction } from '@/providers/NeuralInteractionProvider'

interface NeuralAttractorCardProps {
    children: ReactNode
    className?: string
}

/**
 * NeuralAttractorCard
 * 
 * Wraps a card element and reports its center position to the
 * NeuralInteractionProvider on hover (desktop only).
 * 
 * Uses pointer events to detect hover, throttled via RAF.
 */
export default function NeuralAttractorCard({ children, className }: NeuralAttractorCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const rafPending = useRef(false)
    const { setAttractor, clearAttractor } = useNeuralInteraction()

    const handlePointerEnter = useCallback(() => {
        if (!cardRef.current || rafPending.current) return

        // Desktop only check
        if (typeof window !== 'undefined') {
            const isTouchDevice =
                window.matchMedia('(pointer: coarse)').matches ||
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0
            if (isTouchDevice) return
        }

        rafPending.current = true
        requestAnimationFrame(() => {
            if (!cardRef.current) return

            const rect = cardRef.current.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2

            setAttractor(centerX, centerY)
            rafPending.current = false
        })
    }, [setAttractor])

    const handlePointerLeave = useCallback(() => {
        clearAttractor()
        rafPending.current = false
    }, [clearAttractor])

    return (
        <div
            ref={cardRef}
            className={className}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
        >
            {children}
        </div>
    )
}
