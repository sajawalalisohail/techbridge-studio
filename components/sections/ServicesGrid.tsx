'use client'

import { Container, Section, Card, CardTitle, CardDescription, Button, Reveal, StaggerContainer, StaggerItem } from '@/components/ui'

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
  return (
    <Section id="services">
      <Container>
        <div className="mb-16">
          <Reveal>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              What We Build
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-headline-sm md:text-headline font-semibold tracking-tight">
              Four ways to work together.
            </h2>
          </Reveal>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <Card className="h-full flex flex-col" padding="lg">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{service.icon}</span>
                  <span className="text-xs font-medium text-muted-foreground bg-background px-3 py-1 rounded-full border border-border">
                    Tier {service.tier}
                  </span>
                </div>
                <CardTitle className="mb-3">{service.title}</CardTitle>
                <CardDescription className="mb-6 flex-1">
                  {service.description}
                </CardDescription>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 bg-foreground rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-border mt-auto">
                  <p className="font-semibold">{service.price}</p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal delay={0.3}>
          <div className="mt-12 text-center">
            <Button href="/services" variant="outline">
              View All Services
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
