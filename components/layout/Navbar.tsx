'use client'

import { useState, useEffect, useCallback } from 'react'
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
  const [scrollState, setScrollState] = useState<'top' | 'scrolled'>('top')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true) // Start visible

  // Handle scroll state
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    const heroHeight = window.innerHeight * 0.7
    
    if (scrollY > heroHeight) {
      setScrollState('scrolled')
    } else {
      setScrollState('top')
    }
  }, [])

  useEffect(() => {
    // Show navbar after a delay (for intro animation)
    const introPlayed = sessionStorage.getItem('introPlayed')
    const delay = introPlayed ? 100 : 3000
    
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    // Scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

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

  const isCompact = scrollState === 'scrolled'

  return (
    <>
      <header
        className={`fixed z-50 transition-all duration-500 ${
          isCompact 
            ? 'top-4 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2' 
            : 'top-0 left-0 right-0'
        }`}
      >
        <div className={`transition-all duration-500 ${
          isCompact 
            ? 'bg-background/80 backdrop-blur-xl border border-border/50 rounded-full shadow-lg md:px-2' 
            : 'bg-transparent'
        }`}>
          <Container className={isCompact ? 'px-4 md:px-6' : ''}>
            <nav className={`flex items-center justify-between transition-all duration-500 ${
              isCompact ? 'h-14' : 'h-20'
            }`}>
              {/* Logo - hidden in compact mode on desktop */}
              <Link 
                href="/" 
                className={`font-semibold tracking-tight hover:text-accent transition-all duration-300 ${
                  isCompact ? 'text-lg md:hidden' : 'text-xl'
                }`}
              >
                TechBridge
              </Link>

              {/* Desktop Navigation */}
              <div className={`hidden md:flex items-center ${isCompact ? 'gap-1' : 'gap-8'}`}>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 ${
                      isCompact 
                        ? 'text-sm px-4 py-2 rounded-full hover:bg-muted' 
                        : 'text-sm relative group'
                    }`}
                  >
                    {item.label}
                    {!isCompact && (
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
                    )}
                  </Link>
                ))}
                
                {/* CTA in compact nav */}
                <Link
                  href="/quote"
                  className={`font-medium transition-all duration-300 ${
                    isCompact 
                      ? 'text-sm px-5 py-2 rounded-full bg-foreground text-background hover:bg-foreground/90 ml-2' 
                      : 'hidden'
                  }`}
                >
                  Get a Quote
                </Link>
              </div>

              {/* Desktop CTA - only when not compact */}
              {!isCompact && (
                <div className="hidden md:block">
                  <Button href="/quote" size="sm">
                    Get a Quote
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden relative w-10 h-10 flex items-center justify-center"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <div className="flex flex-col gap-1.5">
                  <span
                    className={`block w-6 h-0.5 bg-foreground origin-center transition-transform duration-200 ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
                  />
                  <span
                    className={`block w-6 h-0.5 bg-foreground transition-opacity duration-200 ${
                      isMobileMenuOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`block w-6 h-0.5 bg-foreground origin-center transition-transform duration-200 ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}
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
                    transition={{ delay: index * 0.08, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-4 text-3xl font-medium hover:text-accent transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
              >
                <Link 
                  href="/quote" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center font-medium rounded-full bg-foreground text-background hover:opacity-90 h-14 px-10 text-base w-full transition-opacity duration-300"
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
