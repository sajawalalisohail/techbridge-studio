'use client'

import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'
import { Container, Section, Accordion } from '@/components/ui'

const faqItems = [
  {
    id: 'timeline',
    title: 'How long does a typical project take?',
    content: 'It depends on scope. A marketing website typically takes 2-4 weeks. Web apps range from 6-12 weeks. Complex platforms can take 3-6 months. We\'ll give you a clear timeline during discovery.',
  },
  {
    id: 'pricing',
    title: 'How does pricing work?',
    content: 'We work on fixed-price projects with clear milestones. You\'ll know the total cost upfront before we start. For ongoing work like automation maintenance, we offer monthly retainers.',
  },
  {
    id: 'process',
    title: 'What\'s your development process?',
    content: 'We follow an agile approach with weekly check-ins and demos. You\'ll see progress regularly and can provide feedback throughout. No surprises at the end.',
  },
  {
    id: 'tech',
    title: 'What technologies do you use?',
    content: 'We primarily work with Next.js, React, TypeScript, and Supabase for web projects. For mobile, we use React Native. Our automation stack includes n8n, Make, and custom integrations.',
  },
  {
    id: 'support',
    title: 'Do you offer ongoing support?',
    content: 'Yes. After launch, we offer maintenance packages that include bug fixes, security updates, and minor feature additions. We also offer hourly support for ad-hoc requests.',
  },
  {
    id: 'ownership',
    title: 'Who owns the code?',
    content: 'You do. Once the project is complete and paid for, you own all the code, designs, and assets. We can provide full documentation and handoff to your team if needed.',
  },
]

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const accordionRef = useRef<HTMLDivElement>(null)

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

      // Accordion animation
      if (accordionRef.current) {
        gsap.from(accordionRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: accordionRef.current,
            start: 'top 85%',
            once: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Section ref={sectionRef} id="faq">
      <Container size="sm">
        <div ref={headerRef} className="mb-10">
          <p className="text-sm font-medium text-accent uppercase tracking-wider mb-4">
            FAQ
          </p>
          <h2 className="text-headline-sm md:text-headline font-semibold tracking-tight">
            Common questions.
          </h2>
        </div>

        <div ref={accordionRef}>
          <Accordion 
            items={faqItems.map(item => ({
              id: item.id,
              title: item.title,
              content: <p className="text-sm leading-relaxed">{item.content}</p>,
            }))}
          />
        </div>
      </Container>
    </Section>
  )
}
