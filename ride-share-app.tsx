import React, { useState } from 'react';
import { 
  MapPin, 
  User, 
  CreditCard, 
  Shield, 
  Bell, 
  Navigation 
} from 'lucide-react';

// Main App Component
const RideShareApp = () => {
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* App Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">RideConnect</h1>
        {isLoggedIn && (
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setUserType(null)} 
              className="bg-white text-blue-600 px-3 py-1 rounded"
            >
              Switch Mode
            </button>
          </div>
        )}
      </header>

      {/* User Type Selection */}
      {!isLoggedIn && (
        <UserTypeSelection 
          onSelectUserType={setUserType} 
          onLogin={() => setIsLoggedIn(true)}
        />
      )}

      {/* Rider Flow */}
      {isLoggedIn && userType === 'rider' && (
        <RiderDashboard onLogout={() => setIsLoggedIn(false)} />
      )}

      {/* Driver Flow */}
      {isLoggedIn && userType === 'driver' && (
        <DriverDashboard onLogout={() => setIsLoggedIn(false)} />
      )}
    </div>
  );
};

// User Type Selection Component
const UserTypeSelection = ({ onSelectUserType, onLogin }) => {
  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl mb-6">Choose Your Role</h2>
        <div className="flex justify-center space-x-6">
          <button 
            onClick={() => {
              onSelectUserType('rider');
              onLogin();
            }}
            className="flex flex-col items-center p-4 border rounded hover:bg-blue-50"
          >
            <Navigation size={48} className="mb-2" />
            <span>Rider</span>
          </button>
          <button 
            onClick={() => {
              onSelectUserType('driver');
              onLogin();
            }}
            className="flex flex-col items-center p-4 border rounded hover:bg-blue-50"
          >
            <MapPin size={48} className="mb-2" />
            <span>Driver</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Rider Dashboard Component
const RiderDashboard = ({ onLogout }) => {
  const [rideSearch, setRideSearch] = useState({
    startLocation: '',
    endLocation: '',
    preferredTime: ''
  });

  const handleRideSearch = () => {
    // Implement ride matching logic
    console.log('Searching for rides:', rideSearch);
  };

  return (
    <div className="flex-grow container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl mb-4">Find a Ride</h2>
        
        {/* Ride Search Form */}
        <div className="space-y-4">
          <input 
            type="text"
            placeholder="Start Location"
            value={rideSearch.startLocation}
            onChange={(e) => setRideSearch({
              ...rideSearch, 
              startLocation: e.target.value
            })}
            className="w-full p-2 border rounded"
          />
          <input 
            type="text"
            placeholder="End Location"
            value={rideSearch.endLocation}
            onChange={(e) => setRideSearch({
              ...rideSearch, 
              endLocation: e.target.value
            })}
            className="w-full p-2 border rounded"
          />
          <input 
            type="time"
            placeholder="Preferred Time"
            value={rideSearch.preferredTime}
            onChange={(e) => setRideSearch({
              ...rideSearch, 
              preferredTime: e.target.value
            })}
            className="w-full p-2 border rounded"
          />
          <button 
            onClick={handleRideSearch}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Search Rides
          </button>
        </div>

        {/* Available Features */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <FeatureCard 
            icon={<User />} 
            title="Profile" 
            description="Manage your profile and settings" 
          />
          <FeatureCard 
            icon={<CreditCard />} 
            title="Payments" 
            description="View payment history and methods" 
          />
          <FeatureCard 
            icon={<Shield />} 
            title="Safety" 
            description="Emergency contacts and ride tracking" 
          />
        </div>
      </div>
      <button 
        onClick={onLogout}
        className="mt-4 w-full bg-red-500 text-white p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

// Driver Dashboard Component
const DriverDashboard = ({ onLogout }) => {
  const [rideOffer, setRideOffer] = useState({
    startLocation: '',
    endLocation: '',
    departureTime: '',
    availableSeats: 1
  });

  const handleRideOffer = () => {
    // Implement ride offering logic
    console.log('Offering ride:', rideOffer);
  };

  return (
    <div className="flex-grow container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl mb-4">Offer a Ride</h2>
        
        {/* Ride Offer Form */}
        <div className="space-y-4">
          <input 
            type="text"
            placeholder="Start Location"
            value={rideOffer.startLocation}
            onChange={(e) => setRideOffer({
              ...rideOffer, 
              startLocation: e.target.value
            })}
            className="w-full p-2 border rounded"
          />
          <input 
            type="text"
            placeholder="End Location"
            value={rideOffer.endLocation}
            onChange={(e) => setRideOffer({
              ...rideOffer, 
              endLocation: e.target.value
            })}
            className="w-full p-2 border rounded"
          />
          <input 
            type="time"
            placeholder="Departure Time"
            value={rideOffer.departureTime}
            onChange={(e) => setRideOffer({
              ...rideOffer, 
              departureTime: e.target.value
            })}
            className="w-full p-2 border rounded"
          />
          <div className="flex items-center">
            <label className="mr-2">Available Seats:</label>
            <input 
              type="number"
              min="1"
              max="4"
              value={rideOffer.availableSeats}
              onChange={(e) => setRideOffer({
                ...rideOffer, 
                availableSeats: parseInt(e.target.value)
              })}
              className="w-20 p-2 border rounded"
            />
          </div>
          <button 
            onClick={handleRideOffer}
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            Post Ride
          </button>
        </div>

        {/* Available Features */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <FeatureCard 
            icon={<Bell />} 
            title="Notifications" 
            description="Ride requests and updates" 
          />
          <FeatureCard 
            icon={<Shield />} 
            title="Safety" 
            description="Emergency features and tracking" 
          />
          <FeatureCard 
            icon={<CreditCard />} 
            title="Earnings" 
            description="View payment history" 
          />
        </div>
      </div>
      <button 
        onClick={onLogout}
        className="mt-4 w-full bg-red-500 text-white p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

// Reusable Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="border rounded p-4 text-center hover:bg-gray-50">
      <div className="flex justify-center mb-2 text-blue-600">
        {icon}
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default RideShareApp;
