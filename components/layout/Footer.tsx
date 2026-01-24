'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
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
  const footerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return

    gsap.from(contentRef.current?.children || [], {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 85%',
        once: true,
      },
    })
  }, { scope: footerRef })

  return (
    <footer ref={footerRef} className="border-t border-border bg-muted/30 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-accent/5 to-transparent pointer-events-none" />
      
      <Container>
        <div ref={contentRef} className="py-16 md:py-20 relative">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {/* Brand Column */}
            <div className="md:col-span-5">
              <Link 
                href="/" 
                className="text-xl font-semibold tracking-tight inline-block mb-4 hover:text-accent transition-colors duration-300"
              >
                TechBridge
              </Link>
              <p className="text-muted-foreground max-w-sm mb-6">
                Ship fast. Build clean. Automate operations. 
                We build software that removes manual work and helps businesses scale.
              </p>
              <p className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300">
                <a href="mailto:hello@techbridge.dev">hello@techbridge.dev</a>
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
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
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
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
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
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Privacy
              </Link>
              <Link 
                href="/terms" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
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
