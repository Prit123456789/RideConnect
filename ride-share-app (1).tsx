import React, { useState } from 'react';
import { 
  MapPin, 
  User, 
  CreditCard, 
  Shield, 
  Bell, 
  Navigation, 
  Car,
  MapIcon
} from 'lucide-react';

// Color Theme Configuration
const THEME = {
  primary: '#1A73E8',     // Professional Blue
  secondary: '#34A853',   // Confident Green
  background: '#F5F7FA',  // Light Neutral Background
  text: '#2C3E50',        // Deep Slate Gray
  accent: '#4285F4',      // Bright Accent Blue
  white: '#FFFFFF'
};

// Main App Component
const RideShareApp = () => {
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSwitchMode = () => {
    setUserType(null);
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ 
        backgroundColor: THEME.background,
        color: THEME.text 
      }}
    >
      {/* Professional Header */}
      <header 
        className="px-6 py-4 shadow-md flex justify-between items-center"
        style={{ 
          backgroundColor: THEME.primary,
          color: THEME.white 
        }}
      >
        <div className="flex items-center space-x-3">
          <Car size={32} />
          <h1 className="text-2xl font-bold tracking-tight">RideConnect</h1>
        </div>
        
        {isLoggedIn && (
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleSwitchMode} 
              className="px-4 py-2 rounded-md transition-all duration-300"
              style={{
                backgroundColor: THEME.white,
                color: THEME.primary,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              Switch Mode
            </button>
          </div>
        )}
      </header>

      {/* Adaptive Content Area */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {/* User Type Selection */}
        {!isLoggedIn || !userType ? (
          <UserTypeSelection 
            onSelectUserType={(type) => {
              setUserType(type);
              setIsLoggedIn(true);
            }} 
          />
        ) : null}

        {/* Rider Flow */}
        {isLoggedIn && userType === 'rider' && (
          <RiderDashboard 
            onLogout={() => {
              setIsLoggedIn(false);
              setUserType(null);
            }} 
          />
        )}

        {/* Driver Flow */}
        {isLoggedIn && userType === 'driver' && (
          <DriverDashboard 
            onLogout={() => {
              setIsLoggedIn(false);
              setUserType(null);
            }} 
          />
        )}
      </main>
    </div>
  );
};

// User Type Selection Component
const UserTypeSelection = ({ onSelectUserType }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div 
        className="p-8 rounded-xl shadow-2xl text-center max-w-md w-full"
        style={{ 
          backgroundColor: THEME.white,
          border: `1px solid ${THEME.primary}20` 
        }}
      >
        <h2 
          className="text-3xl mb-8 font-semibold"
          style={{ color: THEME.text }}
        >
          Choose Your Role
        </h2>
        <div className="flex justify-center space-x-8">
          {/* Rider Selection */}
          <button 
            onClick={() => onSelectUserType('rider')}
            className="flex flex-col items-center p-6 rounded-lg transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: THEME.primary + '10',
              border: `2px solid ${THEME.primary}40`
            }}
          >
            <Navigation 
              size={64} 
              style={{ color: THEME.primary }}
              className="mb-4" 
            />
            <span 
              className="font-medium text-lg"
              style={{ color: THEME.text }}
            >
              Rider
            </span>
          </button>

          {/* Driver Selection */}
          <button 
            onClick={() => onSelectUserType('driver')}
            className="flex flex-col items-center p-6 rounded-lg transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: THEME.secondary + '10',
              border: `2px solid ${THEME.secondary}40`
            }}
          >
            <MapPin 
              size={64} 
              style={{ color: THEME.secondary }}
              className="mb-4" 
            />
            <span 
              className="font-medium text-lg"
              style={{ color: THEME.text }}
            >
              Driver
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Remaining components (RiderDashboard, DriverDashboard, FeatureCard) 
// would be similarly styled using the THEME constant
// ... [previous implementations can remain mostly the same, 
//      with color and styling updates using THEME]

// Each component would use the professional color palette and 
// add subtle hover and transition effects

export default RideShareApp;
