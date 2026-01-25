import { Container, Section, Card, StaggerContainer, StaggerItem } from '@/components/ui'

const projects = [
  {
    id: '1',
    title: 'FinanceFlow Dashboard',
    description: 'A real-time financial analytics dashboard with automated reporting and AI-powered insights.',
    category: 'Web App',
    tags: ['Next.js', 'Supabase', 'AI'],
    image: '/projects/project-1.jpg',
    color: 'from-blue-500/20 to-purple-500/20',
  },
  {
    id: '2',
    title: 'QuickQuote Platform',
    description: 'Automated quoting system that reduced proposal time by 80% for a construction company.',
    category: 'Automation',
    tags: ['Workflow', 'Integration', 'CRM'],
    image: '/projects/project-2.jpg',
    color: 'from-green-500/20 to-teal-500/20',
  },
  {
    id: '3',
    title: 'Meridian Health Portal',
    description: 'Patient portal with appointment scheduling, records access, and secure messaging.',
    category: 'Portal',
    tags: ['Healthcare', 'Auth', 'HIPAA'],
    image: '/projects/project-3.jpg',
    color: 'from-orange-500/20 to-red-500/20',
  },
]

export default function SelectedWork() {
  return (
    <Section id="work" className="bg-muted">
      <Container>
        <StaggerContainer className="mb-16">
          <StaggerItem>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Selected Work
            </p>
          </StaggerItem>
          <StaggerItem>
            <h2 className="text-headline-sm md:text-headline font-semibold tracking-tight">
              Sample builds from our studio.
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              Representative examples of the systems we build. Each project is custom — 
              these showcase our approach and capabilities.
            </p>
          </StaggerItem>
        </StaggerContainer>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <Card padding="none" className="overflow-hidden group cursor-pointer">
                {/* Image Placeholder */}
                <div className={`aspect-[4/3] bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-20">◈</span>
                  </div>
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-muted-foreground bg-background px-2 py-1 rounded-full border border-border">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-muted-foreground transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-xs text-muted-foreground"
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
  )
}
