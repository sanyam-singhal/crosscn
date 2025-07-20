import React from 'react';
import { View, Text } from 'react-native';
import { Carousel } from '../components/Carousel';
import DemoPage from './DemoPage';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';

const DemoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-col items-start gap-4">{children}</CardContent>
    </Card>
  );

const carouselData = [
    { id: 1, title: 'Slide 1', content: 'This is the first slide.' },
    { id: 2, title: 'Slide 2', content: 'This is the second slide.' },
    { id: 3, title: 'Slide 3', content: 'This is the third slide.' },
];

const CarouselDemo = () => {
  const renderItem = (item: typeof carouselData[0]) => (
    <View className="p-4">
        <Card className="flex-1 justify-center items-center bg-primary/10 h-48">
            <CardHeader>
                <CardTitle className="text-primary">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <Text className="text-primary/80">{item.content}</Text>
            </CardContent>
        </Card>
    </View>
  );

  return (
    <DemoPage
      title="Carousel"
      description="A slideshow component for cycling through elements."
    >
        <DemoSection title="Example">
            <View className="h-48">
              <Carousel data={carouselData} renderItem={renderItem} />
            </View>
      </DemoSection>
    </DemoPage>
  );
};

export default CarouselDemo;
