import { ReactNode, forwardRef, CSSProperties } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  size?: 'default' | 'sm' | 'xs'
  id?: string
  style?: CSSProperties
}

const Section = forwardRef<HTMLElement, SectionProps>(({
  children,
  className = '',
  size = 'default',
  id,
  style
}, ref) => {
  const sizeClasses = {
    default: 'py-16 md:py-24 lg:py-28',
    sm: 'py-12 md:py-20 lg:py-24',
    xs: 'py-10 md:py-16',
  }

  return (
    <section ref={ref} id={id} style={style} className={`${sizeClasses[size]} ${className}`}>
      {children}
    </section>
  )
})

Section.displayName = 'Section'

export default Section
