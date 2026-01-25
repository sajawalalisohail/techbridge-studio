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
    <footer className="relative overflow-hidden border-t border-border bg-[color:var(--surface)]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-[-30%] right-[-10%] h-[360px] w-[360px] rounded-full bg-[rgb(var(--accent-glow-rgb)/0.12)] blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/10 to-background/30" />
      </div>
      <div aria-hidden className="relative h-10 bg-gradient-to-b from-transparent to-[color:var(--surface)]" />
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
