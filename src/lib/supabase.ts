import { createClient } from '@supabase/supabase-js'
import { type Database } from '@/types'

// Environment variable handling
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing required environment variables:\n' +
    '  NEXT_PUBLIC_SUPABASE_URL\n' +
    '  NEXT_PUBLIC_SUPABASE_ANON_KEY\n' +
    'Set these in your .env.local file.'
  )
}

// Browser client (with SSR support for Next.js App Router)
// Uses the anon key and is safe for client-side usage
// For SSR, we use getCookies() to pass session cookies
export function createBrowserClient() {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })
}

// Server client (for API routes and server components)
// Uses the service role key for admin operations
// This should only be used in secure server-side contexts
export function createServerClient() {
  if (!supabaseServiceRoleKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY is not set. ' +
      'This environment variable is required for server-side operations.'
    )
  }
  return createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
    },
  })
}

// Singleton pattern for browser client (maintains single instance across HMR)
let browserClient: ReturnType<typeof createBrowserClient> | null = null

export function getBrowserClient(): ReturnType<typeof createBrowserClient> {
  if (!browserClient || process.env.NODE_ENV === 'development') {
    browserClient = createBrowserClient()
  }
  return browserClient
}

// Singleton pattern for server client
let serverClient: ReturnType<typeof createServerClient> | null = null

export function getServerClient(): ReturnType<typeof createServerClient> {
  if (!serverClient) {
    serverClient = createServerClient()
  }
  return serverClient
}

// Export singleton instances for convenience
export const supabase = getBrowserClient()
export const supabaseAdmin = getServerClient()