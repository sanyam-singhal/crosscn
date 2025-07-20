import React from "react";
import {
  Modal as RNModal,
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { twMerge } from "tailwind-merge";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  /** Extra classes for backdrop blur wrapper */
  backdropClassName?: string;
  /** Extra classes for modal centering container */
  containerClassName?: string;
}

const Modal = ({ open, onOpenChange, children, backdropClassName, containerClassName }: ModalProps) => {
  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={() => onOpenChange(false)}
    >
      <BlurView intensity={10} style={StyleSheet.absoluteFill} className={backdropClassName}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => onOpenChange(false)}
        />
      </BlurView>
      <View className={twMerge("flex-1 items-center justify-center p-4", containerClassName)}>
        {children}
      </View>
    </RNModal>
  );
};

const ModalContent = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={twMerge(
      "relative w-full max-w-lg rounded-lg border border-border bg-background p-6 shadow-lg",
      className
    )}
    {...props}
  >
    {children}
  </View>
));
ModalContent.displayName = "ModalContent";

const ModalHeader = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={twMerge(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
));
ModalHeader.displayName = "ModalHeader";

const ModalFooter = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={twMerge(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4",
      className
    )}
    {...props}
  />
));
ModalFooter.displayName = "ModalFooter";

const ModalTitle = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={twMerge(
      "text-lg font-semibold leading-none tracking-tight text-foreground",
      className
    )}
    {...props}
  />
));
ModalTitle.displayName = "ModalTitle";

const ModalDescription = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={twMerge("text-sm text-muted-foreground", className)}
    {...props}
  />
));
ModalDescription.displayName = "ModalDescription";

const ModalClose = React.forwardRef<
  React.ComponentRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ className, ...props }, ref) => {
  // This needs to be used inside a Modal component to get the context
  // For now, we assume it's used inside a component that has access to onOpenChange
  // A more robust solution would use a context provider.
  return (
    <Pressable
      ref={ref}
      className={twMerge(
        twMerge("absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none", className),
        className
      )}
      {...props}
    >
      <Feather name="x" size={16} className={twMerge("text-muted-foreground", className)} />
    </Pressable>
  );
});
ModalClose.displayName = "ModalClose";

export {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
};
