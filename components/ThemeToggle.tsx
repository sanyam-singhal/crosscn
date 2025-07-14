import React from 'react';
import { Pressable } from 'react-native';
import { useColorScheme } from 'nativewind';
import { Feather } from '@expo/vector-icons';
import { twMerge } from 'tailwind-merge';

interface ThemeToggleProps {
  className?: string;
  iconClassName?: string;
}

const ThemeToggle = ({ className, iconClassName }: ThemeToggleProps) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  return (
    <Pressable
      onPress={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
      className={twMerge(
        'absolute top-4 right-4 z-10 h-12 w-12 items-center justify-center rounded-full bg-card shadow-lg',
        className
      )}
    >
      <Feather
        name={colorScheme === 'dark' ? 'sun' : 'moon'}
        size={24}
        className={twMerge('text-foreground', iconClassName)}
      />
    </Pressable>
  );
};

export { ThemeToggle };
