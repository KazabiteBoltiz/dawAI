import { createClient } from '@supabase/supabase-js';

// Load Supabase config from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// Create and export the Supabase client
export const supabase = createClient(
    supabaseUrl, 
    supabaseAnonKey,
    {
        global: {
            fetch: (url: any, options = {}) => {
                return fetch(url, { ...options, cache: 'no-store' });
            }
        }
    }
);

export async function getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error("Error fetching user:", error.message);
      return null;
    }
  
    return data?.user; // Returns the user object
}

export async function googleLogin() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
    })
    console.log(data, error)
}

export async function googleLogout() {
    await supabase.auth.signOut()
}