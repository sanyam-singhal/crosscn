import React from 'react';
import { View, Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

export interface PropsTableItem {
  name: string;
  description: string;
}

interface PropsTableProps {
  /**
   * Array of rows – each with a `name` (prop / class) and a `description`.
   */
  items: readonly PropsTableItem[];
  /** Optional extra Tailwind / NativeWind classes for the wrapping container */
  className?: string;
}

/**
 * Simple two-column table rendered with flexbox so it works on both web & native.
 */
const PropsTable = ({ items, className }: PropsTableProps) => {
  return (
    <View
      className={twMerge(
        'border border-border rounded-md overflow-hidden bg-card',
        className,
      )}
    >
      {items.map((item, idx) => (
        <View
          key={item.name}
          className={twMerge(
            'flex-row px-4 py-2',
            idx !== items.length - 1 && 'border-b border-border',
          )}
        >
          <Text className="w-1/3 font-medium text-foreground dark:text-foreground-dark">
            {item.name}
          </Text>
          <Text className="w-2/3 text-muted-foreground dark:text-muted-foreground-dark">
            {item.description}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default PropsTable;
