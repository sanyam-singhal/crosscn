import React from 'react';
import { Stack } from 'expo-router';

export default function ComponentsLayout() {
  return (
    <Stack>
      <Stack.Screen name="buttons" options={{ title: 'Buttons' }} />
      <Stack.Screen name="inputs" options={{ title: 'Inputs' }} />
      <Stack.Screen name="checkbox" options={{ title: 'Checkbox' }} />
      <Stack.Screen name="toast" options={{ title: 'Toast' }} />
      <Stack.Screen name="tabs-demo" options={{ title: 'Tabs' }} />
    </Stack>
  );
}
