import React from 'react'

/**
 * IntroOverlayShell - Server Component
 * 
 * SSR-critical: This component must render the complete intro appearance
 * on the VERY FIRST paint, before any external CSS or JS loads.
 * 
 * The gradient is inlined to ensure it appears immediately.
 */
export default function IntroOverlayShell() {
  // Inline gradient style - ensures first paint shows the intro background
  // This MUST match the intro mode gradient in globals.css
  const introMeshStyle: React.CSSProperties = {
    position: 'absolute',
    inset: '-20vmax',
    pointerEvents: 'none',
    background: `
      radial-gradient(ellipse 80% 60% at 20% 30%, rgba(59, 130, 246, 0.22) 0%, transparent 60%),
      radial-gradient(ellipse 70% 50% at 85% 20%, rgba(52, 211, 153, 0.16) 0%, transparent 55%),
      radial-gradient(ellipse 60% 50% at 75% 85%, rgba(59, 130, 246, 0.16) 0%, transparent 55%),
      radial-gradient(ellipse 70% 60% at 10% 80%, rgba(52, 211, 153, 0.16) 0%, transparent 60%)
    `,
    filter: 'blur(35px)',
    transform: 'scale(1.05)',
    opacity: 1,
  }

  return (
    <div
      data-intro-overlay
      aria-hidden="true"
      className="fixed inset-0 z-[999] flex items-center justify-center text-white motion-reduce:hidden"
      style={{ backgroundColor: '#020617' }}
    >
      {/* Intro mesh gradient - INLINED for immediate first paint */}
      <div style={introMeshStyle} />

      {/* Text container */}
      <div className="relative">
        <div
          data-intro-text
          className="relative text-[clamp(1.75rem,3.4vw,3rem)] font-[var(--font-sans)] font-semibold uppercase tracking-[0.2em] leading-none text-white opacity-0 translate-y-[12px] scale-[0.96] origin-center [will-change:transform,opacity]"
        >
          {/* Base text layer - white */}
          <span className="relative z-10">TechBridge</span>
          {/* Light sweep overlay - clipped to text (data-intro-wipe for GSAP client) */}
          <span
            data-intro-sweep
            data-intro-wipe
            className="absolute inset-0 z-20 intro-text-sweep select-none pointer-events-none"
            aria-hidden="true"
          >
            TechBridge
          </span>
        </div>
      </div>
    </div>
  )
}
