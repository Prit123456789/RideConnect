import React from 'react'
import { Navigation, MapPin } from 'lucide-react'
import { colors } from '../styles/colors'
import { Button } from './Button'

interface UserTypeSelectionProps {
  onSelectUserType: (type: 'rider' | 'driver') => void
  onLogin: () => void
}

export const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({ onSelectUserType, onLogin }) => {
  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h2 className="text-3xl mb-6 font-bold text-text">Choose Your Role</h2>
        <div className="grid grid-cols-2 gap-6">
          <Button
            onClick={() => {
              onSelectUserType('rider')
              onLogin()
            }}
            className="flex flex-col items-center justify-center py-8"
          >
            <Navigation size={48} className="mb-4" />
            <span className="text-lg">Rider</span>
          </Button>
          <Button
            onClick={() => {
              onSelectUserType('driver')
              onLogin()
            }}
            className="flex flex-col items-center justify-center py-8"
            variant="secondary"
          >
            <MapPin size={48} className="mb-4" />
            <span className="text-lg">Driver</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

