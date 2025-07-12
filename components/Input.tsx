import React from "react";
import { TextInput, View, Text } from "react-native";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

interface InputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
  error?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, error, iconLeft, iconRight, ...props }, ref) => {
    const inputClasses = twMerge(
      clsx(
        "h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        {
          "border-destructive": error,
          "pl-10": !!iconLeft,
          "pr-10": !!iconRight,
        },
        className
      )
    );

    return (
      <View className="relative w-full">
        {iconLeft && (
          <View className="absolute left-3 top-1/2 -translate-y-1/2">
            {iconLeft}
          </View>
        )}
        <TextInput ref={ref} className={inputClasses} {...props} />
        {iconRight && (
          <View className="absolute right-3 top-1/2 -translate-y-1/2">
            {iconRight}
          </View>
        )}
        {error && <Text className="mt-1 text-sm text-destructive">{error}</Text>}
      </View>
    );
  }
);

Input.displayName = "Input";

export { Input };
