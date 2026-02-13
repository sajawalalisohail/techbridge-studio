'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { useLenis } from '@/hooks/useLenis'

const navItems = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Process', href: '/process' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { lenis } = useLenis()
  // "isExpanded" maps to the previous "isHeroVisible" concept (Large Transparent Nav)
  // Default to true (expanded) at start
  const [isExpanded, setIsExpanded] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Reset mobile menu on route change
    setIsMobileMenuOpen(false)

    // On route change, reset to expanded (we scroll to top)
    setIsExpanded(true)

    // Function to check scroll position and update navbar state
    const checkScroll = () => {
      const scrollY = lenis ? lenis.scroll : window.scrollY
      setIsExpanded(scrollY < 50)
    }

    // Defer initial check to allow Lenis to complete scroll-to-top
    const timeoutId = setTimeout(checkScroll, 50)

    // Setup scroll listener
    const handleScroll = () => {
      checkScroll()
    }

    if (lenis) {
      lenis.on('scroll', handleScroll)
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    return () => {
      clearTimeout(timeoutId)
      if (lenis) {
        lenis.off('scroll', handleScroll)
      } else {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [lenis, pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      >
        <div className="h-20" aria-hidden="true" />

        {/* State A: Full navbar (Expanded) */}
        <div
          className={`absolute inset-x-0 top-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isExpanded ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
        >
          <Container>
            <nav className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link
                href="/"
                className="text-xl font-semibold tracking-tight hover:opacity-70 transition-opacity"
              >
                TechBridge
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Desktop CTA */}
              <div className="hidden md:block">
                <Button href="/quote" size="sm">
                  Get a Quote
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden relative w-10 h-10 flex items-center justify-center p-2 rounded-md hover:bg-muted/50 transition-colors pointer-events-auto"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <div className="flex flex-col gap-1.5 w-full items-center justify-center">
                  <motion.span
                    animate={{
                      rotate: isMobileMenuOpen ? 45 : 0,
                      y: isMobileMenuOpen ? 6 : 0,
                    }}
                    className="block w-6 h-0.5 bg-foreground origin-center"
                  />
                  <motion.span
                    animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                    className="block w-6 h-0.5 bg-foreground"
                  />
                  <motion.span
                    animate={{
                      rotate: isMobileMenuOpen ? -45 : 0,
                      y: isMobileMenuOpen ? -6 : 0,
                    }}
                    className="block w-6 h-0.5 bg-foreground origin-center"
                  />
                </div>
              </button>
            </nav>
          </Container>
        </div>

        {/* State B: Compact boxed/pill navbar (Collapsed) */}
        <div
          className={`absolute inset-x-0 top-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isExpanded ? 'opacity-0 -translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0 pointer-events-auto'
            }`}
        >
          <Container>
            <nav className="mx-auto w-fit flex h-14 items-center justify-center rounded-full border border-border bg-background/80 px-5 md:px-7 backdrop-blur-md shadow-sm">
              <div className="hidden md:flex items-center gap-6">
                <Link
                  href="/"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/quote"
                  className="text-sm font-medium text-foreground hover:opacity-80 transition-opacity"
                >
                  Get a Quote
                </Link>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden relative w-9 h-9 flex items-center justify-center pointer-events-auto"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <div className="flex flex-col gap-1.5">
                  <motion.span
                    animate={{
                      rotate: isMobileMenuOpen ? 45 : 0,
                      y: isMobileMenuOpen ? 6 : 0,
                    }}
                    className="block w-5 h-0.5 bg-foreground origin-center"
                  />
                  <motion.span
                    animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                    className="block w-5 h-0.5 bg-foreground"
                  />
                  <motion.span
                    animate={{
                      rotate: isMobileMenuOpen ? -45 : 0,
                      y: isMobileMenuOpen ? -6 : 0,
                    }}
                    className="block w-5 h-0.5 bg-foreground origin-center"
                  />
                </div>
              </button>
            </nav>
          </Container>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-background md:hidden"
          >
            <Container className="pt-24 pb-8 h-full flex flex-col">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center"
              >
                {/* Close Icon for internal menu context */}
                <div className="flex flex-col gap-0 items-center justify-center">
                  <span className="block w-6 h-0.5 bg-foreground rotate-45 translate-y-[2px]" />
                  <span className="block w-6 h-0.5 bg-foreground -rotate-45 -translate-y-[2px]" />
                </div>
              </button>

              <nav className="flex flex-col gap-2 flex-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0 }}
                >
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-4 text-3xl font-medium hover:text-muted-foreground transition-colors"
                  >
                    Home
                  </Link>
                </motion.div>
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 1) * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-4 text-3xl font-medium hover:text-muted-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/quote"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center font-medium transition-all duration-300 ease-smooth rounded-full bg-foreground text-background hover:opacity-90 h-14 px-10 text-base w-full"
                >
                  Get a Quote
                </Link>
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
