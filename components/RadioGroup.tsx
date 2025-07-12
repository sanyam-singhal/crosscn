import React from "react";
import { Pressable, View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { clsx } from "clsx";

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
interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  value: string;
  label?: string;
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  RadioGroupItemProps
>(({ value, label, ...props }, ref) => {
  const {
    value: selectedValue,
    onValueChange,
    disabled,
  } = useRadioGroupContext();
  const isSelected = selectedValue === value;
  const itemDisabled = disabled || props.disabled;

  const scale = useSharedValue(isSelected ? 1 : 0);

  React.useEffect(() => {
    scale.value = withTiming(isSelected ? 1 : 0, { duration: 150 });
  }, [isSelected, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

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
      className="flex-row items-center gap-3"
      hitSlop={10}
      role="radio"
      aria-checked={isSelected}
      {...props}
    >
      <View
        className={clsx(
          "h-5 w-5 rounded-full border-2 justify-center items-center",
          {
            "border-primary": isSelected,
            "border-muted-foreground/50": !isSelected,
            "opacity-50": itemDisabled,
          }
        )}
      >
        <Animated.View
          style={animatedStyle}
          className="h-2.5 w-2.5 rounded-full bg-primary"
        />
      </View>
      {label && (
        <Text
          className={clsx("text-foreground", {
            "opacity-50": itemDisabled,
          })}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
