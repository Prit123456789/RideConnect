import React, { useState, useEffect } from 'react'
import { User, CreditCard, Shield, RefreshCw } from 'lucide-react'
import { colors } from '../styles/colors'
import { Button } from './Button'
import { FeatureCard } from './FeatureCard'
import { supabase, checkSupabaseConnection, testNetworkConnectivity } from '../lib/supabaseClient'
import { EnvironmentVariableGuide } from './EnvironmentVariableGuide'

export const RiderDashboard: React.FC = () => {
  const [rideSearch, setRideSearch] = useState({
    startLocation: '',
    endLocation: '',
    preferredTime: ''
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [networkConnected, setNetworkConnected] = useState<boolean | null>(null)
  const [envVarsMissing, setEnvVarsMissing] = useState(false)

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

    // Check if environment variables are missing
    setEnvVarsMissing(!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  }

  useEffect(() => {
    checkConnection()
  }, [])

  const handleRideSearch = async () => {
    if (!isConnected) {
      setError('Unable to connect to the database. Please try again later.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase
        .from('ride_searches')
        .insert([
          { 
            start_location: rideSearch.startLocation,
            end_location: rideSearch.endLocation,
            preferred_time: rideSearch.preferredTime
          }
        ])

      if (error) throw error

      console.log('Ride search saved:', data)
      alert('Ride search submitted successfully!')
    } catch (error) {
      console.error('Error saving ride search:', error)
      setError('Failed to save ride search. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (envVarsMissing) {
    return <EnvironmentVariableGuide />
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
      <h2 className="text-2xl mb-6 font-bold text-text">Find a Ride</h2>
      
      <div className="space-y-4 mb-6">
        <input 
          type="text"
          placeholder="Start Location"
          value={rideSearch.startLocation}
          onChange={(e) => setRideSearch({ ...rideSearch, startLocation: e.target.value })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input 
          type="text"
          placeholder="End Location"
          value={rideSearch.endLocation}
          onChange={(e) => setRideSearch({ ...rideSearch, endLocation: e.target.value })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input 
          type="time"
          placeholder="Preferred Time"
          value={rideSearch.preferredTime}
          onChange={(e) => setRideSearch({ ...rideSearch, preferredTime: e.target.value })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Button 
          onClick={handleRideSearch}
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search Rides'}
        </Button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard 
          icon={<User className="text-primary" />} 
          title="Profile" 
          description="Manage your profile and settings" 
        />
        <FeatureCard 
          icon={<CreditCard className="text-primary" />} 
          title="Payments" 
          description="View payment history and methods" 
        />
        <FeatureCard 
          icon={<Shield className="text-primary" />} 
          title="Safety" 
          description="Emergency contacts and ride tracking" 
        />
      </div>
    </div>
  )
}

