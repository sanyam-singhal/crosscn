import * as React from 'react';
import { View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { twMerge } from 'tailwind-merge';

interface MarqueeProps extends React.ComponentPropsWithoutRef<typeof View> {
  children: React.ReactNode;
  speed?: number;
  contentClassName?: string;
  duplicateContentClassName?: string;
}

const Marquee = React.forwardRef<View, MarqueeProps>(
  ({ children, speed = 1, className, contentClassName, duplicateContentClassName, ...props }, ref) => {
    const translateX = useSharedValue(0);
    const containerWidth = useSharedValue(0);
    const contentWidth = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: translateX.value }],
      };
    });

    useAnimatedReaction(
      () => {
        return { cw: contentWidth.value, ctw: containerWidth.value };
      },
      (result, previous) => {
        if (
          result.cw > 0 &&
          result.ctw > 0 &&
          (!previous || result.cw !== previous.cw || result.ctw !== previous.ctw)
        ) {
          const distance = result.cw + result.ctw;
          translateX.value = withRepeat(
            withTiming(-distance, {
              duration: distance / (0.05 * speed), // 50px/s
              easing: Easing.linear,
            }),
            -1,
            false
          );
        }
      },
      [speed]
    );

    React.useEffect(() => {
      return () => {
        cancelAnimation(translateX);
      };
    }, [translateX]);

    return (
      <View
        ref={ref}
        onLayout={(e) => (containerWidth.value = e.nativeEvent.layout.width)}
        className={twMerge('overflow-hidden', className)}
        {...props}
      >
        <Animated.View style={animatedStyle} className={twMerge('flex-row', contentClassName)}>
          <View
            onLayout={(e) => (contentWidth.value = e.nativeEvent.layout.width)}
            className="flex-row"
          >
            {children}
          </View>
          {/* Duplicate content for seamless looping */}
          <View className={twMerge('flex-row pl-4', duplicateContentClassName)}>{children}</View>
        </Animated.View>
      </View>
    );
  }
);

Marquee.displayName = 'Marquee';

export { Marquee };
