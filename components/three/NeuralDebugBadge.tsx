'use client'

import { useSearchParams } from 'next/navigation'

/**
 * Temporary DEBUG badge for neural background visibility.
 * Shown when ?neural_debug=1 in URL or NEXT_PUBLIC_NEURAL_DEBUG=1.
 */

export interface NeuralDebugBadgeProps {
  tier: number
  isTouchDevice: boolean
  prefersReducedMotion: boolean
  saveData?: boolean
  isMounted: boolean
  opacity: number
}

export default function NeuralDebugBadge({
  tier,
  isTouchDevice,
  prefersReducedMotion,
  saveData = false,
  isMounted,
  opacity,
}: NeuralDebugBadgeProps) {
  const searchParams = useSearchParams()
  const urlDebug = searchParams?.get('neural_debug') === '1'
  const showDebug = urlDebug || process.env.NEXT_PUBLIC_NEURAL_DEBUG === '1'
  if (!showDebug) return null

  return (
    <div
      className="fixed left-1 top-1 z-[9999] font-mono text-[10px] leading-tight text-green-400 bg-black/80 px-1.5 py-1 rounded border border-green-800/60 pointer-events-none"
      aria-hidden="true"
    >
      <div>tier {tier}</div>
      <div>touch {isTouchDevice ? 'Y' : 'N'}</div>
      <div>reduce {prefersReducedMotion ? 'Y' : 'N'}</div>
      <div>saveData {saveData ? 'Y' : 'N'}</div>
      <div>mounted {isMounted ? 'Y' : 'N'}</div>
      <div>opacity {opacity.toFixed(2)}</div>
    </div>
  )
}
