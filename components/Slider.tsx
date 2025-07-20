import * as React from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { twMerge } from 'tailwind-merge';

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  /** Extra classes for the main container */
  className?: string;
  /** Extra classes for the track */
  trackClassName?: string;
  /** Extra classes for the filled part of the track */
  rangeClassName?: string;
  /** Extra classes for the thumb */
  thumbClassName?: string;
}

const Slider = React.forwardRef<View, SliderProps>(
  (
    {
      value,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      disabled,
      className,
      trackClassName,
      rangeClassName,
      thumbClassName,
    },
    ref
  ) => {
    const trackWidth = useSharedValue(0);
    const progress = useSharedValue((value - min) / (max - min));
    const isPressed = useSharedValue(false);

    const animatedThumbStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: progress.value * trackWidth.value - 8 }, // Center thumb
          { scale: withSpring(isPressed.value ? 1.2 : 1) },
        ],
      };
    });

    const animatedRangeStyle = useAnimatedStyle(() => {
      return {
        width: `${progress.value * 100}%`,
      };
    });

    const startProgress = useSharedValue(0);

    const panGesture = Gesture.Pan()
      .onStart(() => {
        startProgress.value = progress.value;
        isPressed.value = true;
      })
      .onUpdate((event) => {
        if (trackWidth.value === 0) return;
        const newProgress =
          startProgress.value + event.translationX / trackWidth.value;
        const clampedProgress = Math.max(0, Math.min(1, newProgress));

        const steps = (max - min) / step;
        const stepIndex = Math.round(clampedProgress * steps);
        const steppedProgress = stepIndex / steps;

        progress.value = steppedProgress;

        const newValue = min + steppedProgress * (max - min);
        runOnJS(onValueChange)(parseFloat(newValue.toFixed(2)));
      })
      .onEnd(() => {
        isPressed.value = false;
      });

    return (
      <View
        ref={ref}
        className={twMerge('relative flex-row items-center py-2', className)}
        onLayout={(e) => {
          trackWidth.value = e.nativeEvent.layout.width;
        }}
      >
        <View
          className={twMerge(
            'h-1.5 flex-1 rounded-full bg-secondary dark:bg-secondary-dark',
            trackClassName
          )}
        >
          <Animated.View
            style={animatedRangeStyle}
            className={twMerge(
              'h-full rounded-full bg-primary dark:bg-primary-dark',
              rangeClassName
            )}
          />
        </View>
        <GestureDetector gesture={disabled ? Gesture.Manual() : panGesture}>
          <Animated.View
            style={animatedThumbStyle}
            className={twMerge(
              'absolute h-4 w-4 rounded-full bg-primary dark:bg-primary-dark border-2 border-background dark:border-background-dark shadow',
              disabled && 'bg-muted-foreground dark:bg-muted-foreground-dark',
              thumbClassName
            )}
          />
        </GestureDetector>
      </View>
    );
  }
);

Slider.displayName = 'Slider';

export { Slider };
