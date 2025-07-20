import * as React from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import RNPPopover from 'react-native-popover-view';

const Popover = React.forwardRef<
  React.ElementRef<typeof RNPPopover>,
  React.ComponentProps<typeof RNPPopover>
>(({ from, children, popoverStyle, ...props }, ref) => {
  return (
    <RNPPopover
      ref={ref}
      from={from}
      popoverStyle={[{ borderRadius: 12, backgroundColor: 'transparent' }, popoverStyle]}
      {...props}
    >
      {children}
    </RNPPopover>
  );
});
Popover.displayName = 'Popover';

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={twMerge(
      'rounded-lg border border-border bg-background p-4 text-popover-foreground shadow-md outline-none dark:border-border-dark dark:bg-background-dark',
      className
    )}
    {...props}
  />
));
PopoverContent.displayName = 'PopoverContent';

export { Popover, PopoverContent };
