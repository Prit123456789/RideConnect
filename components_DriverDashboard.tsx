import React, { useState, useEffect } from 'react'
import { Bell, Shield, CreditCard, RefreshCw } from 'lucide-react'
import { colors } from '../styles/colors'
import { Button } from './Button'
import { FeatureCard } from './FeatureCard'
import { supabase, checkSupabaseConnection, testNetworkConnectivity } from '../lib/supabaseClient'

export const DriverDashboard: React.FC = () => {
  const [rideOffer, setRideOffer] = useState({
    startLocation: '',
    endLocation: '',
    departureTime: '',
    availableSeats: 1
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [networkConnected, setNetworkConnected] = useState<boolean | null>(null)

  const checkConnection = async () => {
    setIsLoading(true)
    setError(null)
    
    const networkStatus = await testNetworkConnectivity()
    setNetworkConnected(networkStatus)
    
    if (!networkStatus) {
      setError('No internet connection. Please check your network settings.')
      setIsConnected(false)
      setIsLoading(false)
      return
    }

    const connected = await checkSupabaseConnection()
    setIsConnected(connected)
    if (!connected) {
      setError('Unable to connect to the database. Please try again later.')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    checkConnection()
  }, [])

  const handleRideOffer = async () => {
    if (!isConnected) {
      setError('Unable to connect to the database. Please try again later.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase
        .from('ride_offers')
        .insert([
          { 
            start_location: rideOffer.startLocation,
            end_location: rideOffer.endLocation,
            departure_time: rideOffer.departureTime,
            available_seats: rideOffer.availableSeats
          }
        ])

      if (error) throw error

      console.log('Ride offer saved:', data)
      alert('Ride offer successfully posted!')
    } catch (error) {
      console.error('Error saving ride offer:', error)
      setError('Failed to save ride offer. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isConnected === null || networkConnected === null) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl mb-6 font-bold text-text">Checking Connection...</h2>
        <p>Please wait while we check the connection to our servers.</p>
      </div>
    )
  }

  if (!networkConnected) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl mb-6 font-bold text-text">No Internet Connection</h2>
        <p className="text-red-500">Please check your network settings and try again.</p>
        <Button onClick={checkConnection} className="mt-4">
          <RefreshCw className="mr-2 h-4 w-4" /> Retry Connection
        </Button>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl mb-6 font-bold text-text">Unable to Connect to Database</h2>
        <p className="text-red-500">We're having trouble connecting to our servers. Please try again later.</p>
        <Button onClick={checkConnection} className="mt-4">
          <RefreshCw className="mr-2 h-4 w-4" /> Retry Connection
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl mb-6 font-bold text-text">Offer a Ride</h2>
      
      <div className="space-y-4 mb-6">
        <input 
          type="text"
          placeholder="Start Location"
          value={rideOffer.startLocation}
          onChange={(e) => setRideOffer({ ...rideOffer, startLocation: e.target.value })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input 
          type="text"
          placeholder="End Location"
          value={rideOffer.endLocation}
          onChange={(e) => setRideOffer({ ...rideOffer, endLocation: e.target.value })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input 
          type="time"
          placeholder="Departure Time"
          value={rideOffer.departureTime}
          onChange={(e) => setRideOffer({ ...rideOffer, departureTime: e.target.value })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="flex items-center">
          <label className="mr-2 text-text">Available Seats:</label>
          <input 
            type="number"
            min="1"
            max="4"
            value={rideOffer.availableSeats}
            onChange={(e) => setRideOffer({ ...rideOffer, availableSeats: parseInt(e.target.value) })}
            className="w-20 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <Button 
          onClick={handleRideOffer}
          fullWidth
          variant="secondary"
          disabled={isLoading}
        >
          {isLoading ? 'Posting Ride...' : 'Post Ride'}
        </Button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard 
          icon={<Bell className="text-secondary" />} 
          title="Notifications" 
          description="Ride requests and updates" 
        />
        <FeatureCard 
          icon={<Shield className="text-secondary" />} 
          title="Safety" 
          description="Emergency features and tracking" 
        />
        <FeatureCard 
          icon={<CreditCard className="text-secondary" />} 
          title="Earnings" 
          description="View payment history" 
        />
      </div>
    </div>
  )
}

