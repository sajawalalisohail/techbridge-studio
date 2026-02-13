import { Metadata } from 'next'
import { Container, Section, Card, CardTitle, CardDescription, Button, Reveal, StaggerContainer, StaggerItem } from '@/components/ui'
import { FinalCTA } from '@/components/sections'

export const metadata: Metadata = {
  title: 'Services | TechBridge',
  description: 'From websites to AI automation, we build software that removes manual work and helps businesses scale.',
}

const services = [
  {
    id: 'websites',
    tier: 'A',
    title: 'Launch Websites',
    subtitle: 'Marketing sites, landing pages, portfolios',
    description: 'Fast, responsive websites that convert visitors into customers. Built with modern frameworks for performance and SEO.',
    features: [
      'Custom design tailored to your brand',
      'Mobile-first, responsive layouts',
      'SEO optimization and meta tags',
      'CMS integration (Sanity, Contentful, etc.)',
      'Analytics and conversion tracking',
      'Fast load times and Core Web Vitals',
    ],
    priceRange: '$2,500 – $8,000',
    timeline: '2-4 weeks',
    icon: '◈',
  },
  {
    id: 'webapps',
    tier: 'B',
    title: 'Systems & Web Apps',
    subtitle: 'Portals, dashboards, internal tools',
    description: 'Custom software that fits your workflow. From client portals to admin dashboards, we build systems that make your team more efficient.',
    features: [
      'User authentication and roles',
      'Database design and management',
      'API integrations (Stripe, Twilio, etc.)',
      'Admin panels and back-office tools',
      'Real-time features and notifications',
      'Data import/export capabilities',
    ],
    priceRange: '$12,000 – $40,000',
    timeline: '6-12 weeks',
    icon: '◇',
  },
  {
    id: 'automation',
    tier: 'C',
    title: 'Automation & AI Ops',
    subtitle: 'Workflows, integrations, AI agents',
    description: 'Remove manual work from your operations. We connect your tools, automate repetitive tasks, and deploy AI to handle the busy work.',
    features: [
      'Workflow automation (n8n, Make, Zapier)',
      'AI integrations (OpenAI, Claude, etc.)',
      'Data pipelines and sync',
      'Custom bots and agents',
      'Email and notification automation',
      'Reporting and analytics automation',
    ],
    priceRange: '$1,500 – $7,500 setup + monthly',
    timeline: '1-4 weeks',
    icon: '⬡',
  },
  {
    id: 'platforms',
    tier: 'D',
    title: 'Big Builds',
    subtitle: 'Mobile apps, SaaS, complex platforms',
    description: 'Full-scale product development for ambitious projects. Mobile apps, SaaS platforms, and complex systems that require deep technical expertise.',
    features: [
      'Mobile apps (iOS, Android, cross-platform)',
      'SaaS platform development',
      'Complex integrations and APIs',
      'Scalable cloud architecture',
      'Multi-tenant systems',
      'Payment processing and subscriptions',
    ],
    priceRange: 'Starting at $35,000',
    timeline: '3-6 months',
    icon: '⬢',
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-24 md:pt-32 pb-8 md:pb-12">
        <Container>
          <Reveal immediate>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Services
            </p>
          </Reveal>
          <Reveal immediate delay={0.1}>
            <h1 className="text-display-sm md:text-display font-semibold tracking-tight max-w-3xl mb-6">
              What we build.
            </h1>
          </Reveal>
          <Reveal immediate delay={0.2}>
            <p className="text-body-lg text-muted-foreground max-w-2xl">
              Four tiers of service, from simple websites to complex platforms.
              Each project is custom-scoped to your needs.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Services Detail */}
      <Section size="sm">
        <Container>
          <div className="space-y-24">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index * 0.1}>
                <div id={service.id} className="scroll-mt-24">
                  <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Info */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl">{service.icon}</span>
                        <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full border border-border">
                          Tier {service.tier}
                        </span>
                      </div>
                      <h2 className="text-headline-sm font-semibold mb-2">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        {service.subtitle}
                      </p>
                      <p className="text-muted-foreground mb-8">
                        {service.description}
                      </p>

                      <div className="flex flex-wrap gap-6 mb-8">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Investment</p>
                          <p className="font-semibold">{service.priceRange}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Timeline</p>
                          <p className="font-semibold">{service.timeline}</p>
                        </div>
                      </div>

                      <Button href="/quote">
                        Get a Quote
                      </Button>
                    </div>

                    {/* Features */}
                    <Card padding="lg">
                      <CardTitle className="mb-6">What&apos;s included</CardTitle>
                      <ul className="space-y-4">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
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

      {/* Custom Projects */}

      <FinalCTA />
    </>
  )
}
