import React from "react";
import { View, Text, Pressable } from "react-native";
import { twMerge } from "tailwind-merge";

interface NavigationMenuProps {
  items: { name: string; onPress: () => void }[];
  activeItem: string;
  /** Tailwind classes for the outer container */
  className?: string;
  /** Base item wrapper classes */
  itemClassName?: string;
  /** Additional classes applied when item is active */
  activeItemClassName?: string;
  /** Base text classes */
  textClassName?: string;
  /** Additional classes applied to text when active */
  activeTextClassName?: string;
}

const NavigationMenu = ({
  items,
  activeItem,
  className,
  itemClassName,
  activeItemClassName,
  textClassName,
  activeTextClassName,
}: NavigationMenuProps) => {
  return (
    <View
      className={twMerge(
        "flex-row items-center justify-center rounded-md bg-muted p-1",
        className
      )}
    >
      {items.map((item) => (
        <Pressable
          key={item.name}
          onPress={item.onPress}
          className={twMerge(
            twMerge(
              "flex-1 items-center justify-center rounded-sm px-3 py-1.5",
              itemClassName,
              activeItem === item.name && twMerge("bg-background shadow-sm", activeItemClassName)
            )
          )}
        >
          <Text
            className={twMerge(
              twMerge(
                "text-sm font-medium text-muted-foreground",
                textClassName,
                activeItem === item.name && twMerge("text-foreground", activeTextClassName)
              )
            )}
          >
            {item.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export { NavigationMenu };
