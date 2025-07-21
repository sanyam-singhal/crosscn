import React from "react";
import { Pressable, View, Text } from "react-native";
import { twMerge } from "tailwind-merge";

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
  React.ComponentRef<typeof Pressable>,
  CheckboxProps
>(
  (
    { checked, onCheckedChange, label, disabled, className, wrapperClassName, labelClassName },
    ref
  ) => {
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
            (checked === true || checked === "indeterminate") &&
              "border-primary bg-primary dark:border-primary-dark dark:bg-primary-dark",
            !checked &&
              "border-muted-foreground/50 bg-transparent dark:border-muted-foreground-dark/50",
            disabled &&
              "border-muted-foreground/30 bg-muted-foreground/30 opacity-50 dark:border-muted-foreground-dark/30 dark:bg-muted-foreground-dark/30",
            className
          )}
        >
          {checked === "indeterminate" && (
            <Feather name="minus" size={14} color="white" />
          )}
          {checked === true && (
            <Feather name="check" size={14} color="white" />
          )}
        </View>
        {label && (
          <Text
            className={twMerge(
              "text-foreground dark:text-foreground-dark",
              disabled && "opacity-50",
              labelClassName
            )}
          >
            {label}
          </Text>
        )}
      </Pressable>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
