import React from 'react';
import { View } from 'react-native';
import { Textarea } from '../components/Textarea';
import { Label } from '../components/Label';
import { Button } from '../components/Button';
import DemoPage from './DemoPage';

const TextareaDemo = () => {
  return (
    <DemoPage
      title="Textarea"
      description="A multi-line text input for longer form content."
    >
      <View className="w-full max-w-sm items-center gap-4">
        <View className="w-full grid gap-1.5">
          <Label>Your Message</Label>
          <Textarea placeholder="Type your message here." />
        </View>
        <Button label="Send message" />
      </View>
    </DemoPage>
  );
};

export default TextareaDemo;
