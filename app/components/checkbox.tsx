import React from 'react';
import { View, Text } from 'react-native';
import { Checkbox } from '../../components/Checkbox';

const CheckboxDemo = () => {
  const [isChecked, setIsChecked] = React.useState(false);
  const [isCustomChecked, setIsCustomChecked] = React.useState(true);

  return (
    <View className="p-4 items-start gap-4">
        <View className="flex-row items-center gap-2">
            <Checkbox checked={isChecked} onCheckedChange={setIsChecked} />
            <Text>Accept terms and conditions</Text>
        </View>
        <Checkbox checked disabled onCheckedChange={() => {}} />
        <Checkbox checked={isCustomChecked} onCheckedChange={setIsCustomChecked} className="border-purple-500" />
    </View>
  );
};

export default CheckboxDemo;
