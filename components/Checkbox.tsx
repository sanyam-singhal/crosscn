import React from "react";
import { Pressable, View, Text } from "react-native";
import { twMerge } from "tailwind-merge";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";


interface CheckboxProps {
  checked: boolean | "indeterminate";
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  /** Extra classes for checkbox box */
  className?: string;
  /** Extra classes for wrapper Pressable */
  wrapperClassName?: string;
  /** Extra classes for label text */
  labelClassName?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  CheckboxProps
>(({ checked, onCheckedChange, label, disabled, className, wrapperClassName, labelClassName }, ref) => {
  const scale = useSharedValue(checked === true ? 1 : 0);

  React.useEffect(() => {
    scale.value = withTiming(checked === true ? 1 : 0, { duration: 150 });
  }, [checked, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: scale.value,
    };
  });

  const handlePress = () => {
    if (!disabled) {
      onCheckedChange(checked === "indeterminate" ? true : !checked);
    }
  };

  return (
    <Pressable
      ref={ref}
      onPress={handlePress}
      disabled={disabled}
      className={twMerge("flex-row items-center gap-3", wrapperClassName)}
      hitSlop={10}
    >
      <View
        className={twMerge(
          "h-5 w-5 rounded border-2 justify-center items-center",
          (checked === true || checked === "indeterminate") && "border-primary bg-primary",
          !checked && "border-muted-foreground/50 bg-transparent",
          disabled && "border-muted-foreground/30 bg-muted-foreground/30 opacity-50",
          className
        )}
      >
        {checked === "indeterminate" ? (
          <Feather name="minus" size={14} color="white" />
        ) : (
          <Animated.View style={animatedStyle}>
            <Feather name="check" size={14} color="white" />
          </Animated.View>
        )}
      </View>
      {label && (
        <Text
          className={twMerge("text-foreground", disabled && "opacity-50", labelClassName)}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
