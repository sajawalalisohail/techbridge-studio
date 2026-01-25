'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { Container, Button } from '@/components/ui'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !headlineRef.current || !subheadRef.current || !ctaRef.current) return

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Show content immediately
      gsap.set([headlineRef.current, subheadRef.current, ctaRef.current], { opacity: 1, y: 0 })
      return
    }

    // Check if intro played (determines delay)
    const introPlayed = sessionStorage.getItem('introPlayed')
    const delay = introPlayed ? 0.1 : 2.8

    // Set initial state
    gsap.set([headlineRef.current, subheadRef.current, ctaRef.current], {
      opacity: 0,
      y: 40,
    })

    // Create timeline
    const tl = gsap.timeline({ delay })

    tl
      .to(headlineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
      .to(subheadRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.5')
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
      }, '-=0.4')

    return () => {
      tl.kill()
    }
  }, [isClient])

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center pt-20 pb-16 relative"
    >
      <Container>
        <div className="max-w-4xl">
          <h1 
            ref={headlineRef}
            className="text-display-sm md:text-display font-semibold tracking-tight text-balance mb-6"
            style={{ opacity: isClient ? undefined : 1 }}
          >
            We build software that
            <br />
            <span className="text-gradient-accent">works while you sleep.</span>
          </h1>
          
          <p 
            ref={subheadRef}
            className="text-body-lg text-muted-foreground max-w-2xl mb-10"
            style={{ opacity: isClient ? undefined : 1 }}
          >
            Ship fast. Build clean. Automate operations. From websites to AI workflows, 
            we create systems that remove manual work and help businesses scale.
          </p>

          <div 
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4"
            style={{ opacity: isClient ? undefined : 1 }}
          >
            <Button href="/quote" size="lg">
              Request a Quote
            </Button>
            <Button 
              href="https://cal.com" 
              variant="outline" 
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Call
            </Button>
          </div>
        </div>
      </Container>

      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
