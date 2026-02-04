'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'font-display font-bold rounded-xl transition-all duration-200'

  const variantClasses = {
    primary: 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-[0_0_20px_rgba(0,243,255,0.4)]',
    secondary: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-[0_0_20px_rgba(123,44,191,0.4)]',
    danger: 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-[0_0_20px_rgba(255,0,110,0.4)]'
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,243,255,0.6)' }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
