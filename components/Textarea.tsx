import React from "react";
import {
  TextInput,
  View,
  Text,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
} from "react-native";
import { twMerge } from "tailwind-merge";


interface TextareaProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
  error?: string;
  autoGrow?: boolean;
  rows?: number;
  /** Extra classes for outer container */
  containerClassName?: string;
  /** Extra classes for error text */
  errorClassName?: string;
}

const Textarea = React.forwardRef<TextInput, TextareaProps>(
  ({ className, error, autoGrow, rows = 4, containerClassName, errorClassName, ...props }, ref) => {
    const [height, setHeight] = React.useState(0);

    const textareaClasses = twMerge(
      "w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      error && "border-destructive",
      className
    );

    const handleContentSizeChange = (
      event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
    ) => {
      if (autoGrow) {
        setHeight(event.nativeEvent.contentSize.height);
      }
      if (props.onContentSizeChange) {
        props.onContentSizeChange(event);
      }
    };

    const minHeight = rows * 20; // Approximate height for a row

    return (
      <View className={twMerge("w-full", containerClassName)}>
        <TextInput
          ref={ref}
          className={textareaClasses}
          style={[{ minHeight }, autoGrow && { height }]}
          multiline
          onContentSizeChange={handleContentSizeChange}
          {...props}
        />
        {error && (
          <Text className={twMerge("mt-1 text-sm text-destructive", errorClassName)}>{error}</Text>
        )}
      </View>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
