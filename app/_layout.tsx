import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from '../components/Toast';
import { useColorScheme } from 'nativewind';

import '../global.css';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  // The 'useColorScheme' hook from NativeWind handles the theme.
  // We no longer need the ThemeProvider from @react-navigation/native.
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ToastProvider>
        <Stack screenOptions={{ 
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#00202E' : '#EFFFFD',
          },
          headerTintColor: colorScheme === 'dark' ? '#FFF9E6' : '#002D3C',
        }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="components" options={{ headerShown: false }} />
        </Stack>
      </ToastProvider>
    </GestureHandlerRootView>
  );
}