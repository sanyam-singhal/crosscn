import React from "react";
import { twMerge } from "tailwind-merge";
import { Pressable, View, Text } from "react-native";



// --- Context ---
interface RadioGroupContextProps {
  value: string | null;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = React.createContext<RadioGroupContextProps | null>(
  null
);

const useRadioGroupContext = () => {
  const context = React.useContext(RadioGroupContext);
  if (!context) {
    throw new Error("RadioGroupItem must be used within a RadioGroup");
  }
  return context;
};

// --- RadioGroup ---
interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof View> {
  value: string | null;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

const RadioGroup = React.forwardRef<View, RadioGroupProps>(
  ({ value, onValueChange, disabled, children, ...props }, ref) => {
    const contextValue = React.useMemo(
      () => ({ value, onValueChange, disabled }),
      [value, onValueChange, disabled]
    );

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <View ref={ref} role="radiogroup" {...props}>
          {children}
        </View>
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

// --- RadioGroupItem ---
interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  value: string;
  label?: string;
  /** Extra classes for the indicator circle */
  indicatorClassName?: string;
  /** Extra classes applied to indicator when selected */
  selectedIndicatorClassName?: string;
  /** Extra classes for the filled dot */
  dotClassName?: string;
  /** Extra classes for the label text */
  labelClassName?: string;
}

const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof Pressable>,
  RadioGroupItemProps
>(
  (
    { value, label, indicatorClassName, selectedIndicatorClassName, dotClassName, labelClassName, className, ...props },
    ref
  ) => {
    const {
      value: selectedValue,
      onValueChange,
      disabled,
    } = useRadioGroupContext();
    const isSelected = selectedValue === value;
    const itemDisabled = disabled || props.disabled;

    const handlePress = () => {
      if (!itemDisabled) {
        onValueChange(value);
      }
    };

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        disabled={itemDisabled}
        className={twMerge("flex-row items-center gap-3", itemDisabled && "opacity-50", className)}
        hitSlop={10}
        role="radio"
        aria-checked={isSelected}
        {...props}
      >
        <View
          className={twMerge(
            "h-5 w-5 rounded-full border-2 justify-center items-center",
            isSelected ? "border-primary" : "border-muted-foreground/50",
            itemDisabled && "opacity-50",
            indicatorClassName,
            isSelected && selectedIndicatorClassName
          )}
        >
          {isSelected && (
            <View
              className={twMerge("h-2.5 w-2.5 rounded-full bg-primary", dotClassName)}
            />
          )}
        </View>
        {label && (
          <Text
            className={twMerge("text-foreground", itemDisabled && "opacity-50", labelClassName)}
          >
            {label}
          </Text>
        )}
      </Pressable>
    );
  }
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
