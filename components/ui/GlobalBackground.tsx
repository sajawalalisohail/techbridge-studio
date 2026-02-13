import { memo } from 'react'

/**
 * GlobalBackground - Unified Background System (Server Component)
 * 
 * Uses the shared `.unified-bg-mesh` and `.unified-bg-noise` classes
 * which are controlled by CSS variables and the data-bg-mode attribute.
 * 
 * The background mode is controlled at the body level:
 * - data-bg-mode="intro" → stronger, more focused gradients
 * - data-bg-mode="site" → subtle, ambient gradients
 * - data-bg-mode="transitioning" → smooth transition between modes
 */
const GlobalBackground = memo(function GlobalBackground() {
    return (
        <div
            className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden select-none"
            aria-hidden="true"
            data-global-background
        >
            {/* Unified mesh gradient layer */}
            <div className="unified-bg-mesh" />

            {/* Static noise overlay (hidden on mobile via CSS) */}
            <div className="unified-bg-noise hidden md:block" />
        </div>
    )
})

export default GlobalBackground
