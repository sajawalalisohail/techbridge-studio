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
    default: 'py-section',
    sm: 'py-section-sm',
    xs: 'py-section-xs',
  }

  return (
    <section id={id} className={`${sizeClasses[size]} ${className}`}>
      {children}
    </section>
  )
}
