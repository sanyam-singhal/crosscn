import React from 'react';
import { ScrollView, View, Text } from 'react-native';

interface DemoPageProps {
  title: string;
  description: string;
  children: React.ReactNode;
  overlay?: React.ReactNode;
}

const DemoPage = ({ title, description, children, overlay }: DemoPageProps) => {
  return (
    <View className="flex-1">
      <ScrollView className="bg-background dark:bg-background-dark flex-1">
        <View className="p-4 lg:p-6">
          <View className="mb-4">
            <Text className="text-3xl font-bold tracking-tight text-foreground dark:text-foreground-dark">{title}</Text>
            <Text className="mt-2 text-lg text-muted-foreground dark:text-muted-foreground-dark">{description}</Text>
          </View>
          <View>{children}</View>
        </View>
      </ScrollView>
      {overlay}
    </View>
  );
};

export default DemoPage;
