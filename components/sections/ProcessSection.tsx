'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Container, Section, Reveal } from '@/components/ui'

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
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  return (
    <Section id="process" className="bg-muted/30">
      <Container>
        <div className="mb-16">
          <Reveal>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Our Process
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-headline-sm md:text-headline font-semibold tracking-tight max-w-2xl">
              How we work together.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              A clear, predictable process that keeps you informed and in control.
            </p>
          </Reveal>
        </div>

        <div ref={containerRef} className="relative">
          {/* Progress Line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border">
            <motion.div
              className="w-full bg-foreground origin-top"
              style={{ 
                scaleY: scrollYProgress,
                height: '100%',
              }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 md:space-y-24">
            {processSteps.map((step, index) => (
              <Reveal key={step.id} delay={index * 0.1}>
                <div className="relative pl-8 md:pl-20">
                  {/* Step Number */}
                  <div className="absolute left-0 md:left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-foreground" />
                  
                  <div className="grid md:grid-cols-12 gap-6">
                    <div className="md:col-span-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        {step.id}
                      </span>
                    </div>
                    <div className="md:col-span-10">
                      <h3 className="text-title font-semibold mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 max-w-xl">
                        {step.description}
                      </p>
                      <ul className="flex flex-wrap gap-3">
                        {step.details.map((detail) => (
                          <li 
                            key={detail}
                            className="text-xs font-medium text-muted-foreground bg-background px-3 py-1.5 rounded-full border border-border"
                          >
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
