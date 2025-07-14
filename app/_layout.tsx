import React, { useEffect } from 'react';
import { Stack, useSegments } from 'expo-router';
import { View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { Sidebar } from '../components/Sidebar';
import { Feather } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from '../components/Toast';
import { ThemeToggle } from '../components/ThemeToggle';

import '../global.css';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const navItems = [
  { name: 'Buttons', href: '/buttons', icon: <Feather name="box" size={20} /> },
  { name: 'Inputs', href: '/inputs', icon: <Feather name="type" size={20} /> },
  { name: 'Checkbox', href: '/checkbox', icon: <Feather name="check-square" size={20} /> },
  { name: 'Toast', href: '/toast', icon: <Feather name="bell" size={20} /> },
  { name: 'Tabs', href: '/tabs-demo', icon: <Feather name="folder" size={20} /> },
];

function RootLayoutNav() {
  const segments = useSegments();
  const activeHref = `/${segments[segments.length - 1]}`;

  return (
    <View className="flex-1 flex-row bg-background">
      <Sidebar items={navItems} activeHref={activeHref} />
      <View className="flex-1">
        <ThemeToggle />
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="buttons" />
            <Stack.Screen name="inputs" />
            <Stack.Screen name="checkbox" />
            <Stack.Screen name="toast" />
            <Stack.Screen name="tabs-demo" />
        </Stack>
      </View>
    </View>
  );
}

export default function RootLayout() {
  // Subscribe the entire app to theme changes from the root.
  useColorScheme();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }} className="bg-background">
      <ToastProvider>
        <RootLayoutNav />
      </ToastProvider>
    </GestureHandlerRootView>
  );
}