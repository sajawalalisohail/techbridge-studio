'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Container, Section, StaggerContainer, StaggerItem } from '@/components/ui'

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

function ProcessStep({
  step,
  isActive,
  setRef
}: {
  step: typeof processSteps[0],
  isActive: boolean,
  setRef: (el: HTMLDivElement | null) => void
}) {
  return (
    <StaggerItem
      className={`transition-all duration-500 ease-out ${isActive ? 'opacity-100 translate-x-3 scale-[1.02]' : 'opacity-30 grayscale-[0.5] scale-100'}`}
    >
      <div
        ref={setRef}
        className="relative pl-8 md:pl-20"
      >
        {/* Step Number */}
        <div
          className={`absolute left-0 md:left-8 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all duration-500 ${isActive
            ? 'bg-foreground border-foreground shadow-[0_0_15px_rgba(255,255,255,0.5)] scale-110'
            : 'bg-transparent border-muted-foreground/50 scale-100'
            }`}
        />

        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-2">
            <span className={`text-sm font-medium transition-colors duration-500 ${isActive ? 'text-accent' : 'text-muted-foreground'}`}>
              {step.id}
            </span>
          </div>
          <div className="md:col-span-10">
            <h3 className={`text-title font-semibold mb-3 transition-colors duration-500 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
              {step.title}
            </h3>
            <p className={`mb-4 max-w-xl transition-colors duration-500 ${isActive ? 'text-foreground/90' : 'text-muted-foreground'}`}>
              {step.description}
            </p>
            <ul className="flex flex-wrap gap-3">
              {step.details.map((detail) => (
                <li
                  key={detail}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-500 ${isActive
                    ? 'text-foreground/90 border-foreground/20 bg-background/50 backdrop-blur-sm'
                    : 'text-muted-foreground bg-transparent border-transparent'
                    }`}
                >
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </StaggerItem>
  )
}

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const [activeStepIndex, setActiveStepIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Smooth out the scroll progress
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001
  })

  useEffect(() => {
    let lastRun = 0
    const throttleDelay = 100 // ms

    const handleScroll = () => {
      const now = Date.now()
      if (now - lastRun < throttleDelay) return
      lastRun = now

      const viewportCenter = window.innerHeight / 2
      let closestIndex = 0
      let closestDistance = Infinity

      stepsRef.current.forEach((step, index) => {
        if (!step) return
        const rect = step.getBoundingClientRect()
        // Calculate distance from center of viewport to center of element
        const elementCenter = rect.top + rect.height / 2
        const distance = Math.abs(viewportCenter - elementCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      setActiveStepIndex(closestIndex)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Section id="process">
      <Container>
        <StaggerContainer className="mb-16">
          <StaggerItem>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Our Process
            </p>
          </StaggerItem>
          <StaggerItem>
            <h2 className="text-headline-sm md:text-headline font-semibold tracking-tight max-w-2xl">
              How we work together.
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              A clear, predictable process that keeps you informed and in control.
            </p>
          </StaggerItem>
        </StaggerContainer>

        <div ref={containerRef} className="relative">
          {/* Progress Line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border/30">
            <motion.div
              className="w-full bg-accent origin-top shadow-[0_0_10px_var(--accent)]"
              style={{
                scaleY,
                height: '100%',
              }}
            />
          </div>

          {/* Steps */}
          <StaggerContainer className="space-y-24 md:space-y-32 py-12">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={step.id}
                step={step}
                isActive={index === activeStepIndex}
                setRef={(el) => { stepsRef.current[index] = el }}
              />
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </Section>
  )
}
