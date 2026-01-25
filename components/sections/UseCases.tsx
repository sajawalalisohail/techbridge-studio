import { Container, Section, StaggerContainer, StaggerItem } from '@/components/ui'

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
  return (
    <Section id="use-cases">
      <Container>
        <StaggerContainer className="mb-16">
          <StaggerItem>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Use Cases
            </p>
          </StaggerItem>
          <StaggerItem>
            <h2 className="text-headline-sm md:text-headline font-semibold tracking-tight max-w-2xl">
              Common problems we solve.
            </h2>
          </StaggerItem>
        </StaggerContainer>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase) => (
            <StaggerItem key={useCase.id}>
              <div className="group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {useCase.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {useCase.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {useCase.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  )
}
