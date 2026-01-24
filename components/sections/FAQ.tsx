'use client'

import { Container, Section, Accordion, Reveal } from '@/components/ui'

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
  return (
    <Section id="faq">
      <Container size="sm">
        <div className="mb-12">
          <Reveal>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              FAQ
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-headline-sm md:text-headline font-semibold tracking-tight">
              Common questions.
            </h2>
          </Reveal>
        </div>

        <Accordion 
          items={faqItems.map(item => ({
            id: item.id,
            title: item.title,
            content: <p>{item.content}</p>,
          }))}
        />
      </Container>
    </Section>
  )
}
