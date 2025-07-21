import React from "react";
import {
  View,
  Text,
  Pressable,
  Platform,
} from "react-native";

import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

const sheetVariants = cva(
  "absolute bg-sheet",
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
  const closeSheet = () => {
    onOpenChange(false);
  };

  if (!open) {
    return null;
  }

  const isVertical = side === "top" || side === "bottom";

  return (
    <>
      <Pressable
        onPress={closeSheet}
        className={twMerge(
          "absolute inset-0",
          Platform.OS === "web" ? "bg-popover" : "bg-black/60",
          overlayClassName
        )}
      />
      <View
        style={{
          position: "absolute",
          width: isVertical ? "100%" : 300,
          height: !isVertical ? "100%" : 400,
        }}
        className={twMerge(sheetVariants({ side }), className)}
      >
        {children}
      </View>
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
