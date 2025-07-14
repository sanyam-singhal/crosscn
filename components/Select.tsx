import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  Modal as RNModal,
  StyleSheet,
} from "react-native";
import { twMerge } from "tailwind-merge";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

interface SelectProps {
  value: string | null;
  onValueChange: (value: string) => void;
  placeholder?: string;
  options: { label: string; value: string }[];
  /** class for trigger */
  className?: string;
  /** class for modal container */
  modalClassName?: string;
  /** class for each option row */
  optionClassName?: string;
  /** class applied to option when selected */
  selectedOptionClassName?: string;
  /** class for modal inner box */
  modalBoxClassName?: string;
  /** class for option separator line */
  separatorClassName?: string;
  /** class for flatlist container */
  listClassName?: string;
  /** class for text inside trigger */
  triggerTextClassName?: string;
  /** class for chevron icon */
  triggerIconClassName?: string;
  /** class for option label text */
  optionTextClassName?: string;
  /** class for selected check icon */
  checkIconClassName?: string;
}

const Select = ({
  value,
  onValueChange,
  placeholder = "Select an option",
  options,
  className,
  modalClassName,
  optionClassName,
  selectedOptionClassName,
  modalBoxClassName,
  separatorClassName,
  listClassName,
  triggerTextClassName,
  triggerIconClassName,
  optionTextClassName,
  checkIconClassName,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue);
    setOpen(false);
  };

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        className={twMerge(
          "h-10 w-full flex-row items-center justify-between rounded-md border border-input bg-transparent px-3 py-2",
          className
        )}
      >
        <Text
          className={twMerge(selectedLabel ? "text-foreground" : "text-muted-foreground", triggerTextClassName)}
        >
          {selectedLabel || placeholder}
        </Text>
        <Feather name="chevron-down" size={16} className={twMerge("text-muted-foreground", triggerIconClassName)} />
      </Pressable>

      <RNModal
        animationType="fade"
        transparent={true}
        visible={open}
        onRequestClose={() => setOpen(false)}
      >
        <BlurView intensity={10} style={StyleSheet.absoluteFill}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setOpen(false)}
          />
        </BlurView>
        <View className={twMerge("flex-1 items-center justify-end p-4", modalClassName)}>
          <View className={twMerge("w-full max-w-lg rounded-lg border border-border bg-background shadow-lg", modalBoxClassName)}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <SelectOption
                  label={item.label}
                  isSelected={value === item.value}
                  onPress={() => handleSelect(item.value)}
                  optionClassName={optionClassName}
                  selectedOptionClassName={selectedOptionClassName}
                  optionTextClassName={optionTextClassName}
                  checkIconClassName={checkIconClassName}
                />
              )}
              ItemSeparatorComponent={() => (
                <View className={twMerge("h-[1px] w-full bg-border", separatorClassName)} />
              )}
              className={twMerge("max-h-60", listClassName)}
            />
          </View>
        </View>
      </RNModal>
    </>
  );
};

const SelectOption = ({
  label,
  isSelected,
  onPress,
  optionClassName,
  selectedOptionClassName,
  optionTextClassName,
  checkIconClassName,
}: {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  optionClassName?: string;
  selectedOptionClassName?: string;
  optionTextClassName?: string;
  checkIconClassName?: string;
}) => (
  <Pressable
    onPress={onPress}
    className={twMerge(
      "flex-row items-center justify-between p-4",
      optionClassName,
      isSelected && twMerge("bg-accent", selectedOptionClassName)
    )}
  >
    <Text className={twMerge("text-foreground", optionTextClassName)}>{label}</Text>
    {isSelected && <Feather name="check" size={16} className={twMerge("text-primary", checkIconClassName)} />} 
  </Pressable>
);

export { Select };
