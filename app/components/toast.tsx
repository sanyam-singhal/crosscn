import React from 'react';
import { View } from 'react-native';
import { Button } from '../../components/Button';
import { useToast } from '../../components/Toast';

const ToastDemo = () => {
  const { show } = useToast();

  return (
    <View className="p-4">
      <Button
        label="Show Toast"
        onPress={() =>
          show({
            title: 'Heads up!',
            description: 'This is a toast notification.',
          })
        }
      />
    </View>
  );
};

export default ToastDemo;
