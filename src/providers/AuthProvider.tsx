import { Session } from '@supabase/supabase-js';
import { supabase } from 'lib/supabase';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

// Define a type for the profile object
type Profile = {
  id: string;
  group: string; // Add other fields as needed
};

type AuthData = {
  session: Session | null;
  profile: Profile | null; // Use the Profile type instead of `any`
  isAdmin: boolean;
  loading: boolean;
  setSession: (session: Session | null) => void;
  signOut: () => Promise<void>;
  setIsAdmin: (isAdmin: boolean) => void; // Add setIsAdmin
};

const AuthContext = createContext<AuthData>({
  session: null,
  profile: null,
  isAdmin: false,
  loading: true,
  setSession: () => {},
  signOut: async () => {},
  setIsAdmin: () => {}, // Default implementation for setIsAdmin
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null); // Use the Profile type
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);

        if (session) {
          // Fetch profile
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          setProfile(data || null);

          // Set isAdmin based on the profile data
          setIsAdmin(data?.group === "ADMIN");
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null); // Clear the session
      setIsAdmin(false); // Reset isAdmin on sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        profile,
        isAdmin: profile?.group === "ADMIN", // Ensure this is calculated dynamically
        loading,
        setSession,
        signOut,
        setIsAdmin, // Include setIsAdmin in the context value
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);