import React from "react";
import { TextInput, View, Text } from "react-native";
import { twMerge } from "tailwind-merge";


interface InputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
  disabled?: boolean;
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
  ({ className, error, iconLeft, iconRight, containerClassName, iconLeftWrapperClassName, iconRightWrapperClassName, errorClassName, disabled, ...props }, ref) => {
    const inputClasses = twMerge(
      "h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-input-dark dark:text-foreground-dark dark:placeholder:text-muted-foreground-dark dark:ring-offset-background-dark dark:focus:ring-ring-dark",
      error && "border-destructive dark:border-destructive-dark",
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
        <TextInput ref={ref} className={inputClasses} editable={!disabled} {...props} />
        {iconRight && (
          <View className={twMerge("absolute right-3 top-1/2 -translate-y-1/2", iconRightWrapperClassName)}>
            {iconRight}
          </View>
        )}
        {error && <Text className={twMerge("mt-1 text-sm text-destructive dark:text-destructive-dark", errorClassName)}>{error}</Text>}
      </View>
    );
  }
);

Input.displayName = "Input";

export { Input };
