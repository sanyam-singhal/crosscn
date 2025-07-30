import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { twMerge } from 'tailwind-merge';

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
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isMobile = width < 768; // md breakpoint
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  // Ensure the sidebar state adapts to window size changes
  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);



  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View
      style={{ width: isCollapsed ? 80 : 256 }}
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

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        {items.map((item) => {
          const isActive = activeHref === item.href;
          return (
            <Pressable
              key={item.name}
              onPress={() => router.push(item.href as any)}
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
                    'text-foreground dark:text-foreground-dark',
                    props.iconClassName,
                    isActive && twMerge('text-primary dark:text-primary-dark', props.activeIconClassName)
                  ),
                })}
              </View>
              {!isCollapsed && (
                <Text
                  className={twMerge(
                    'text-foreground ml-4 font-medium dark:text-foreground-dark',
                    props.textClassName,
                    isActive && twMerge('text-primary dark:text-primary-dark', props.activeTextClassName)
                  )}
                >
                  {item.name}
                </Text>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export { Sidebar };
