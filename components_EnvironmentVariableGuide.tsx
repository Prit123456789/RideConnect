import React from 'react'
import { AlertTriangle } from 'lucide-react'

export const EnvironmentVariableGuide: React.FC = () => {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
      <div className="flex items-center mb-2">
        <AlertTriangle className="mr-2" />
        <h2 className="font-bold">Environment Variables Not Set</h2>
      </div>
      <p className="mb-2">
        It looks like your Supabase environment variables are not set up correctly. Please follow these steps:
      </p>
      <ol className="list-decimal list-inside mb-2">
        <li>Create a <code>.env.local</code> file in the root of your project if it doesn't exist.</li>
        <li>Add the following lines to your <code>.env.local</code> file:</li>
      </ol>
      <pre className="bg-yellow-200 p-2 rounded mb-2">
        NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
        NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
      </pre>
      <p className="mb-2">
        Replace <code>your_supabase_project_url</code> and <code>your_supabase_anon_key</code> with your actual Supabase project URL and anonymous key.
      </p>
      <p>
        You can find these values in your Supabase project settings. After adding these variables, restart your development server.
      </p>
    </div>
  )
}

