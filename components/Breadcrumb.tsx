import * as React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { Feather } from '@expo/vector-icons';

const Breadcrumb = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={twMerge('w-full', className)} {...props} />
));
Breadcrumb.displayName = 'Breadcrumb';

const BreadcrumbList = React.forwardRef<
  ScrollView,
  React.ComponentPropsWithoutRef<typeof ScrollView>
>(({ className, ...props }, ref) => (
  <ScrollView
    ref={ref}
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerClassName={twMerge('flex-row items-center gap-1.5', className)}
    {...props}
  />
));
BreadcrumbList.displayName = 'BreadcrumbList';

const BreadcrumbItem = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={twMerge('inline-flex items-center gap-1.5', className)} {...props} />
));
BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbLink = React.forwardRef<
  React.ComponentRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    children: React.ReactNode;
    textClassName?: string;
  }
>(({ className, textClassName, children, ...props }, ref) => (
  <Pressable ref={ref} {...props} className={className}>
    <Text
      className={twMerge(
        'text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
        textClassName
      )}
    >
      {children}
    </Text>
  </Pressable>
));
BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbPage = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={twMerge('text-sm font-medium text-foreground', className)}
    {...props}
  />
));
BreadcrumbPage.displayName = 'BreadcrumbPage';

const BreadcrumbSeparator = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & { iconClassName?: string }
>(({ className, iconClassName, ...props }, ref) => (
  <View ref={ref} className={className} {...props}>
    <Feather
      name="chevron-right"
      size={16}
      className={twMerge('text-muted-foreground', iconClassName)}
    />
  </View>
));
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

const BreadcrumbEllipsis = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & { iconClassName?: string }
>(({ className, iconClassName, ...props }, ref) => (
  <View
    ref={ref}
    className={twMerge('flex-row items-center justify-center', className)}
    {...props}
  >
    <Feather
      name="more-horizontal"
      size={16}
      className={twMerge('text-muted-foreground', iconClassName)}
    />
  </View>
));
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
