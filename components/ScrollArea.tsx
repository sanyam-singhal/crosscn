import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollView> {
  containerClassName?: string;
}

const ScrollArea = React.forwardRef<ScrollView, ScrollAreaProps>(
  ({ className, containerClassName, children, ...props }, ref) => (
    <View className={twMerge('relative overflow-hidden', containerClassName)}>
      <ScrollView ref={ref} className={className} {...props}>
        {children}
      </ScrollView>
    </View>
  )
);
ScrollArea.displayName = 'ScrollArea';

export { ScrollArea };
