'use client'

import { Container, Section, Button, Reveal } from '@/components/ui'

export default function FinalCTA() {
  return (
    <Section className="bg-foreground text-background">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <h2 className="text-headline-sm md:text-headline font-semibold tracking-tight mb-6">
              Ready to build something?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-background/70 text-body-lg mb-10">
              Tell us about your project. We'll get back to you within 24 hours 
              with next steps.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="/quote" 
                size="lg"
                className="bg-background text-foreground hover:bg-background/90"
              >
                Request a Quote
              </Button>
              <Button 
                href="https://cal.com" 
                variant="outline" 
                size="lg"
                className="border-background/30 text-background hover:bg-background/10"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Call
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
