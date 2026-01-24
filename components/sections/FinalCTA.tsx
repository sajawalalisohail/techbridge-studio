'use client'

import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { Container, Section, Button } from '@/components/ui'

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return

    // Content animation
    gsap.from(contentRef.current?.children || [], {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
      },
    })

    // Parallax effect on text
    gsap.to(contentRef.current, {
      y: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })
  }, { scope: sectionRef })

  return (
    <Section 
      ref={sectionRef}
      className="cta-section bg-foreground text-background relative overflow-hidden"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent-secondary/20 pointer-events-none" />
      
      {/* Animated gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-accent/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <Container className="relative z-10">
        <div ref={contentRef} className="text-center max-w-2xl mx-auto">
          <h2 className="text-headline-sm md:text-headline font-semibold tracking-tight mb-6">
            Ready to build something?
          </h2>
          <p className="text-background/70 text-body-lg mb-10">
            Tell us about your project. We&apos;ll get back to you within 24 hours 
            with next steps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              href="/quote" 
              size="lg"
              className="magnetic-button bg-background text-foreground hover:bg-background/90"
            >
              Request a Quote
            </Button>
            <Button 
              href="https://cal.com" 
              variant="outline" 
              size="lg"
              className="magnetic-button border-background/30 text-background hover:bg-background/10"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Call
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
