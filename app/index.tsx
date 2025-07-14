import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-background p-4">
      <Feather name="layout" size={48} className="text-primary mb-4" />
      <Text className="text-2xl font-bold text-foreground mb-2">Component Library</Text>
      <Text className="text-lg text-muted-foreground text-center">
        Select a component from the sidebar to view its documentation and examples.
      </Text>
    </View>
  );
}
