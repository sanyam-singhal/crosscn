import React from "react";
import { View } from "react-native";

import { twMerge } from "tailwind-merge";

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof View> {
  value: number;
  max?: number;
  indicatorClassName?: string;
}

const Progress = React.forwardRef<View, ProgressProps>(
  ({ value, max = 100, className, indicatorClassName, ...props }, ref) => {
    const percentage = Math.max(0, Math.min(100, (value / max) * 100));

    return (
      <View
        ref={ref}
        className={twMerge(
          "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
          className
        )}
        accessibilityRole="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        {...props}
      >
        <View
          style={{ width: `${percentage}%` }}
          className={twMerge(
            "h-full w-full flex-1 bg-primary transition-none",
            indicatorClassName
          )}
        />
      </View>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };
