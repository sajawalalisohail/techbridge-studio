import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  size?: 'default' | 'sm' | 'xs'
  id?: string
}

export default function Section({ 
  children, 
  className = '',
  size = 'default',
  id
}: SectionProps) {
  const sizeClasses = {
    default: 'py-16 md:py-24 lg:py-28',
    sm: 'py-12 md:py-20 lg:py-24',
    xs: 'py-10 md:py-16',
  }

  return (
    <section id={id} className={`${sizeClasses[size]} ${className}`}>
      {children}
    </section>
  )
}
