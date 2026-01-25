'use client'

import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'
import { Container, Section, Card, CardTitle, CardDescription, Button } from '@/components/ui'

const services = [
  {
    id: 'websites',
    tier: 'A',
    title: 'Launch Websites',
    description: 'Marketing sites, landing pages, and portfolios that convert. Fast, responsive, and optimized for search.',
    features: ['Custom design', 'Mobile-first', 'SEO optimized', 'CMS integration'],
    price: 'Starting at $2.5k',
    icon: '◈',
  },
  {
    id: 'webapps',
    tier: 'B',
    title: 'Systems & Web Apps',
    description: 'Portals, dashboards, and internal tools. Custom software that fits your workflow.',
    features: ['User authentication', 'Database design', 'API integrations', 'Admin panels'],
    price: 'Starting at $12k',
    icon: '◇',
  },
  {
    id: 'automation',
    tier: 'C',
    title: 'Automation & AI Ops',
    description: 'Remove manual work. Connect your tools, automate workflows, and let AI handle the repetitive stuff.',
    features: ['Workflow automation', 'AI integrations', 'Data pipelines', 'Custom bots'],
    price: 'Starting at $1.5k + monthly',
    icon: '⬡',
  },
  {
    id: 'platforms',
    tier: 'D',
    title: 'Big Builds',
    description: 'Mobile apps, SaaS platforms, and complex systems. Full-scale product development.',
    features: ['Mobile apps', 'SaaS platforms', 'Complex integrations', 'Scalable architecture'],
    price: 'Starting at $35k',
    icon: '⬢',
  },
]

export default function ServicesGrid() {
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

      // Cards animation - slide in from alternating sides
      if (cardsRef.current) {
        const cards = Array.from(cardsRef.current.children) as HTMLElement[]
        cards.forEach((card, index) => {
          const direction = index % 2 === 0 ? -50 : 50
          gsap.from(card, {
            opacity: 0,
            x: direction,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              once: true,
            },
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Section ref={sectionRef} id="services">
      <Container>
        <div ref={headerRef} className="mb-12 md:mb-16">
          <p className="text-sm font-medium text-accent uppercase tracking-wider mb-4">
            What We Build
          </p>
          <h2 className="text-headline-sm md:text-headline font-semibold tracking-tight">
            Four ways to work together.
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className="service-card h-full flex flex-col" 
              padding="lg"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-2xl">{service.icon}</span>
                <span className="text-xs font-medium text-muted-foreground bg-background px-3 py-1 rounded-full border border-border">
                  Tier {service.tier}
                </span>
              </div>
              <CardTitle className="mb-2 text-lg">{service.title}</CardTitle>
              <CardDescription className="mb-5 flex-1 text-sm">
                {service.description}
              </CardDescription>
              <ul className="space-y-1.5 mb-5">
                {service.features.map((feature) => (
                  <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-border mt-auto">
                <p className="font-semibold text-sm">{service.price}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/services" variant="outline">
            View All Services
          </Button>
        </div>
      </Container>
    </Section>
  )
}
