import { ReactNode, forwardRef } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  size?: 'default' | 'sm' | 'xs'
  id?: string
}

const Section = forwardRef<HTMLElement, SectionProps>(({ 
  children, 
  className = '',
  size = 'default',
  id
}, ref) => {
  const sizeClasses = {
    default: 'py-section',
    sm: 'py-section-sm',
    xs: 'py-section-xs',
  }

  return (
    <section ref={ref} id={id} className={`${sizeClasses[size]} ${className}`}>
      {children}
    </section>
  )
})

Section.displayName = 'Section'

export default Section
