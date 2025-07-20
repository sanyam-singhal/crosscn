import React from 'react';
import { View } from 'react-native';
import { Input } from '../components/Input';
import { Feather } from '@expo/vector-icons';
import DemoPage from './DemoPage';

const InputsDemo = () => {
  return (
    <DemoPage
      title="Inputs"
      description="A component that allows users to input text."
    >
      <View className="gap-4">
        <Input placeholder="Default Input" />
        <Input placeholder="Input with Icon" iconLeft={<Feather name="search" className="text-muted-foreground" />} />
        <Input placeholder="Disabled Input" disabled />
        <Input placeholder="Custom Style" className="border-purple-600 focus:border-purple-700" />
      </View>
    </DemoPage>
  );
};

export default InputsDemo;
