'use client'

import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'
import { Container, Section } from '@/components/ui'

const useCases = [
  {
    id: 'portals',
    title: 'Portals',
    description: 'Client and customer portals with secure access, document sharing, and self-service features.',
    icon: '⊞',
  },
  {
    id: 'dashboards',
    title: 'Dashboards',
    description: 'Real-time analytics, KPI tracking, and data visualization for informed decision-making.',
    icon: '◧',
  },
  {
    id: 'quoting',
    title: 'Quoting & Intake',
    description: 'Automated quote generation, lead capture forms, and proposal management systems.',
    icon: '◨',
  },
  {
    id: 'automations',
    title: 'Automations',
    description: 'Workflow automation, data sync, notifications, and AI-powered task handling.',
    icon: '⟳',
  },
  {
    id: 'internal',
    title: 'Internal Tools',
    description: 'Custom admin panels, inventory systems, and team collaboration platforms.',
    icon: '⊡',
  },
]

export default function UseCases() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            once: true,
          },
        })
      }

      // Items animation with stagger
      if (itemsRef.current) {
        gsap.from(itemsRef.current.children, {
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemsRef.current,
            start: 'top 80%',
            once: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Section ref={sectionRef} id="use-cases">
      <Container>
        <div ref={headerRef} className="mb-12 md:mb-16">
          <p className="text-sm font-medium text-accent uppercase tracking-wider mb-4">
            Use Cases
          </p>
          <h2 className="text-headline-sm md:text-headline font-semibold tracking-tight max-w-2xl">
            Common problems we solve.
          </h2>
        </div>

        <div ref={itemsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase) => (
            <div 
              key={useCase.id} 
              className="group p-6 rounded-xl border border-border bg-muted/30 hover:bg-muted/60 hover:border-accent/30 transition-all duration-300"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {useCase.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors duration-300">
                {useCase.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
