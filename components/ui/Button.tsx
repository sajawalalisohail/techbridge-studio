import { ReactNode, ButtonHTMLAttributes, MouseEventHandler } from 'react'
import Link from 'next/link'

interface ButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  className?: string
  children: ReactNode
}

interface ButtonAsButtonProps extends ButtonBaseProps {
  href?: never
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  href: string
  target?: string
  rel?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps

export default function Button({
  children,
  variant = 'primary',
  size = 'default',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 ease-smooth rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
  
  const variantStyles = {
    primary: 'bg-foreground text-background hover:opacity-90',
    secondary: 'bg-muted text-foreground hover:bg-border',
    outline: 'border border-border bg-transparent hover:bg-muted',
    ghost: 'bg-transparent hover:bg-muted',
  }

  const sizeStyles = {
    default: 'h-12 px-8 text-sm',
    sm: 'h-10 px-6 text-sm',
    lg: 'h-14 px-10 text-base',
  }

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  if ('href' in props && props.href) {
    const { href, target, rel, onClick } = props as ButtonAsLinkProps
    return (
      <Link 
        href={href} 
        target={target}
        rel={rel}
        className={combinedClassName}
        onClick={onClick}
      >
        {children}
      </Link>
    )
  }

  const { type, disabled, onClick } = props as ButtonAsButtonProps
  return (
    <button 
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedClassName}
    >
      {children}
    </button>
  )
}
