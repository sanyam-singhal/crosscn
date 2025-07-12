import React from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { twMerge } from "tailwind-merge";

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof View> {
  value: number;
  max?: number;
  indicatorClassName?: string;
}

const Progress = React.forwardRef<View, ProgressProps>(
  ({ value, max = 100, className, indicatorClassName, ...props }, ref) => {
    const progress = useSharedValue(0);

    const percentage = Math.max(0, Math.min(100, (value / max) * 100));

    React.useEffect(() => {
      progress.value = withTiming(percentage, { duration: 300 });
    }, [percentage, progress]);

    const animatedIndicatorStyle = useAnimatedStyle(() => {
      return {
        width: `${progress.value}%`,
      };
    });

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
        <Animated.View
          style={animatedIndicatorStyle}
          className={twMerge(
            "h-full w-full flex-1 bg-primary",
            indicatorClassName
          )}
        />
      </View>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };
