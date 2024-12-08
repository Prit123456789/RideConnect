import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env.local file.')
  console.error('Ensure you have NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY set.')
}

// For development purposes only. In production, always use environment variables.
const devFallbackUrl = 'https://your-project-id.supabase.co'
const devFallbackKey = 'your-anon-key'

export const supabase = createClient(
  supabaseUrl || devFallbackUrl,
  supabaseAnonKey || devFallbackKey
)

export const checkSupabaseConnection = async () => {
  try {
    console.log('Attempting to connect to Supabase...')
    console.log('Supabase URL:', supabaseUrl || 'Not set (using fallback)')
    console.log('Supabase Anon Key:', supabaseAnonKey ? 'Set (hidden)' : 'Not set (using fallback)')

    const { data, error } = await supabase.from('ride_offers').select('count', { count: 'exact', head: true })
    
    if (error) {
      console.error('Supabase query error:', error)
      throw error
    }

    console.log('Supabase connection successful')
    return true
  } catch (error) {
    console.error('Supabase connection failed:', error)
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    return false
  }
}

export const testNetworkConnectivity = async () => {
  try {
    const response = await fetch('https://www.google.com')
    return response.ok
  } catch (error) {
    console.error('Network connectivity test failed:', error)
    return false
  }
}

