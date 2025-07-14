import React, { useState } from "react";
import { View, Text, Pressable, Platform } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { twMerge } from "tailwind-merge";
import { Feather } from "@expo/vector-icons";
import { format } from "date-fns";

interface DatePickerProps {
  date: Date | null;
  onDateChange: (date: Date | null) => void;
  /** Placeholder text when no date selected */
  placeholder?: string;
  /** Tailwind classes for the interactive trigger */
  className?: string;
  /** Tailwind classes for the containing wrapper */
  containerClassName?: string;
  /** Extra classes for the displayed text */
  textClassName?: string;
  /** Extra classes for the calendar icon */
  iconClassName?: string;
}

const DatePicker = ({
  date,
  onDateChange,
  placeholder = "Pick a date",
  className,
  containerClassName,
  textClassName,
  iconClassName,
}: DatePickerProps) => {
  const [show, setShow] = useState(false);

  const onNativeChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "dismissed") {
      setShow(false);
      return;
    }
    const currentDate = selectedDate || date || new Date();
    setShow(Platform.OS === "ios");
    onDateChange(currentDate);
  };

  const open = () => setShow(true);
  const close = () => setShow(false);

  if (Platform.OS === "web") {
    // Web implementation via <input type="date"> for broad browser support
    return (
      <View className={containerClassName} style={{ alignSelf: "stretch" }}>
        {React.createElement("input", {
          type: "date",
          value: date ? format(date, "yyyy-MM-dd") : undefined,
          onChange: (e: any) => {
            const value = (e.target as HTMLInputElement).value;
            if (value) onDateChange(new Date(value + "T00:00:00"));
            else onDateChange(null);
          },
          className: twMerge(
            "h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-foreground",
            !date && "text-muted-foreground",
            className
          ),
        })}
      </View>
    );
  }

  // Native (iOS/Android)
  return (
    <View className={containerClassName}>
      <Pressable
        onPress={open}
        className={twMerge(
          "h-10 w-full flex-row items-center justify-between rounded-md border border-input bg-transparent px-3 py-2",
          className
        )}
      >
        <Text className={twMerge(date ? "text-foreground" : "text-muted-foreground", textClassName)}>
          {date ? format(date, "PPP") : placeholder}
        </Text>
        <Feather name="calendar" size={16} className={twMerge("text-muted-foreground", iconClassName)} />
      </Pressable>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={onNativeChange}
          onTouchCancel={close}
        />
      )}
    </View>
  );
};

export { DatePicker };
