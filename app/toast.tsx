import React from 'react';
import { View } from 'react-native';
import { Button } from '../components/Button';
import { useToast } from '../components/Toast';
import { DemoPage } from './DemoPage';

const ToastDemo = () => {
  const { show } = useToast();

  return (
    <DemoPage
      title="Toast"
      description="A succinct message that appears temporarily to provide feedback or information."
    >
      <View className="flex-col items-start gap-4">
        <Button
          label="Show Default Toast"
          onPress={() =>
            show({
              title: 'Heads up!',
              description: 'This is a toast notification.',
            })
          }
        />
        <Button
          label="Show Destructive Toast"
          variant="destructive"
          onPress={() =>
            show({
              title: 'Error!',
              description: 'Something went wrong.',
              variant: 'destructive',
            })
          }
        />
      </View>
    </DemoPage>
  );
};

export default ToastDemo;
