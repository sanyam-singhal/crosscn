import React from "react";
import { View } from "react-native";
import { twMerge } from "tailwind-merge";

const Skeleton = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={twMerge(
        "animate-pulse rounded-md bg-muted",
        className
      )}
      {...props}
    />
  );
});

Skeleton.displayName = "Skeleton";

export { Skeleton };
