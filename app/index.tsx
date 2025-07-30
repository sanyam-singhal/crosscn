import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-background dark:bg-background-dark p-4">
      <Feather name="star" size={48} className="text-primary dark:text-primary-dark mb-4" />
      <Text className="text-2xl font-bold text-foreground dark:text-foreground-dark mb-2">CrossCN</Text>
      <Text className="text-lg text-muted-foreground dark:text-muted-foreground-dark text-center">
        Select a component from the sidebar to view its documentation and examples.
      </Text>
    </View>
  );
}
