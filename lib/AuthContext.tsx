'use client'

import { User } from '@supabase/supabase-js'; // Import User type
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './SupabaseClient';

const AuthContext = createContext<{ user: User | null; setUser: React.Dispatch<React.SetStateAction<User | null>> } | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null); // Allow both User and null

    useEffect(() => {
        const loadUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) console.error('Error fetching user:', error);
            setUser(user);
        };
        loadUser();
    
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                setUser(session?.user || null);
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
            }
        });
    
        return () => subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}
