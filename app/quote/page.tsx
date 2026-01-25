import { Metadata } from 'next'
import { Container, Section, Reveal } from '@/components/ui'
import QuoteForm from './QuoteForm'

export const metadata: Metadata = {
  title: 'Get a Quote | TechBridge',
  description: 'Tell us about your project. We\'ll get back to you within 24 hours with a custom proposal.',
}

export default function QuotePage() {
  return (
    <>
      <Section className="pt-32 pb-16">
        <Container size="sm">
          <Reveal>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Get a Quote
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display-sm md:text-headline font-semibold tracking-tight mb-6">
              Tell us about your project.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-body-lg text-muted-foreground mb-12">
              Fill out the form below and we&apos;ll get back to you within 24 hours 
              with next steps and a preliminary estimate.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <QuoteForm />
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
