import React from 'react';
import { Text, View } from 'react-native';
import { Marquee } from '../components/Marquee';
import DemoPage from './DemoPage';

const MarqueeDemo = () => {
  return (
    <DemoPage
      title="Marquee"
      description="A component that scrolls its content horizontally."
    >
      <View className="w-full p-4 bg-muted rounded-lg">
        <Marquee>
          <Text className="text-lg text-foreground">
            This is a scrolling marquee. It can be used to display long text or a series of items in a limited space. 
          </Text>
        </Marquee>
      </View>
      <View className="w-full p-4 bg-muted rounded-lg mt-4">
        <Marquee speed={2}>
          <Text className="text-lg text-foreground font-bold">
            Faster Marquee! This one scrolls at twice the speed. 
          </Text>
        </Marquee>
      </View>
    </DemoPage>
  );
};

export default MarqueeDemo;
