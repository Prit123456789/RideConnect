import React from 'react'
import { colors } from '../styles/colors'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  fullWidth?: boolean
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyle = `px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${fullWidth ? 'w-full' : ''}`
  const variantStyles = {
    primary: `bg-primary text-white hover:bg-blue-600`,
    secondary: `bg-secondary text-white hover:bg-green-600`,
    outline: `border-2 border-primary text-primary hover:bg-primary hover:text-white`
  }

  return (
    <button 
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

