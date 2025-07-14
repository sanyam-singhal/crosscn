import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

const sheetVariants = cva(
  "fixed bg-background w-full h-full border-border shadow-lg",
  {
    variants: {
      side: {
        top: "top-0 left-0 right-0 border-b",
        bottom: "bottom-0 left-0 right-0 border-t",
        left: "top-0 left-0 h-full border-r",
        right: "top-0 right-0 h-full border-l",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

interface SheetProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof sheetVariants> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  /** Extra classes for the sheet container */
  className?: string;
  /** Classes for the overlay backdrop */
  overlayClassName?: string;
}

const Sheet = ({
  open,
  onOpenChange,
  side = "right",
  children,
  className,
  overlayClassName,
}: SheetProps) => {
  const { width, height } = useWindowDimensions();
  const offset = useSharedValue(0);

  const isVertical = side === "top" || side === "bottom";
  const dimension = isVertical ? height : width;

  const closeSheet = () => {
    onOpenChange(false);
  };

  React.useEffect(() => {
    offset.value = withTiming(open ? 0 : -dimension, { duration: 250 });
  }, [open, dimension, offset]);

  const pan = Gesture.Pan()
    .onChange((event) => {
      const change = isVertical ? event.changeY : event.changeX;
      const currentOffset = offset.value + change;
      if (
        (side === "bottom" || side === "right") &&
        currentOffset > -dimension &&
        currentOffset < 0
      ) {
        offset.value = currentOffset;
      } else if (
        (side === "top" || side === "left") &&
        currentOffset < dimension &&
        currentOffset > 0
      ) {
        offset.value = currentOffset;
      }
    })
    .onEnd(() => {
      if (Math.abs(offset.value) > dimension / 3) {
        runOnJS(closeSheet)();
      } else {
        offset.value = withTiming(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const translate =
      side === "bottom" || side === "right"
        ? {
            transform: isVertical
              ? [{ translateY: -offset.value }]
              : [{ translateX: -offset.value }],
          }
        : {
            transform: isVertical
              ? [{ translateY: offset.value }]
              : [{ translateX: offset.value }],
          };
    return { ...translate };
  });

  if (Platform.OS === "web") {
    // Basic web implementation without gesture handling
    return (
      <>
        {open && (
          <Pressable
            onPress={closeSheet}
            style={StyleSheet.absoluteFill}
            className={twMerge("bg-black/60", overlayClassName)}
          />
        )}
        <Animated.View
          style={[
            {
              position: "absolute",
              width: isVertical ? "100%" : 300,
              height: !isVertical ? "100%" : 400,
            },
            animatedStyle,
          ]}
          className={twMerge(sheetVariants({ side }), className)}
        >
          {children}
        </Animated.View>
      </>
    );
  }

  return (
    <>
      {open && (
        <Pressable
          onPress={closeSheet}
          style={StyleSheet.absoluteFill}
          className={twMerge("bg-black/60", overlayClassName)}
        />
      )}
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            {
              position: "absolute",
              width: isVertical ? "100%" : 300,
              height: !isVertical ? "100%" : 400,
            },
            animatedStyle,
          ]}
          className={twMerge(sheetVariants({ side }), className)}
        >
          {children}
        </Animated.View>
      </GestureDetector>
    </>
  );
};

const SheetContent = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={twMerge("flex-1 p-6", className)}
    {...props}
  />
));
SheetContent.displayName = "SheetContent";

const SheetHeader = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={twMerge("text-center sm:text-left mb-4", className)}
    {...props}
  />
));
SheetHeader.displayName = "SheetHeader";

const SheetTitle = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={twMerge(
      "text-lg font-semibold text-foreground",
      className
    )}
    {...props}
  />
));
SheetTitle.displayName = "SheetTitle";

const SheetDescription = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={twMerge("text-sm text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = "SheetDescription";

export {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
};
