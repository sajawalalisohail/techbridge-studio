import { ReactNode, MouseEventHandler } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  padding?: 'default' | 'lg' | 'none'
  onClick?: MouseEventHandler<HTMLDivElement>
}

export default function Card({ 
  children, 
  className = '',
  hover = true,
  padding = 'default',
  onClick
}: CardProps) {
  const paddingStyles = {
    default: 'p-6 md:p-8',
    lg: 'p-8 md:p-10',
    none: '',
  }

  return (
    <div 
      className={`
        bg-muted border border-border/80 rounded-card
        ${paddingStyles[padding]}
        ${hover ? 'transition-all duration-300 ease-smooth hover:border-foreground/15 hover:shadow-md' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  )
}

interface CardTitleProps {
  children: ReactNode
  className?: string
  as?: 'h2' | 'h3' | 'h4'
}

export function CardTitle({ children, className = '', as: Tag = 'h3' }: CardTitleProps) {
  return (
    <Tag className={`text-title font-semibold ${className}`}>
      {children}
    </Tag>
  )
}

interface CardDescriptionProps {
  children: ReactNode
  className?: string
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return (
    <p className={`text-muted-foreground ${className}`}>
      {children}
    </p>
  )
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}
