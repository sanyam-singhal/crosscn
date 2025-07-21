import * as React from 'react';
import { Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

const Label = React.forwardRef<
  React.ComponentRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={twMerge(
      'text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    {...props}
  />
));
Label.displayName = 'Label';

export { Label };
