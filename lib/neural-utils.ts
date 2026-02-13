/**
 * Shared neural background utilities: touch detection, tier selection.
 * Used by NeuralBackgroundLoader, NeuralBackground, and NeuralDebugBadge.
 */

export type NeuralTier = 0 | 1 | 2 | 3

export interface TierResult {
  tier: NeuralTier
  reason: string
}

let tierReasonLogged = false

/**
 * Touch device = primary input is a touch screen (pointer: coarse).
 * Do NOT treat trackpads as touch: they report pointer: fine, so we only skip
 * when (pointer: coarse) is true (phones/tablets).
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: coarse)').matches
}

/**
 * Detect tier with reasoning. Desktop defaults to Tier 2 unless reduced motion or save-data.
 * Logs tier reasoning to console once.
 */
export function detectTierWithReason(): TierResult {
  if (typeof window === 'undefined') {
    return { tier: 0, reason: 'ssr' }
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const touch = isTouchDevice()
  const mobile = window.innerWidth < 768
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  const saveData = !!conn?.saveData
  const cores = navigator.hardwareConcurrency ?? 4
  const dpr = window.devicePixelRatio ?? 1

  if (prefersReducedMotion) {
    const r = { tier: 0 as NeuralTier, reason: 'prefers-reduced-motion' }
    logTierOnce(r)
    return r
  }
  // Only skip for touch on small viewports (phones/tablets). Touchscreen laptops are desktop-sized.
  if (touch && mobile) {
    const r = { tier: 0 as NeuralTier, reason: 'touch device + viewport < 768px' }
    logTierOnce(r)
    return r
  }
  if (mobile) {
    const r = { tier: 0 as NeuralTier, reason: 'viewport < 768px' }
    logTierOnce(r)
    return r
  }
  if (saveData) {
    const r = { tier: 1 as NeuralTier, reason: 'save-data' }
    logTierOnce(r)
    return r
  }
  if (cores >= 8 && dpr <= 2) {
    const r = { tier: 3 as NeuralTier, reason: `desktop, cores=${cores} dpr=${dpr}` }
    logTierOnce(r)
    return r
  }
  if (cores >= 4) {
    const r = { tier: 2 as NeuralTier, reason: `desktop, cores=${cores} (default)` }
    logTierOnce(r)
    return r
  }
  const r = { tier: 1 as NeuralTier, reason: `desktop, cores=${cores}` }
  logTierOnce(r)
  return r
}

function logTierOnce(result: TierResult) {
  if (tierReasonLogged) return
  tierReasonLogged = true
  console.log('[NeuralBG] Tier:', result.tier, '—', result.reason)
}
