import React from "react";
import { View, Pressable } from "react-native";
import { twMerge } from "tailwind-merge";
import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";



// --- Accordion Context ---
interface AccordionContextProps {
  value: string | string[] | null;
  onValueChange: (value: string) => void;
  type: "single" | "multiple";
}

const AccordionContext = React.createContext<AccordionContextProps | null>(
  null
);

const useAccordionContext = () => {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion");
  }
  return context;
};

// --- AccordionItem Context ---
const AccordionItemContext = React.createContext<{ value: string } | null>(
  null
);

const useAccordionItemContext = () => {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      "AccordionItem components must be used within an AccordionItem"
    );
  }
  return context;
};

// --- Accordion ---
interface AccordionProps extends React.ComponentPropsWithoutRef<typeof View> {
  value: string | string[] | null;
  onValueChange: (value: string | string[] | null) => void;
  type?: "single" | "multiple";
}

const Accordion = React.forwardRef<View, AccordionProps>(
  ({ value, onValueChange, type = "single", children, ...props }, ref) => {
    const handleValueChange = React.useCallback(
      (itemValue: string) => {
        if (type === "single") {
          onValueChange(value === itemValue ? null : itemValue);
        } else {
          const aValue = Array.isArray(value) ? value : [];
          const newValue = aValue.includes(itemValue)
            ? aValue.filter((v) => v !== itemValue)
            : [...aValue, itemValue];
          onValueChange(newValue);
        }
      },
      [value, onValueChange, type]
    );

    const contextValue = React.useMemo(
      () => ({
        value,
        onValueChange: handleValueChange,
        type,
      }),
      [value, handleValueChange, type]
    );

    return (
      <AccordionContext.Provider value={contextValue as AccordionContextProps}>
        <View ref={ref} {...props}>
          {children}
        </View>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = "Accordion";

// --- AccordionItem ---
interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  value: string;
}

const AccordionItem = React.forwardRef<View, AccordionItemProps>(
  ({ value, className, children, ...props }, ref) => {
    const itemContextValue = React.useMemo(() => ({ value }), [value]);
    return (
      <AccordionItemContext.Provider value={itemContextValue}>
        <View
          ref={ref}
          className={twMerge("border-b border-border", className)}
          {...props}
        >
          {children}
        </View>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

// --- AccordionTrigger ---
const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ className, children, ...props }, ref) => {
  const { value, onValueChange, type } = useAccordionContext();
  const { value: itemValue } = useAccordionItemContext();
  const { colorScheme } = useColorScheme();

  const isOpen =
    type === "single"
      ? value === itemValue
      : Array.isArray(value) && value.includes(itemValue);

  return (
    <Pressable
      ref={ref}
      onPress={() => onValueChange(itemValue)}
      className={twMerge("flex-row justify-between items-center py-4", className)}
      {...props}
    >
      <>{children}</>
      <Feather
        name={isOpen ? "chevron-up" : "chevron-down"}
        size={18}
        color={colorScheme === "dark" ? "white" : "black"}
      />
    </Pressable>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

// --- AccordionContent ---
const AccordionContent = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  const { value, type } = useAccordionContext();
  const { value: itemValue } = useAccordionItemContext();

  const isOpen =
    type === "single"
      ? value === itemValue
      : Array.isArray(value) && value.includes(itemValue);



  if (!isOpen) {
    return null;
  }

  return (
    <View ref={ref} {...props}>
      <View className={twMerge("pb-4 pt-1", className)}>{children}</View>
    </View>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
