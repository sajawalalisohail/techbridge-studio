import { Container, Section, Button, Reveal } from '@/components/ui'

export default function FinalCTA() {
  return (
    <Section className="relative isolate overflow-hidden bg-foreground text-background">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-[-30%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-background/10 blur-3xl" />
            <div className="absolute right-[-10%] top-[15%] h-[320px] w-[320px] rounded-full bg-white/5 blur-3xl" />
          </div>
          <Reveal>
            <h2 className="text-headline-sm md:text-headline font-semibold tracking-tight mb-6">
              Ready to build something?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-background/75 text-body-lg mb-10">
              Tell us about your project. We&apos;ll get back to you within 24 hours 
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
                className="border-background/70 text-background bg-background/10 hover:bg-background/20"
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
