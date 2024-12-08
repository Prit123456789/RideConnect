import React, { useState } from 'react'
import { Menu } from 'lucide-react'
import { colors } from './styles/colors'
import { Button } from './components/Button'
import { UserTypeSelection } from './components/UserTypeSelection'
import { RiderDashboard } from './components/RiderDashboard'
import { DriverDashboard } from './components/DriverDashboard'

const RideShareApp: React.FC = () => {
  const [userType, setUserType] = useState<'rider' | 'driver' | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">RideConnect</h1>
          {isLoggedIn && (
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => setUserType(null)}
              >
                Switch Mode
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => setIsLoggedIn(false)}
              >
                Logout
              </Button>
            </div>
          )}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu />
          </button>
        </div>
      </header>

      {isMobileMenuOpen && isLoggedIn && (
        <div className="md:hidden bg-primary text-white p-4">
          <Button 
            fullWidth 
            variant="outline" 
            className="mb-2"
            onClick={() => {
              setUserType(null)
              setIsMobileMenuOpen(false)
            }}
          >
            Switch Mode
          </Button>
          <Button 
            fullWidth 
            variant="secondary"
            onClick={() => {
              setIsLoggedIn(false)
              setIsMobileMenuOpen(false)
            }}
          >
            Logout
          </Button>
        </div>
      )}

      <main className="flex-grow container mx-auto p-4">
        {!isLoggedIn && (
          <UserTypeSelection 
            onSelectUserType={setUserType} 
            onLogin={() => setIsLoggedIn(true)}
          />
        )}

        {isLoggedIn && userType === 'rider' && (
          <RiderDashboard />
        )}

        {isLoggedIn && userType === 'driver' && (
          <DriverDashboard />
        )}
      </main>

      <footer className="bg-text text-white p-4 text-center">
        <p>&copy; 2023 RideConnect. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default RideShareApp

