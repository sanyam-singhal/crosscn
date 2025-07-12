import React from "react";
import { Pressable, View, Text } from "react-native";
import { twMerge } from "tailwind-merge";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { clsx } from "clsx";

interface CheckboxProps {
  checked: boolean | "indeterminate";
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  CheckboxProps
>(({ checked, onCheckedChange, label, disabled, className }, ref) => {
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
      className="flex-row items-center gap-3"
      hitSlop={10}
    >
      <View
        className={twMerge(
          clsx(
            "h-5 w-5 rounded border-2 justify-center items-center",
            {
              "border-primary bg-primary":
                checked === true || checked === "indeterminate",
              "border-muted-foreground/50 bg-transparent": !checked,
              "border-muted-foreground/30 bg-muted-foreground/30 opacity-50":
                disabled,
            },
            className
          )
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
          className={clsx("text-foreground", {
            "opacity-50": disabled,
          })}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
