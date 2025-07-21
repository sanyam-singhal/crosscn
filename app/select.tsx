import React from 'react';
import { Text, View } from 'react-native';
import { Select } from '../components/Select';
import DemoPage from './DemoPage';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Grapes', value: 'grapes' },
  { label: 'Pineapple', value: 'pineapple' },
];

const SelectDemo = () => {
  const [value, setValue] = React.useState<string | null>(null);

  return (
    <DemoPage
      title="Select"
      description="A custom select component that displays a list of options in a modal."
    >
      <View className="w-full max-w-sm">
        <Select
          value={value}
          onValueChange={setValue}
          options={fruits}
          placeholder="Select a fruit..."
        />
        {value && (
          <Text className="text-sm text-muted-foreground mt-2">
            Selected: {value}
          </Text>
        )}
      </View>
    </DemoPage>
  );
};

export default SelectDemo;
