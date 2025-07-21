import * as React from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,

} from 'react-native-reanimated';
import { twMerge } from 'tailwind-merge';

interface MarqueeProps extends React.ComponentPropsWithoutRef<typeof View> {
  children: React.ReactNode;
  speed?: number;
  contentClassName?: string;
  duplicateContentClassName?: string;
}

const Marquee = React.forwardRef<View, MarqueeProps>(
  (
    {
      children,
      speed = 1,
      className,
      contentClassName,
      duplicateContentClassName,
      ...props
    },
    ref
  ) => {
    const [containerWidth, setContainerWidth] = React.useState(0);
    const [contentWidth, setContentWidth] = React.useState(0);
    const translateX = useSharedValue(0);

    const isAnimationReady = containerWidth > 0 && contentWidth > 0;

    React.useEffect(() => {
      if (!isAnimationReady) return;

      const duration = (contentWidth / (50 * speed)) * 1000;
      translateX.value = withRepeat(
        withTiming(-contentWidth, { duration, easing: Easing.linear }),
        -1,
        false
      );

      return () => {
        cancelAnimation(translateX);
        translateX.value = 0;
      };
    }, [isAnimationReady, contentWidth, speed, translateX]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: translateX.value }],
      };
    });

    return (
      <View
        ref={ref}
        className={twMerge('overflow-hidden', className)}
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
        {...props}
      >
        <Animated.View
          className={twMerge('flex-row', contentClassName)}
          style={animatedStyle}
          onLayout={(e) => setContentWidth(e.nativeEvent.layout.width)}
        >
          {children}
          {isAnimationReady && contentWidth > containerWidth && (
            <View
              className={twMerge('absolute left-[100%]', duplicateContentClassName)}
            >
              {children}
            </View>
          )}
        </Animated.View>
      </View>
    );
  }
);

Marquee.displayName = 'Marquee';

export { Marquee };
