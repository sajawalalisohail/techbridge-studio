import { Metadata } from 'next'
import { Container, Section, Card, Reveal, StaggerContainer, StaggerItem } from '@/components/ui'
import { FinalCTA } from '@/components/sections'

export const metadata: Metadata = {
  title: 'Work | TechBridge',
  description: 'Sample builds from our studio. Representative examples of the websites, web apps, and automation systems we create.',
}

const projects = [
  {
    id: '1',
    title: 'FinanceFlow Dashboard',
    description: 'A real-time financial analytics dashboard with automated reporting and AI-powered insights. Built for a fintech startup to help their clients track portfolio performance.',
    category: 'Web App',
    tags: ['Next.js', 'Supabase', 'OpenAI', 'Charts'],
    color: 'from-blue-500/20 to-purple-500/20',
    features: [
      'Real-time data visualization',
      'AI-generated insights',
      'Automated PDF reports',
      'Multi-user access control',
    ],
  },
  {
    id: '2',
    title: 'QuickQuote Platform',
    description: 'Automated quoting system that reduced proposal time by 80% for a construction company. Integrates with their CRM and generates professional proposals automatically.',
    category: 'Automation',
    tags: ['n8n', 'Supabase', 'PDF Generation', 'CRM'],
    color: 'from-green-500/20 to-teal-500/20',
    features: [
      'Dynamic pricing calculator',
      'CRM integration',
      'Automated follow-ups',
      'E-signature support',
    ],
  },
  {
    id: '3',
    title: 'Meridian Health Portal',
    description: 'Patient portal with appointment scheduling, records access, and secure messaging. HIPAA-compliant system serving thousands of patients.',
    category: 'Portal',
    tags: ['Healthcare', 'Auth', 'HIPAA', 'Messaging'],
    color: 'from-orange-500/20 to-red-500/20',
    features: [
      'Secure patient login',
      'Appointment scheduling',
      'Document management',
      'Provider messaging',
    ],
  },
  {
    id: '4',
    title: 'Inventory Command',
    description: 'Internal inventory management system for a retail chain. Real-time stock tracking, automated reordering, and multi-location support.',
    category: 'Internal Tool',
    tags: ['React', 'PostgreSQL', 'Barcode', 'Reports'],
    color: 'from-violet-500/20 to-pink-500/20',
    features: [
      'Barcode scanning',
      'Low stock alerts',
      'Supplier management',
      'Sales analytics',
    ],
  },
  {
    id: '5',
    title: 'Luxe Properties',
    description: 'Marketing website for a luxury real estate agency. High-end design with property listings, virtual tours, and lead capture.',
    category: 'Website',
    tags: ['Next.js', 'CMS', 'SEO', 'Lead Gen'],
    color: 'from-amber-500/20 to-orange-500/20',
    features: [
      'Property search & filters',
      'Virtual tour integration',
      'Agent profiles',
      'Lead capture forms',
    ],
  },
  {
    id: '6',
    title: 'TaskFlow AI',
    description: 'AI-powered task management system that automatically categorizes, prioritizes, and assigns work items based on team capacity and deadlines.',
    category: 'SaaS',
    tags: ['AI', 'React Native', 'Supabase', 'Push'],
    color: 'from-cyan-500/20 to-blue-500/20',
    features: [
      'AI task categorization',
      'Smart scheduling',
      'Mobile app',
      'Team analytics',
    ],
  },
]

const categories = ['All', 'Web App', 'Automation', 'Portal', 'Internal Tool', 'Website', 'SaaS']

export default function WorkPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-32 pb-16">
        <Container>
          <Reveal>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Work
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display-sm md:text-display font-semibold tracking-tight max-w-3xl mb-6">
              Sample builds.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-body-lg text-muted-foreground max-w-2xl">
              Representative examples of the systems we build. Each project is custom — 
              these showcase our approach and capabilities.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Projects Grid */}
      <Section size="sm">
        <Container>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <StaggerItem key={project.id}>
                <Card padding="none" className="overflow-hidden group">
                  {/* Image Placeholder */}
                  <div className={`aspect-video bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-8xl opacity-10">◈</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-medium text-muted-foreground bg-background px-3 py-1 rounded-full border border-border">
                        {project.category}
                      </span>
                    </div>
                    <h2 className="font-semibold text-xl mb-3">
                      {project.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {project.description}
                    </p>
                    
                    {/* Features */}
                    <div className="mb-6">
                      <h3 className="text-sm font-medium mb-3">Key Features</h3>
                      <ul className="grid grid-cols-2 gap-2">
                        {project.features.map((feature) => (
                          <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-1 h-1 bg-foreground rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Note */}
      <Section size="sm" className="bg-muted/30">
        <Container size="sm">
          <div className="text-center">
            <Reveal>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Note:</strong> These are representative samples. 
                Due to NDAs and client privacy, we can&apos;t show all our work publicly. 
                We&apos;re happy to discuss relevant experience during our discovery call.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </>
  )
}
