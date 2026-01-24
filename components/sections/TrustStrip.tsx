'use client'

import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'
import { Container } from '@/components/ui'

const techStack = [
  { name: 'Next.js', description: 'React Framework' },
  { name: 'Supabase', description: 'Backend & Auth' },
  { name: 'Stripe', description: 'Payments' },
  { name: 'Automation', description: 'Workflows' },
]

export default function TrustStrip() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion() || !itemsRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(itemsRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-10 border-y border-border bg-muted/30">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
            Built with modern tools
          </p>
          <div ref={itemsRef} className="flex flex-wrap items-center justify-center gap-8 md:gap-10">
            {techStack.map((item) => (
              <div 
                key={item.name} 
                className="text-center md:text-left"
              >
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
