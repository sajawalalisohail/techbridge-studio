'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

const navItems = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Process', href: '/process' },
]

export default function Navbar() {
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero || typeof IntersectionObserver === 'undefined') return

    observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting)
      },
      {
        root: null,
        threshold: 0.25,
      }
    )

    observerRef.current.observe(hero)
    return () => observerRef.current?.disconnect()
  }, [])

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
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="h-20" aria-hidden="true" />

        {/* State A: Full navbar (hero in view) */}
        <div
          className={`absolute inset-x-0 top-0 transition-all duration-300 ${
            isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
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
                className="md:hidden relative w-10 h-10 flex items-center justify-center"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <div className="flex flex-col gap-1.5">
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

        {/* State B: Compact boxed/pill navbar */}
        <div
          className={`absolute inset-x-0 top-3 transition-all duration-300 ${
            isHeroVisible ? 'opacity-0 -translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0'
          }`}
        >
          <Container>
            <nav className="mx-auto w-fit flex h-14 items-center justify-center rounded-full border border-border bg-background/80 px-5 md:px-7 backdrop-blur-sm shadow-sm">
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
                className="md:hidden relative w-9 h-9 flex items-center justify-center"
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
            className="fixed inset-0 z-40 bg-background md:hidden"
          >
            <Container className="pt-24 pb-8 h-full flex flex-col">
              <nav className="flex flex-col gap-2 flex-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
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
                transition={{ delay: 0.3 }}
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
