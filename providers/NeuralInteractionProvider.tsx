'use client'

import { createContext, useContext, useRef, MutableRefObject } from 'react'

/**
 * Neural Interaction Context
 * 
 * Provides refs for scroll velocity and hover attractor.
 * Uses refs (not state) to avoid re-renders on every frame.
 */

interface NeuralInteractionContextValue {
    velocityRef: MutableRefObject<number>
    attractorRef: MutableRefObject<{ x: number; y: number; active: boolean }>
    setVelocity: (v: number) => void
    setAttractor: (x: number, y: number) => void
    clearAttractor: () => void
}

const NeuralInteractionContext = createContext<NeuralInteractionContextValue | null>(null)

export function useNeuralInteraction() {
    const ctx = useContext(NeuralInteractionContext)
    if (!ctx) {
        // Return no-op functions if not within provider (SSR safety)
        return {
            velocityRef: { current: 0 } as MutableRefObject<number>,
            attractorRef: { current: { x: 0, y: 0, active: false } } as MutableRefObject<{ x: number; y: number; active: boolean }>,
            setVelocity: () => { },
            setAttractor: () => { },
            clearAttractor: () => { },
        }
    }
    return ctx
}

export function NeuralInteractionProvider({ children }: { children: React.ReactNode }) {
    const velocityRef = useRef(0)
    const attractorRef = useRef({ x: 0, y: 0, active: false })

    const setVelocity = (v: number) => {
        velocityRef.current = v
    }

    const setAttractor = (x: number, y: number) => {
        attractorRef.current = { x, y, active: true }
    }

    const clearAttractor = () => {
        attractorRef.current = { x: 0, y: 0, active: false }
    }

    return (
        <NeuralInteractionContext.Provider
            value={{
                velocityRef,
                attractorRef,
                setVelocity,
                setAttractor,
                clearAttractor,
            }}
        >
            {children}
        </NeuralInteractionContext.Provider>
    )
}
