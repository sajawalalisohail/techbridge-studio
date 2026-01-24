'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'
import { Container, Button } from '@/components/ui'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [introComplete, setIntroComplete] = useState(false)

  // Check if intro has played
  useEffect(() => {
    const checkIntro = () => {
      const introPlayed = sessionStorage.getItem('introPlayed')
      if (introPlayed || prefersReducedMotion()) {
        setIntroComplete(true)
      } else {
        // Wait for intro to complete (approximately 3.5s)
        const timer = setTimeout(() => setIntroComplete(true), 3500)
        return () => clearTimeout(timer)
      }
    }
    checkIntro()
  }, [])

  useGSAP(() => {
    if (!introComplete || prefersReducedMotion()) return

    // Initial state - hidden
    gsap.set([headlineRef.current, subheadRef.current, ctaRef.current], {
      opacity: 0,
      y: 60,
    })

    // Create timeline for hero entrance
    const tl = gsap.timeline({
      delay: 0.2, // Small delay after intro completes
    })

    // Animate headline
    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    })
    // Animate subhead (overlapping)
    .to(subheadRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.6')
    // Animate CTAs with bounce
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
    }, '-=0.4')

    // Parallax effect on scroll
    gsap.to(headlineRef.current, {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })

    gsap.to(subheadRef.current, {
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })

  }, { dependencies: [introComplete], scope: sectionRef })

  // If reduced motion, show content immediately
  const initialStyles = prefersReducedMotion() ? {} : { opacity: 0 }

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center pt-20 relative overflow-hidden"
    >
      <Container>
        <div className="max-w-4xl">
          <h1 
            ref={headlineRef}
            className="hero-headline text-display-sm md:text-display font-semibold tracking-tight text-balance mb-6"
            style={initialStyles}
          >
            We build software that
            <br />
            <span className="text-gradient-accent">works while you sleep.</span>
          </h1>
          
          <p 
            ref={subheadRef}
            className="hero-subhead text-body-lg text-muted-foreground max-w-2xl mb-10"
            style={initialStyles}
          >
            Ship fast. Build clean. Automate operations. From websites to AI workflows, 
            we create systems that remove manual work and help businesses scale.
          </p>

          <div 
            ref={ctaRef}
            className="hero-cta flex flex-col sm:flex-row gap-4"
            style={initialStyles}
          >
            <Button href="/quote" size="lg" className="magnetic-button">
              Request a Quote
            </Button>
            <Button 
              href="https://cal.com" 
              variant="outline" 
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-button"
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
