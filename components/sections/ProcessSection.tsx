'use client'

import { useRef, useState } from 'react'
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'
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
  const headerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useGSAP(() => {
    if (prefersReducedMotion()) return

    // Header animation
    gsap.from(headerRef.current?.children || [], {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: headerRef.current,
        start: 'top 80%',
        once: true,
      },
    })

    // Progress line animation
    gsap.to(progressRef.current, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      },
    })

    // Step animations with ScrollTrigger
    const steps = gsap.utils.toArray<HTMLElement>('.process-step')
    
    steps.forEach((step, index) => {
      // Entrance animation
      gsap.from(step, {
        opacity: 0,
        x: -30,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 75%',
          once: true,
        },
      })

      // Active state tracking
      ScrollTrigger.create({
        trigger: step,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveStep(index),
        onEnterBack: () => setActiveStep(index),
      })
    })

  }, { scope: sectionRef })

  return (
    <Section ref={sectionRef} id="process" className="bg-muted/30 relative">
      <Container>
        <div ref={headerRef} className="mb-16">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
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
          <div className="space-y-16 md:space-y-24">
            {processSteps.map((step, index) => (
              <div 
                key={step.id} 
                className={`process-step relative pl-8 md:pl-20 transition-opacity duration-500 ${
                  index === activeStep ? 'is-active' : index < activeStep ? '' : 'is-inactive'
                }`}
              >
                {/* Step Dot */}
                <div className={`process-dot absolute left-0 md:left-8 -translate-x-1/2 w-4 h-4 rounded-full transition-all duration-500 ${
                  index <= activeStep 
                    ? 'bg-accent border-2 border-accent' 
                    : 'bg-background border-2 border-border'
                }`} />
                
                <div className="grid md:grid-cols-12 gap-6">
                  <div className="md:col-span-2">
                    <span className={`text-sm font-medium transition-colors duration-500 ${
                      index === activeStep ? 'text-accent' : 'text-muted-foreground'
                    }`}>
                      {step.id}
                    </span>
                  </div>
                  <div className="md:col-span-10">
                    <h3 className={`text-title font-semibold mb-3 transition-colors duration-500 ${
                      index === activeStep ? 'text-foreground' : ''
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 max-w-xl">
                      {step.description}
                    </p>
                    <ul className="flex flex-wrap gap-3">
                      {step.details.map((detail) => (
                        <li 
                          key={detail}
                          className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-500 ${
                            index === activeStep 
                              ? 'text-accent border-accent bg-accent/10' 
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
