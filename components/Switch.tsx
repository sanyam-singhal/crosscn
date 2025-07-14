import React from "react";
import { Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  interpolate,
} from "react-native-reanimated";
import { useColorScheme } from "nativewind";
import { twMerge } from "tailwind-merge";
import colors from "tailwindcss/colors";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
  /** Extra classes for the Pressable wrapper */
  className?: string;
  /** Extra classes for the track */
  trackClassName?: string;
  /** Extra classes for the thumb */
  thumbClassName?: string;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  SwitchProps
>(({ checked, onCheckedChange, disabled, size = "default", className, trackClassName, thumbClassName }, ref) => {
  const { colorScheme } = useColorScheme();
  const progress = useSharedValue(checked ? 1 : 0);

  React.useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, { duration: 200 });
  }, [checked, progress]);

  const sizeStyles = {
    sm: { trackWidth: 36, trackHeight: 20, thumbSize: 16 },
    default: { trackWidth: 44, trackHeight: 24, thumbSize: 20 },
    lg: { trackWidth: 52, trackHeight: 28, thumbSize: 24 },
  };

  const { trackWidth, trackHeight, thumbSize } = sizeStyles[size];
  const thumbMargin = (trackHeight - thumbSize) / 2;
  const travelDistance = trackWidth - thumbSize - thumbMargin * 2;

  const animatedTrackStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [
        colorScheme === "dark" ? colors.gray[700] : colors.gray[300],
        colors.blue[600],
      ]
    );
    return {
      backgroundColor,
    };
  });

  const animatedThumbStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [0, travelDistance]);
    return {
      transform: [{ translateX }],
    };
  });

  const handlePress = () => {
    if (!disabled) {
      onCheckedChange(!checked);
    }
  };

  return (
    <Pressable
      ref={ref}
      onPress={handlePress}
      disabled={disabled}
      className={twMerge("justify-center", disabled && "opacity-70", className)}
      style={{
        width: trackWidth,
        height: trackHeight,
      }}
      hitSlop={10}
    >
      <Animated.View
        style={[
          {
            width: trackWidth,
            height: trackHeight,
            borderRadius: trackHeight / 2,
          },
          animatedTrackStyle,
        ]}
        className={twMerge("justify-center", trackClassName)}
      >
        <Animated.View
          style={[
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              marginLeft: thumbMargin,
            },
            animatedThumbStyle,
          ]}
          className={twMerge("bg-white shadow-sm-native", thumbClassName)}
        />
      </Animated.View>
    </Pressable>
  );
});

Switch.displayName = "Switch";

export { Switch };
