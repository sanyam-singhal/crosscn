import * as React from 'react';
import { View, Platform } from 'react-native';
import { twMerge } from 'tailwind-merge';

// Note: This component is a placeholder for web-only implementation.
// It will render null on native platforms.

const ResizablePanelGroup = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & { direction: 'horizontal' | 'vertical' }
>(({ className, direction, ...props }, ref) => {
  if (Platform.OS !== 'web') return null;

  return (
    <View
      ref={ref}
      className={twMerge(
        'flex w-full h-full',
        direction === 'horizontal' ? 'flex-row' : 'flex-col',
        className
      )}
      {...props}
    />
  );
});
ResizablePanelGroup.displayName = 'ResizablePanelGroup';

const ResizablePanel = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  if (Platform.OS !== 'web') return null;

  return (
    <View
      ref={ref}
      className={twMerge('relative flex-1', className)}
      {...props}
    />
  );
});
ResizablePanel.displayName = 'ResizablePanel';

const ResizableHandle = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & { withHandle?: boolean; handleClassName?: string }
>(({ className, withHandle, handleClassName, ...props }, ref) => {
  if (Platform.OS !== 'web') return null;

  return (
    <View
      ref={ref}
      className={twMerge(
        'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1',
        className
      )}
      {...props}
    >
      {withHandle && (
        <View className={twMerge("z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border", handleClassName)} />
      )}
    </View>
  );
});
ResizableHandle.displayName = 'ResizableHandle';

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
