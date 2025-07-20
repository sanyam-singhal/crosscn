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
  { name: 'Accordion', href: '/accordion', icon: <Feather name="list" size={20} /> },
  { name: 'Avatar', href: '/avatar', icon: <Feather name="user" size={20} /> },
  { name: 'Badge', href: '/badge', icon: <Feather name="tag" size={20} /> },
  { name: 'Buttons', href: '/buttons', icon: <Feather name="figma" size={20} /> },
  { name: 'Breadcrumb', href: '/breadcrumb', icon: <Feather name="chevron-right" size={20} /> },
  { name: 'Carousel', href: '/carousel', icon: <Feather name="film" size={20} /> },
  { name: 'Checkbox', href: '/checkbox', icon: <Feather name="check-square" size={20} /> },
  { name: 'Collapsible', href: '/collapsible', icon: <Feather name="chevrons-down" size={20} /> },
  { name: 'Date Picker', href: '/date-picker', icon: <Feather name="calendar" size={20} /> },
  { name: 'Dropdown Menu', href: '/dropdown-menu', icon: <Feather name="menu" size={20} /> },
  { name: 'Inputs', href: '/inputs', icon: <Feather name="type" size={20} /> },
  { name: 'Progress', href: '/progress', icon: <Feather name="activity" size={20} /> },
  { name: 'Radio Group', href: '/radio-group', icon: <Feather name="check-circle" size={20} /> },
  { name: 'Sheet', href: '/sheet', icon: <Feather name="sidebar" size={20} /> },
  { name: 'Skeleton', href: '/skeleton', icon: <Feather name="layout" size={20} /> },
  { name: 'Slider', href: '/slider', icon: <Feather name="sliders" size={20} /> },
  { name: 'Switch', href: '/switch', icon: <Feather name="toggle-right" size={20} /> },
  { name: 'Tabs', href: '/tabs-demo', icon: <Feather name="folder" size={20} /> },
  { name: 'Toast', href: '/toast', icon: <Feather name="bell" size={20} /> },
  { name: 'Tooltip', href: '/tooltip', icon: <Feather name="message-circle" size={20} /> },
  { name: 'Alert Dialog', href: '/alert-dialog', icon: <Feather name="alert-circle" size={20} /> },
];

export default function RootLayout() {
  let { colorScheme, toggleColorScheme } = useColorScheme();

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
                <Stack.Screen name="breadcrumb" />
                <Stack.Screen name="carousel" />
                <Stack.Screen name="dropdown-menu" />
                <Stack.Screen name="radio-group" />
                <Stack.Screen name="sheet" />
                <Stack.Screen name="tabs-demo" />
                <Stack.Screen name="slider" />
                <Stack.Screen name="accordion" />
                <Stack.Screen name="avatar" />
                <Stack.Screen name="badge" />
                <Stack.Screen name="progress" />
                <Stack.Screen name="switch" />
                <Stack.Screen name="alert-dialog" />
                <Stack.Screen name="collapsible" />
                <Stack.Screen name="date-picker" />
                <Stack.Screen name="skeleton" />
                <Stack.Screen name="tooltip" />
            </Stack>
          </View>
        </View>
      </ToastProvider>
  );
}