import React from "react";
import { Pressable, View } from "react-native";

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
  React.ComponentRef<typeof Pressable>,
  SwitchProps
>(
  (
    { checked, onCheckedChange, disabled, size = "default", className, trackClassName, thumbClassName },
    ref
  ) => {
    const { colorScheme } = useColorScheme();

    const sizeStyles = {
      sm: { trackWidth: 36, trackHeight: 20, thumbSize: 16 },
      default: { trackWidth: 44, trackHeight: 24, thumbSize: 20 },
      lg: { trackWidth: 52, trackHeight: 28, thumbSize: 24 },
    };

    const { trackWidth, trackHeight, thumbSize } = sizeStyles[size];
    const thumbMargin = (trackHeight - thumbSize) / 2;

    const handlePress = () => {
      if (!disabled) {
        onCheckedChange(!checked);
      }
    };

    const trackStyle = {
      backgroundColor: checked
        ? colors.blue[600]
        : colorScheme === 'dark'
        ? colors.gray[700]
        : colors.gray[300],
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
        <View
          style={[
            {
              width: trackWidth,
              height: trackHeight,
              borderRadius: trackHeight / 2,
            },
            trackStyle,
          ]}
          className={twMerge(
            "justify-center",
            checked ? "items-end" : "items-start",
            trackClassName
          )}
        >
          <View
            style={[
              {
                width: thumbSize,
                height: thumbSize,
                borderRadius: thumbSize / 2,
                marginLeft: thumbMargin,
              },

            ]}
            className={twMerge("bg-white shadow-sm-native", thumbClassName)}
          />
        </View>
      </Pressable>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
