import React, { useEffect } from 'react';
import { Stack, useSegments } from 'expo-router';
import { View, Pressable } from 'react-native';
import { useColorScheme } from 'nativewind';
import { Sidebar } from '../components/Sidebar';
import { Feather } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { ToastProvider } from '../components/Toast';

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

export default function RootLayout() {
  let { colorScheme, toggleColorScheme } = useColorScheme();
  console.log(colorScheme);

  const segments = useSegments();
  const activeHref = `/${segments[segments.length - 1]}`;

  
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
      <ToastProvider>
        <View className="flex-1 flex-row bg-background dark:bg-background-dark">
          <Sidebar items={navItems} activeHref={activeHref} />
          <View className="flex-1">
          <Pressable
              onPress={() => toggleColorScheme()}
              className='absolute top-4 right-4 z-10 h-12 w-12 items-center justify-center rounded-full bg-card shadow-lg'>
              <Feather
                name={colorScheme === 'dark' ? 'sun' : 'moon'}
                size={24}
                className='text-foreground'
              />
            </Pressable>
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
      </ToastProvider>
  );
}