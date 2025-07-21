import React from "react";
import { View, Text, Pressable } from "react-native";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import { twMerge } from "tailwind-merge";

interface DropdownMenuProps {
  trigger: React.ReactElement;
  placement?: PopoverPlacement;
  /** Extra classes for menu container */
  menuClassName?: string;
  /** Extra classes for each item row */
  itemClassName?: string;
  /** Extra classes for destructive item rows (in addition to base) */
  destructiveItemClassName?: string;
  /** Extra classes for the label text */
  textClassName?: string;
  items: {
    label: string;
    onSelect: () => void;
    icon?: React.ReactElement<{ className?: string }>;
    destructive?: boolean;
  }[];
}

const DropdownMenu = ({ trigger, items, menuClassName, itemClassName, destructiveItemClassName, textClassName, placement }: DropdownMenuProps) => {
  return (
    <Popover
      from={trigger}
      placement={placement}
      popoverStyle={{ borderRadius: 6 }}
      backgroundStyle={{ opacity: 0 }}
      animationConfig={{ duration: 0 }}
    >
      <View className={twMerge("w-56 rounded-md border border-border bg-popover p-1 shadow-md", menuClassName)}>
        {items.map((item, index) => (
          <Pressable
            key={index}
            onPress={item.onSelect}
            className={twMerge(
              "flex-row items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground disabled:opacity-50",
              itemClassName,
              item.destructive && twMerge("text-destructive focus:bg-destructive/10", destructiveItemClassName)
            )}
          >
            {item.icon &&
              React.cloneElement(item.icon, {
                className: twMerge("mr-2 h-4 w-4", item.icon.props.className),
              })}
            <Text
              className={twMerge(
                "text-popover-foreground",
                item.destructive && "text-destructive",
                textClassName
              )}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </Popover>
  );
};

export { DropdownMenu };
