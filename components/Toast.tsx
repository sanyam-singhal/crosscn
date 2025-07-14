import React, {
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";
import { View, Text, Pressable, Platform } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  runOnJS,
} from "react-native-reanimated";
import { twMerge } from "tailwind-merge";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { cva, type VariantProps } from "class-variance-authority";

const toastVariants = cva(
  "absolute top-5 mx-auto self-center w-full max-w-md rounded-lg border p-4 shadow-lg flex-row items-center justify-between",
  {
    variants: {
      variant: {
        default: "border-border bg-background",
        destructive: "border-destructive bg-destructive/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const toastTitleVariants = cva("text-sm font-semibold", {
  variants: {
    variant: {
      default: "text-foreground",
      destructive: "text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const toastDescriptionVariants = cva("text-sm", {
  variants: {
    variant: {
      default: "text-muted-foreground",
      destructive: "text-destructive/80",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface ToastProps extends VariantProps<typeof toastVariants> {
  /** Extra classes for inner content wrapper */
  bodyClassName?: string;
  title?: string;
  description?: string;
  /** Extra classes for toast container */
  className?: string;
  /** Extra classes for title text */
  titleClassName?: string;
  /** Extra classes for description text */
  descriptionClassName?: string;
  /** Extra classes for close icon/button */
  closeClassName?: string;
}

interface ToastContextType {
  show: (props: ToastProps) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastProps | null>(null);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-50);

  const hide = useCallback(() => {
    translateY.value = withTiming(-50, { duration: 200 });
    opacity.value = withTiming(0, { duration: 200 }, () => {
      runOnJS(setToast)(null);
    });
  }, [opacity, translateY]);

  const show = useCallback(
    (props: ToastProps) => {
      setToast(props);
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(
          props.variant === "destructive"
            ? Haptics.NotificationFeedbackType.Error
            : Haptics.NotificationFeedbackType.Success
        );
      }
      translateY.value = withSequence(
        withTiming(0, { duration: 300 }),
        withTiming(0, { duration: 3000 }), // Hold duration
        withTiming(-50, { duration: 200 })
      );
      opacity.value = withSequence(
        withTiming(1, { duration: 300 }),
        withTiming(1, { duration: 3000 }), // Hold duration
        withTiming(0, { duration: 200 }, () => {
          runOnJS(setToast)(null);
        })
      );
    },
    [opacity, translateY]
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {toast && (
        <Animated.View
          style={animatedStyle}
          className={twMerge(toastVariants({ variant: toast.variant }), toast.className)}
        >
          <View className={twMerge("flex-1 pr-4", toast.bodyClassName)}>
            {toast.title && (
              <Text
                className={twMerge(toastTitleVariants({ variant: toast.variant }), toast.titleClassName)}
              >
                {toast.title}
              </Text>
            )}
            {toast.description && (
              <Text
                className={twMerge(toastDescriptionVariants({ variant: toast.variant }), toast.descriptionClassName)}
              >
                {toast.description}
              </Text>
            )}
          </View>
          <Pressable onPress={hide} className={twMerge(toast.closeClassName)}>
            <Feather name="x" size={18} className={twMerge("text-muted-foreground", toast.closeClassName)} />
          </Pressable>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};
