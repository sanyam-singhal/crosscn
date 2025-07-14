import React from 'react';
import { ScrollView, View } from 'react-native';
import { Input } from '../../components/Input';
import { Feather } from '@expo/vector-icons';

const InputsDemo = () => {
  return (
    <ScrollView className="p-4">
      <View className="gap-4">
        <Input placeholder="Default Input" />
        <Input placeholder="Input with Icon" iconLeft={<Feather name="search" />} />
        <Input placeholder="Disabled Input" disabled />
        <Input placeholder="Input with Error" error="This field is required" />
        <Input placeholder="Custom Style" className="border-purple-600" />
      </View>
    </ScrollView>
  );
};

export default InputsDemo;
