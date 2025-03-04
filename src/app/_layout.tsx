import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@components/useColorScheme';
import { CartProvider } from '@providers/CartProvider';
import AuthProvider, { useAuth } from 'providers/AuthProvider';
import { ActivityIndicator, View } from 'react-native';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      setIsAppReady(true); // Mark app as ready once fonts are loaded
    }
  }, [fontsLoaded]);

  // Show nothing while fonts are loading or app is not ready
  if (!fontsLoaded || !isAppReady) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { isAdmin, session, loading } = useAuth();

  // Show a loading indicator while checking auth state
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Render the navigation stack
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <CartProvider>
        <Stack>
          {/* Redirect to sign-in page if there's no session */}
          {!session ? (
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
          ) : (
            <>
              {/* Redirect non-admin users to the home screen */}
              {!isAdmin && <Redirect href={'/'} />}
              <Stack.Screen name="(admin)" options={{ headerShown: false }} />
              <Stack.Screen name="(user)" options={{ headerShown: false }} />
              <Stack.Screen name="cart" options={{ presentation: 'modal' }} />
            </>
          )}
        </Stack>
      </CartProvider>
    </ThemeProvider>
  );
}