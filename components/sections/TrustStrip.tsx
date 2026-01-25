import { Container, Section, Reveal, StaggerContainer, StaggerItem } from '@/components/ui'

const techStack = [
  { name: 'Next.js', description: 'React Framework' },
  { name: 'Supabase', description: 'Backend & Auth' },
  { name: 'Stripe', description: 'Payments' },
  { name: 'Automation', description: 'Workflows' },
]

const values = [
  { name: 'Speed', description: 'Ship in weeks, not months' },
  { name: 'Clarity', description: 'No surprises, no scope creep' },
  { name: 'Quality', description: 'Production-ready code' },
  { name: 'Support', description: 'We stick around' },
]

export default function TrustStrip() {
  return (
    <Section size="xs" className="border-y border-border bg-muted">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <Reveal>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
              Built with modern tools
            </p>
          </Reveal>
          <StaggerContainer className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {techStack.map((item) => (
              <StaggerItem key={item.name} className="text-center md:text-left">
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </Section>
  )
}

export function ValuesStrip() {
  return (
    <Section size="xs" className="border-y border-border bg-muted">
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
    </Section>
  )
}
