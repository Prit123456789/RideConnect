import React from 'react'
import { colors } from '../styles/colors'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="border rounded-lg p-4 text-center hover:bg-background transition-colors duration-200">
      <div className="flex justify-center mb-2">
        {icon}
      </div>
      <h3 className="font-semibold text-text mb-1">{title}</h3>
      <p className="text-sm text-textLight">{description}</p>
    </div>
  )
}

