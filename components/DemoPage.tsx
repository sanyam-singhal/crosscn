import React from 'react';
import { ScrollView, View, Text } from 'react-native';

interface DemoPageProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const DemoPage = ({ title, description, children }: DemoPageProps) => {
  return (
    <ScrollView className="bg-background flex-1">
      <View className="p-4 lg:p-6">
        <View className="mb-4">
          <Text className="text-3xl font-bold tracking-tight text-foreground">{title}</Text>
          <Text className="mt-2 text-lg text-muted-foreground">{description}</Text>
        </View>
        <View>{children}</View>
      </View>
    </ScrollView>
  );
};

export { DemoPage };
