import React from 'react';
import { Text, View } from 'react-native';
import { ScrollArea } from '../components/ScrollArea';
import DemoPage from './DemoPage';

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

const ScrollAreaDemo = () => {
  return (
    <DemoPage
      title="Scroll Area"
      description="A scrollable area for displaying content that exceeds the screen size."
    >
      <View className="h-72 w-full max-w-sm rounded-md border border-border">
        <ScrollArea className="p-4">
          <Text className="text-lg font-semibold text-foreground mb-2">Tags</Text>
          {tags.map((tag) => (
            <View key={tag} className="mb-2 rounded-md border border-border p-2">
              <Text className="text-foreground">{tag}</Text>
            </View>
          ))}
        </ScrollArea>
      </View>
    </DemoPage>
  );
};

export default ScrollAreaDemo;
