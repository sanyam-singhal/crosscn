import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';
import { twMerge } from 'tailwind-merge';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  items: SidebarItem[];
  activeHref: string;
  className?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  textClassName?: string;
  activeTextClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
  activeIconClassName?: string;
  collapseButtonClassName?: string;
}

const Sidebar = ({ items, activeHref, ...props }: SidebarProps) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768; // md breakpoint
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  // Ensure the sidebar state adapts to window size changes
  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  const sidebarWidth = useSharedValue(isCollapsed ? 80 : 256);

  useEffect(() => {
    sidebarWidth.value = withTiming(isCollapsed ? 80 : 256, { duration: 200 });
  }, [isCollapsed, sidebarWidth]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: sidebarWidth.value,
    };
  });

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Animated.View
      style={animatedStyle}
      className={twMerge('bg-card border-r border-border p-4 flex-col dark:bg-card-dark dark:border-border-dark', props.className)}
    >
      <View className="flex-row items-center justify-between mb-4">
        {!isCollapsed && <Text className="text-lg font-semibold text-foreground dark:text-foreground-dark">Components</Text>}
        <Pressable
          onPress={toggleSidebar}
          className={twMerge(
            'flex-row items-center justify-center p-2 rounded-lg',
            props.collapseButtonClassName
          )}
        >
          <Feather name={isCollapsed ? 'menu' : 'x'} size={20} className="text-muted-foreground dark:text-muted-foreground-dark" />
        </Pressable>
      </View>

      <View className="flex-1">
        {items.map((item) => {
          const isActive = activeHref === item.href;
          return (
            <Link href={item.href as any} asChild key={item.name}>
              <Pressable
                className={twMerge(
                  'flex-row items-center p-2 rounded-lg mb-2',
                  props.itemClassName,
                  isActive && twMerge('bg-primary/10 dark:bg-primary-dark/10', props.activeItemClassName)
                )}
              >
                <View className={twMerge('w-8 items-center', props.iconContainerClassName)}>
                  {React.cloneElement(item.icon as React.ReactElement, {
                    // @ts-ignore
                    className: twMerge(
                      'text-muted-foreground dark:text-muted-foreground-dark',
                      props.iconClassName,
                      isActive && twMerge('text-primary dark:text-primary-dark', props.activeIconClassName)
                    ),
                  })}
                </View>
                {!isCollapsed && (
                  <Text
                    className={twMerge(
                      'text-muted-foreground ml-4 font-medium dark:text-muted-foreground-dark',
                      props.textClassName,
                      isActive && twMerge('text-primary dark:text-primary-dark', props.activeTextClassName)
                    )}
                  >
                    {item.name}
                  </Text>
                )}
              </Pressable>
            </Link>
          );
        })}
      </View>
    </Animated.View>
  );
};

export { Sidebar };
