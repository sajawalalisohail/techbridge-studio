'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { detectTierWithReason, type NeuralTier } from '@/lib/neural-utils'

// ============================================================================
// TIER CONFIG
// ============================================================================

interface TierConfig {
    pointCount: number
    pointSize: number
    opacity: number
    animate: boolean
}

const TIER_CONFIGS: Record<NeuralTier, TierConfig> = {
    0: { pointCount: 0, pointSize: 0, opacity: 0, animate: false },
    1: { pointCount: 600, pointSize: 4.0, opacity: 0.65, animate: false },
    2: { pointCount: 1500, pointSize: 4.0, opacity: 0.78, animate: true },
    3: { pointCount: 2800, pointSize: 3.5, opacity: 0.75, animate: true },
}

// ============================================================================
// POINTS FIELD COMPONENT
// ============================================================================

interface PointsFieldProps {
    config: TierConfig
    velocityRef: React.MutableRefObject<number>
    attractorRef: React.MutableRefObject<{ x: number; y: number; active: boolean }>
}

function PointsField({ config, velocityRef, attractorRef }: PointsFieldProps) {
    const pointsRef = useRef<THREE.Points>(null)
    const { size, viewport } = useThree()

    // Store base positions and current positions separately
    const basePositions = useMemo(() => {
        const positions = new Float32Array(config.pointCount * 3)
        const spread = 12

        for (let i = 0; i < config.pointCount; i++) {
            const i3 = i * 3
            // Distribute in a sphere-like volume
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)
            const r = Math.cbrt(Math.random()) * spread

            positions[i3] = r * Math.sin(phi) * Math.cos(theta)
            positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
            positions[i3 + 2] = (r * Math.cos(phi)) - spread * 0.3
        }

        return positions
    }, [config.pointCount])

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry()
        const positions = new Float32Array(basePositions)
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        return geo
    }, [basePositions])

    // Velocity offset state (for scroll push)
    const velocityOffsetRef = useRef(0)
    const dampedVelocityRef = useRef(0)

    useFrame((_, delta) => {
        if (!pointsRef.current || !config.animate) return

        const points = pointsRef.current
        const positions = points.geometry.attributes.position.array as Float32Array

        // Damped scroll velocity push (Phase 2)
        const targetVelocity = velocityRef.current * 0.0003
        dampedVelocityRef.current += (targetVelocity - dampedVelocityRef.current) * 0.1
        velocityOffsetRef.current += dampedVelocityRef.current

        // Attractor (Phase 3)
        const attractor = attractorRef.current
        let attractorNDC = { x: 0, y: 0 }
        if (attractor.active) {
            attractorNDC = {
                x: (attractor.x / size.width) * 2 - 1,
                y: -((attractor.y / size.height) * 2 - 1),
            }
        }

        // Update positions
        const time = performance.now() * 0.0001

        for (let i = 0; i < config.pointCount; i++) {
            const i3 = i * 3

            // Base position with slow organic drift
            const bx = basePositions[i3]
            const by = basePositions[i3 + 1]
            const bz = basePositions[i3 + 2]

            // Organic movement (very subtle)
            const drift = Math.sin(time + i * 0.1) * 0.02

            // Apply scroll velocity push (subtle vertical offset)
            const scrollPush = velocityOffsetRef.current * (0.5 + Math.random() * 0.5)

            // Attractor influence (Phase 3)
            let attractForce = { x: 0, y: 0 }
            if (attractor.active) {
                // Convert point position to NDC-like coords for distance calc
                const aspect = viewport.width / viewport.height
                const pointNDC = {
                    x: bx / (viewport.width * 0.5) * aspect,
                    y: by / (viewport.height * 0.5),
                }
                const dx = attractorNDC.x - pointNDC.x
                const dy = attractorNDC.y - pointNDC.y
                const dist = Math.sqrt(dx * dx + dy * dy)

                // Gentle attraction with falloff
                if (dist < 1.5 && dist > 0.01) {
                    const strength = (1 - dist / 1.5) * 0.15
                    attractForce.x = dx * strength
                    attractForce.y = dy * strength
                }
            }

            positions[i3] = bx + drift + attractForce.x
            positions[i3 + 1] = by + drift + scrollPush * 0.2 + attractForce.y
            positions[i3 + 2] = bz + drift * 0.5
        }

        points.geometry.attributes.position.needsUpdate = true

        // Slowly decay velocity offset
        velocityOffsetRef.current *= 0.98
    })

    // Point color - visible against dark navy (#020617)
    const pointColor = useMemo(() => {
        return new THREE.Color(0.45, 0.75, 1.0) // Brighter blue-cyan so mesh is clearly visible
    }, [])

    return (
        <points ref={pointsRef} geometry={geometry}>
            <pointsMaterial
                color={pointColor}
                size={config.pointSize}
                sizeAttenuation
                transparent
                opacity={config.opacity}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

// ============================================================================
// SCENE WRAPPER (handles pause logic)
// ============================================================================

interface SceneProps {
    config: TierConfig
    velocityRef: React.MutableRefObject<number>
    attractorRef: React.MutableRefObject<{ x: number; y: number; active: boolean }>
}

/** Dark navy to match site background - prevents white flash / super white when canvas is transparent */
const CLEAR_COLOR = new THREE.Color(0x020617)

function Scene({ config, velocityRef, attractorRef }: SceneProps) {
    const { invalidate, gl } = useThree()

    // Ensure canvas clears to dark navy so the layer is never white
    useEffect(() => {
        gl.setClearColor(CLEAR_COLOR, 1)
    }, [gl])

    // Pause when tab hidden
    useEffect(() => {
        const handleVisibility = () => {
            if (!document.hidden && config.animate) {
                invalidate()
            }
        }

        document.addEventListener('visibilitychange', handleVisibility)
        return () => document.removeEventListener('visibilitychange', handleVisibility)
    }, [invalidate, config.animate])

    return (
        <>
            <PointsField config={config} velocityRef={velocityRef} attractorRef={attractorRef} />
        </>
    )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export interface NeuralBackgroundProps {
    /** Force a specific tier (for testing) */
    forceTier?: NeuralTier
    /** Ref for scroll velocity (from Lenis) */
    velocityRef?: React.MutableRefObject<number>
    /** Ref for attractor position (from hover) */
    attractorRef?: React.MutableRefObject<{ x: number; y: number; active: boolean }>
    /** Whether to show (controlled by intro completion) */
    visible?: boolean
}

export default function NeuralBackground({
    forceTier,
    velocityRef,
    attractorRef,
    visible = true,
}: NeuralBackgroundProps) {
    const tier = useMemo(() => forceTier ?? detectTierWithReason().tier, [forceTier])
    const config = TIER_CONFIGS[tier]

    // Default refs if not provided
    const defaultVelocityRef = useRef(0)
    const defaultAttractorRef = useRef({ x: 0, y: 0, active: false })

    const effectiveVelocityRef = velocityRef ?? defaultVelocityRef
    const effectiveAttractorRef = attractorRef ?? defaultAttractorRef

    // Tier 0: render nothing
    if (tier === 0 || !visible) {
        return null
    }

    // DPR cap: max 2 for performance
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    return (
        <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
        >
            <Canvas
                dpr={dpr}
                camera={{ position: [0, 0, 8], fov: 60 }}
                frameloop={config.animate ? 'always' : 'demand'}
                onCreated={({ gl }) => {
                    gl.setClearColor(CLEAR_COLOR, 1)
                }}
                gl={{
                    antialias: false,
                    alpha: false,
                    powerPreference: 'high-performance',
                    stencil: false,
                    depth: false,
                }}
                style={{ background: '#020617', width: '100%', height: '100%' }}
            >
                <Scene
                    config={config}
                    velocityRef={effectiveVelocityRef}
                    attractorRef={effectiveAttractorRef}
                />
            </Canvas>
        </div>
    )
}
