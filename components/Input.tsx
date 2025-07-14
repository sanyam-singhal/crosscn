import React from "react";
import { TextInput, View, Text } from "react-native";
import { twMerge } from "tailwind-merge";


interface InputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
  error?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  /** Extra classes for outer wrapper */
  containerClassName?: string;
  /** Extra classes for left icon wrapper */
  iconLeftWrapperClassName?: string;
  /** Extra classes for right icon wrapper */
  iconRightWrapperClassName?: string;
  /** Extra classes for error text */
  errorClassName?: string;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, error, iconLeft, iconRight, containerClassName, iconLeftWrapperClassName, iconRightWrapperClassName, errorClassName, ...props }, ref) => {
    const inputClasses = twMerge(
      "h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      error && "border-destructive",
      !!iconLeft && "pl-10",
      !!iconRight && "pr-10",
      className
    );

    return (
      <View className={twMerge("relative w-full", containerClassName)}>
        {iconLeft && (
          <View className={twMerge("absolute left-3 top-1/2 -translate-y-1/2", iconLeftWrapperClassName)}>
            {iconLeft}
          </View>
        )}
        <TextInput ref={ref} className={inputClasses} {...props} />
        {iconRight && (
          <View className={twMerge("absolute right-3 top-1/2 -translate-y-1/2", iconRightWrapperClassName)}>
            {iconRight}
          </View>
        )}
        {error && <Text className={twMerge("mt-1 text-sm text-destructive", errorClassName)}>{error}</Text>}
      </View>
    );
  }
);

Input.displayName = "Input";

export { Input };
