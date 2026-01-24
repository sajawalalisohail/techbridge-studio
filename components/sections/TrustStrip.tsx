'use client'

import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
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

  useGSAP(() => {
    if (prefersReducedMotion()) return

    const items = itemsRef.current?.children
    if (items) {
      gsap.from(items, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      })
    }
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="py-12 border-y border-border bg-muted/30 relative overflow-hidden">
      {/* Subtle gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
            Built with modern tools
          </p>
          <div ref={itemsRef} className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {techStack.map((item) => (
              <div 
                key={item.name} 
                className="text-center md:text-left group cursor-default"
              >
                <p className="font-medium group-hover:text-accent transition-colors duration-300">
                  {item.name}
                </p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
      
      {/* Subtle gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  )
}

export function ValuesStrip() {
  const values = [
    { name: 'Speed', description: 'Ship in weeks, not months' },
    { name: 'Clarity', description: 'No surprises, no scope creep' },
    { name: 'Quality', description: 'Production-ready code' },
    { name: 'Support', description: 'We stick around' },
  ]

  return (
    <section className="py-12 border-y border-border bg-muted/30">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {values.map((item) => (
            <div key={item.name} className="text-center">
              <p className="font-semibold text-lg mb-1">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
