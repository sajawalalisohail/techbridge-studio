'use client'

import { Container, Button, Reveal } from '@/components/ui'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-28 md:pt-32 lg:pt-36 pb-16 md:pb-24">
      <Container>
        <div className="max-w-4xl">
          <Reveal>
            <h1 className="text-display-sm md:text-display font-semibold tracking-tight leading-[1.05] text-balance mb-6">
              We build software that
              <br />
              <span className="text-muted-foreground">works while you sleep.</span>
            </h1>
          </Reveal>
          
          <Reveal delay={0.1}>
            <p className="text-body-lg text-muted-foreground max-w-prose leading-relaxed mb-10">
              Ship fast. Build clean. Automate operations. From websites to AI workflows, 
              we create systems that remove manual work and help businesses scale.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button href="/quote" size="lg" className="w-full sm:w-auto">
                Request a Quote
              </Button>
              <Button 
                href="https://cal.com" 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Call
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
