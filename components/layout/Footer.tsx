import Link from 'next/link'
import Container from '@/components/ui/Container'

const footerLinks = {
  company: [
    { label: 'Services', href: '/services' },
    { label: 'Work', href: '/work' },
    { label: 'Process', href: '/process' },
    { label: 'Get a Quote', href: '/quote' },
  ],
  services: [
    { label: 'Websites', href: '/services#websites' },
    { label: 'Web Apps', href: '/services#webapps' },
    { label: 'Automation', href: '/services#automation' },
    { label: 'Mobile & Platforms', href: '/services#platforms' },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative h-full border-t border-border bg-transparent">
      <div aria-hidden className="relative h-10 bg-gradient-to-b from-transparent to-transparent" />
      <Container className="relative">
        <div className="py-16 md:py-20">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {/* Brand Column */}
            <div className="md:col-span-5">
              <Link 
                href="/" 
                className="text-xl font-semibold tracking-tight inline-block mb-4"
              >
                TechBridge
              </Link>
              <p className="text-muted-foreground max-w-sm mb-6">
                Ship fast. Build clean. Automate operations. 
                We build software that removes manual work and helps businesses scale.
              </p>
              <p className="text-sm text-muted-foreground">
                hello@techbridge.dev
              </p>
            </div>

            {/* Links Columns */}
            <div className="md:col-span-3 md:col-start-7">
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="font-medium mb-4">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} TechBridge. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link 
                href="/privacy" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link 
                href="/terms" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
