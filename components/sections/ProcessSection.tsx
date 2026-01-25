'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'
import { Container, Section } from '@/components/ui'

const processSteps = [
  {
    id: '01',
    title: 'Discovery Sprint',
    description: 'We dig into your goals, constraints, and existing systems. No fluff — just the information we need to build the right thing.',
    details: ['Requirements gathering', 'Technical assessment', 'Scope definition'],
  },
  {
    id: '02',
    title: 'Design & Plan',
    description: 'We map out the architecture, design the interface, and create a clear roadmap. You see exactly what we\'re building before we write code.',
    details: ['Architecture design', 'UI/UX mockups', 'Project timeline'],
  },
  {
    id: '03',
    title: 'Build',
    description: 'We build in focused sprints with regular check-ins. You see progress weekly and can adjust as we go.',
    details: ['Agile development', 'Weekly demos', 'Iterative feedback'],
  },
  {
    id: '04',
    title: 'QA & Launch',
    description: 'Thorough testing, performance optimization, and a smooth deployment. We handle the technical details of going live.',
    details: ['Quality assurance', 'Performance tuning', 'Deployment'],
  },
  {
    id: '05',
    title: 'Support',
    description: 'We don\'t disappear after launch. Ongoing maintenance, updates, and support to keep your system running smoothly.',
    details: ['Bug fixes', 'Feature updates', 'Technical support'],
  },
]

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const headerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const triggersRef = useRef<ScrollTrigger[]>([])

  // Stable callback for setting active step
  const updateActiveStep = useCallback((index: number) => {
    setActiveStep(index)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            once: true,
          },
        })
      }

      // Progress line animation
      if (progressRef.current && containerRef.current) {
        const progressTrigger = ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 0.5,
          onUpdate: (self) => {
            gsap.set(progressRef.current, { scaleY: self.progress })
          }
        })
        triggersRef.current.push(progressTrigger)
      }

      // Step triggers
      stepsRef.current.forEach((step, index) => {
        if (!step) return

        // Entrance animation
        gsap.from(step, {
          opacity: 0,
          x: -20,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            once: true,
          },
        })

        // Active state tracking
        const stepTrigger = ScrollTrigger.create({
          trigger: step,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => updateActiveStep(index),
          onEnterBack: () => updateActiveStep(index),
        })
        triggersRef.current.push(stepTrigger)
      })
    }, sectionRef)

    // Refresh after fonts load
    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh()
      })
    }

    return () => {
      ctx.revert()
      triggersRef.current.forEach(t => t.kill())
      triggersRef.current = []
    }
  }, [updateActiveStep])

  return (
    <Section ref={sectionRef} id="process" className="bg-muted/50">
      <Container>
        <div ref={headerRef} className="mb-16">
          <p className="text-sm font-medium text-accent uppercase tracking-wider mb-4">
            Our Process
          </p>
          <h2 className="text-headline-sm md:text-headline font-semibold tracking-tight max-w-2xl">
            How we work together.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl">
            A clear, predictable process that keeps you informed and in control.
          </p>
        </div>

        <div ref={containerRef} className="relative">
          {/* Progress Line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border">
            <div 
              ref={progressRef}
              className="w-full bg-accent origin-top"
              style={{ 
                height: '100%',
                transform: 'scaleY(0)',
              }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 md:space-y-20">
            {processSteps.map((step, index) => (
              <div 
                key={step.id}
                ref={(el) => { stepsRef.current[index] = el }}
                className={`relative pl-8 md:pl-20 transition-opacity duration-300 ${
                  index === activeStep ? 'opacity-100' : 'opacity-50'
                }`}
              >
                {/* Step Dot */}
                <div className={`absolute left-0 md:left-8 -translate-x-1/2 w-3 h-3 rounded-full transition-all duration-300 ${
                  index <= activeStep 
                    ? 'bg-accent scale-125' 
                    : 'bg-border'
                }`}>
                  {index === activeStep && (
                    <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-30" />
                  )}
                </div>
                
                <div className="grid md:grid-cols-12 gap-4 md:gap-6">
                  <div className="md:col-span-2">
                    <span className={`text-sm font-mono transition-colors duration-300 ${
                      index === activeStep ? 'text-accent' : 'text-muted-foreground'
                    }`}>
                      {step.id}
                    </span>
                  </div>
                  <div className="md:col-span-10">
                    <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                      index === activeStep ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 max-w-xl text-sm leading-relaxed">
                      {step.description}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {step.details.map((detail) => (
                        <li 
                          key={detail}
                          className={`text-xs font-medium px-3 py-1 rounded-full border transition-all duration-300 ${
                            index === activeStep 
                              ? 'text-accent border-accent/50 bg-accent/10' 
                              : 'text-muted-foreground border-border bg-background'
                          }`}
                        >
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
