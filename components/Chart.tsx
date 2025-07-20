import * as React from 'react';
import { View, Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

// Note: This component is a placeholder. For full functionality,
// install and use a charting library like 'victory-native' and 'react-native-svg'.
// e.g., yarn add victory-native react-native-svg

interface ChartProps extends React.ComponentPropsWithoutRef<typeof View> {
  data: any[]; // Data format will depend on the charting library
  type: 'bar' | 'line' | 'spark';
  textClassName?: string;
}

const Chart = React.forwardRef<View, ChartProps>(
  ({ type, className, textClassName, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={twMerge(
          'h-48 w-full items-center justify-center rounded-lg border border-dashed border-border bg-muted/50 dark:border-border-dark dark:bg-muted-dark/50',
          className
        )}
        {...props}
      >
        <Text className={twMerge("text-muted-foreground dark:text-muted-foreground-dark", textClassName)}>
          Chart ({type}) - Requires a charting library
        </Text>
        
      </View>
    );
  }
);

Chart.displayName = 'Chart';

export { Chart };
