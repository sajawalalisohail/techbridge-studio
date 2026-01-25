import React from 'react'

export default function IntroOverlayShell() {
  return (
    <div
      data-intro-overlay
      aria-hidden="true"
      className="fixed inset-0 z-[999] flex items-center justify-center text-white motion-reduce:hidden"
    >
      <div className="absolute inset-0 bg-background" />
      <div className="pointer-events-none absolute inset-[-20vmax] intro-bg" />
      <div className="pointer-events-none absolute inset-[-20vmax] intro-grain" />
      <div className="relative">
        <div
          data-intro-text
          className="relative text-[clamp(1.75rem,3.4vw,3rem)] font-[var(--font-sans)] font-semibold uppercase tracking-[0.2em] leading-none text-white opacity-0 translate-y-[12px] scale-[0.96] origin-center [will-change:transform,opacity]"
        >
          <span className="relative z-10">TechBridge</span>
          <span
            data-intro-wipe
            className="absolute inset-y-0 -left-10 -right-10 -z-10 bg-gradient-to-r from-transparent via-emerald-300/80 to-transparent opacity-0 blur-xl mix-blend-screen"
          />
        </div>
      </div>
    </div>
  )
}
