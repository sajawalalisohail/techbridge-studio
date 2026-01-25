'use client'

import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'
import { Container, Section, Card } from '@/components/ui'

const projects = [
  {
    id: '1',
    title: 'FinanceFlow Dashboard',
    description: 'A real-time financial analytics dashboard with automated reporting and AI-powered insights.',
    category: 'Web App',
    tags: ['Next.js', 'Supabase', 'AI'],
    color: 'from-blue-500/20 to-purple-500/20',
  },
  {
    id: '2',
    title: 'QuickQuote Platform',
    description: 'Automated quoting system that reduced proposal time by 80% for a construction company.',
    category: 'Automation',
    tags: ['Workflow', 'Integration', 'CRM'],
    color: 'from-green-500/20 to-teal-500/20',
  },
  {
    id: '3',
    title: 'Meridian Health Portal',
    description: 'Patient portal with appointment scheduling, records access, and secure messaging.',
    category: 'Portal',
    tags: ['Healthcare', 'Auth', 'HIPAA'],
    color: 'from-orange-500/20 to-red-500/20',
  },
]

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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

      // Cards animation with scale and fade
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            once: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Section ref={sectionRef} id="work" className="bg-muted/30">
      <Container>
        <div ref={headerRef} className="mb-12 md:mb-16">
          <p className="text-sm font-medium text-accent uppercase tracking-wider mb-4">
            Selected Work
          </p>
          <h2 className="text-headline-sm md:text-headline font-semibold tracking-tight">
            Sample builds from our studio.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl text-sm leading-relaxed">
            Representative examples of the systems we build. Each project is custom — 
            these showcase our approach and capabilities.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="group">
              <Card padding="none" className="overflow-hidden h-full">
                {/* Image Placeholder */}
                <div className={`aspect-[4/3] bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl opacity-20 group-hover:opacity-30 transition-opacity duration-300">◈</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-muted-foreground bg-background px-2 py-1 rounded-full border border-border">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-base mb-2 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
