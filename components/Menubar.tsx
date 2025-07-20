import * as React from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { twMerge } from 'tailwind-merge';

// Per shadcn/ui, Menubar is a web-only component.
// It will render null on native platforms.

const Menubar = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  if (Platform.OS !== 'web') return null;

  return (
    <View
      ref={ref}
      className={twMerge(
        'flex flex-row items-center space-x-1 rounded-md border bg-background p-1',
        className
      )}
      {...props}
    />
  );
});
Menubar.displayName = 'Menubar';

const MenubarMenu = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>((props, ref) => {
  if (Platform.OS !== 'web') return null;
  return <View ref={ref} {...props} />;
});
MenubarMenu.displayName = 'MenubarMenu';

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ className, ...props }, ref) => {
  if (Platform.OS !== 'web') return null;

  return (
    <Pressable
      ref={ref}
      className={twMerge(
        'flex-1 justify-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground',
        className
      )}
      {...props}
    />
  );
});
MenubarTrigger.displayName = 'MenubarTrigger';

const MenubarContent = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  if (Platform.OS !== 'web') return null;

  return (
    <View
      ref={ref}
      className={twMerge(
        'z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
        className
      )}
      {...props}
    />
  );
});
MenubarContent.displayName = 'MenubarContent';

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => {
  if (Platform.OS !== 'web') return null;

  return (
    <Pressable
      ref={ref}
      className={twMerge(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground',
        inset && 'pl-8',
        className
      )}
      {...props}
    />
  );
});
MenubarItem.displayName = 'MenubarItem';

const MenubarSeparator = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  if (Platform.OS !== 'web') return null;

  return <View ref={ref} className={twMerge('-mx-1 my-1 h-px bg-muted', className)} {...props} />;
});
MenubarSeparator.displayName = 'MenubarSeparator';

const MenubarShortcut = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => {
  if (Platform.OS !== 'web') return null;

  return (
    <Text
      ref={ref}
      className={twMerge('ml-auto text-xs tracking-widest text-muted-foreground', className)}
      {...props}
    />
  );
});
MenubarShortcut.displayName = 'MenubarShortcut';

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
};
