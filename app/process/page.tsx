import { Metadata } from 'next'
import { Container, Section, Card, Reveal, StaggerContainer, StaggerItem } from '@/components/ui'
import { FinalCTA } from '@/components/sections'

export const metadata: Metadata = {
  title: 'Process | TechBridge',
  description: 'Our development process: Discovery, Design, Build, Launch, Support. A clear, predictable approach to building software.',
}

const processSteps = [
  {
    id: '01',
    title: 'Discovery Sprint',
    duration: '1-2 weeks',
    description: 'We start by understanding your business, goals, and constraints. No assumptions — just focused research to ensure we build the right thing.',
    activities: [
      'Stakeholder interviews',
      'Requirements documentation',
      'Technical assessment',
      'Competitive analysis',
      'Scope definition',
    ],
    deliverables: [
      'Project brief',
      'Technical specification',
      'Timeline and milestones',
      'Fixed-price quote',
    ],
  },
  {
    id: '02',
    title: 'Design & Plan',
    duration: '1-3 weeks',
    description: 'We design the user experience and system architecture before writing code. You\'ll see exactly what we\'re building and approve the direction.',
    activities: [
      'Information architecture',
      'Wireframing',
      'UI design',
      'Database schema design',
      'API planning',
    ],
    deliverables: [
      'Figma designs',
      'Interactive prototype',
      'Technical architecture',
      'Development roadmap',
    ],
  },
  {
    id: '03',
    title: 'Build',
    duration: '4-12 weeks',
    description: 'We build in focused sprints with regular check-ins. You\'ll see working software weekly and can provide feedback throughout development.',
    activities: [
      'Frontend development',
      'Backend development',
      'API integrations',
      'Database implementation',
      'Testing',
    ],
    deliverables: [
      'Weekly demos',
      'Progress reports',
      'Working staging environment',
      'Documentation',
    ],
  },
  {
    id: '04',
    title: 'QA & Launch',
    duration: '1-2 weeks',
    description: 'Thorough testing, performance optimization, and a smooth deployment. We handle the technical complexity of going live.',
    activities: [
      'Quality assurance testing',
      'Performance optimization',
      'Security review',
      'Deployment setup',
      'DNS and SSL configuration',
    ],
    deliverables: [
      'Production deployment',
      'Performance report',
      'Launch checklist',
      'Handoff documentation',
    ],
  },
  {
    id: '05',
    title: 'Support',
    duration: 'Ongoing',
    description: 'We don\'t disappear after launch. Ongoing maintenance, updates, and support to keep your system running smoothly.',
    activities: [
      'Bug fixes',
      'Security updates',
      'Performance monitoring',
      'Feature additions',
      'Technical support',
    ],
    deliverables: [
      'Monthly reports',
      'Uptime monitoring',
      'Priority support',
      'Quarterly reviews',
    ],
  },
]

const principles = [
  {
    title: 'Transparency',
    description: 'You\'ll always know where we are, what\'s next, and if anything changes.',
  },
  {
    title: 'Fixed Pricing',
    description: 'No hourly billing surprises. You know the total cost before we start.',
  },
  {
    title: 'Weekly Updates',
    description: 'Regular demos and check-ins keep you in the loop throughout.',
  },
  {
    title: 'Your Code',
    description: 'You own everything we build. Full access, full documentation.',
  },
]

export default function ProcessPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-32 pb-16">
        <Container>
          <Reveal>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Process
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display-sm md:text-display font-semibold tracking-tight max-w-3xl mb-6">
              How we work.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-body-lg text-muted-foreground max-w-2xl">
              A clear, predictable process that keeps you informed and in control. 
              No surprises, no scope creep, no disappearing acts.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Principles */}
      <Section size="xs" className="border-y border-border bg-muted">
        <Container>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {principles.map((principle) => (
              <StaggerItem key={principle.title}>
                <div>
                  <h3 className="font-semibold mb-2">{principle.title}</h3>
                  <p className="text-sm text-muted-foreground">{principle.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Process Steps */}
      <Section>
        <Container>
          <div className="space-y-24">
            {processSteps.map((step, index) => (
              <Reveal key={step.id} delay={index * 0.05}>
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                  {/* Step Info */}
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-5xl font-light text-muted-foreground/50">
                        {step.id}
                      </span>
                      <div>
                        <h2 className="text-title font-semibold">{step.title}</h2>
                        <p className="text-sm text-muted-foreground">{step.duration}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  {/* Activities & Deliverables */}
                  <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
                    <Card>
                      <h3 className="font-medium mb-4">Activities</h3>
                      <ul className="space-y-2">
                        {step.activities.map((activity) => (
                          <li key={activity} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-1 h-1 bg-foreground rounded-full" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </Card>
                    <Card>
                      <h3 className="font-medium mb-4">Deliverables</h3>
                      <ul className="space-y-2">
                        {step.deliverables.map((deliverable) => (
                          <li key={deliverable} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-1 h-1 bg-foreground rounded-full" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </>
  )
}
