import React from "react";
import { View, Text, Pressable, Platform } from "react-native";
import Popover from "react-native-popover-view";
import { twMerge } from "tailwind-merge";

interface TooltipProps {
  children: React.ReactElement;
  content: React.ReactNode | string;
  trigger?: "hover" | "press" | "long-press";
  /** Extra classes for tooltip wrapper */
  className?: string;
  /** Extra classes for text content */
  textClassName?: string;
}

const Tooltip = ({
  children,
  content,
  trigger = "hover",
  className,
  textClassName,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const open = () => setIsVisible(true);
  const close = () => setIsVisible(false);
  const toggle = () => setIsVisible((v) => !v);

  if (Platform.OS === "web") {
    // Web-specific lightweight tooltip
    const triggerProps =
      trigger === "hover"
        ? { onMouseEnter: open, onMouseLeave: close }
        : trigger === "press"
        ? { onClick: toggle, onBlur: close }
        : { onContextMenu: (e: React.MouseEvent) => { e.preventDefault(); open(); } };

    return (
      <View style={{ position: "relative", alignSelf: "flex-start" }}>
        <Pressable {...(triggerProps as any)}>{children}</Pressable>
        {isVisible && (
          <View
            style={{ position: "absolute", top: "100%", zIndex: 1000 }}
            className={twMerge(
              twMerge("mt-1 rounded-md border border-border bg-popover p-2 shadow-md", className)
            )}
          >
            {typeof content === "string" ? (
              <Text className={twMerge("text-sm text-popover-foreground", textClassName)}>{content}</Text>
            ) : (
              content
            )}
          </View>
        )}
      </View>
    );
  }

  // Native platforms use react-native-popover-view
  const nativeTriggerProps =
    trigger === "hover"
      ? { onHoverIn: open, onHoverOut: close }
      : trigger === "press"
      ? { onPress: open, onPressOut: close }
      : { onLongPress: open, onPressOut: close };

  return (
    <Popover isVisible={isVisible} onRequestClose={close} animationConfig={{ duration: 0 }}
      from={
        <Pressable {...nativeTriggerProps} style={{ alignSelf: "flex-start" }}>
          {children}
        </Pressable>
      }
    >
      <View
        className={twMerge(
          twMerge("rounded-md border border-border bg-popover p-2 shadow-md", className)
        )}
      >
        {typeof content === "string" ? (
          <Text className={twMerge("text-sm text-popover-foreground", textClassName)}>{content}</Text>
        ) : (
          content
        )}
      </View>
    </Popover>
  );
};

export { Tooltip };
