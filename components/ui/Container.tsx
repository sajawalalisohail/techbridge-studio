import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: 'default' | 'sm' | 'xs'
}

export default function Container({ 
  children, 
  className = '',
  size = 'default'
}: ContainerProps) {
  const sizeClasses = {
    default: 'max-w-container',
    sm: 'max-w-container-sm',
    xs: 'max-w-container-xs',
  }

  return (
    <div className={`mx-auto w-full px-6 md:px-8 lg:px-12 ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  )
}
