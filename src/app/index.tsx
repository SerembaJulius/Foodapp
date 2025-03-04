import { View, Text, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from 'providers/AuthProvider';
import { supabase } from 'lib/supabase';

const Index = () => {
  const { session, setSession, isAdmin, setIsAdmin } = useAuth(); // Destructure setIsAdmin
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading session
    const checkSession = async () => {
      setLoading(false); // Set loading to false after checking
    };
    checkSession();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={'/sign-in'} />;
  }

  if (!isAdmin) {
    return <Redirect href={'/(user)'} />;
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null); // Update session state to null
    setIsAdmin(false); // Reset isAdmin on sign out
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>
      <Button onPress={handleSignOut} text="Sign out" />
    </View>
  );
};

export default Index;