import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Slider } from '../components/Slider';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import DemoPage from './DemoPage';

const DemoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="gap-4">{children}</CardContent>
  </Card>
);

const SliderDemo = () => {
  const [sliderValue, setSliderValue] = useState(50);
  const [steppedValue, setSteppedValue] = useState(20);

  return (
    <DemoPage
      title="Slider"
      description="An input where the user selects a value from within a range."
    >
      <DemoSection title="Default">
        <View>
          <Slider
            value={sliderValue}
            onValueChange={setSliderValue}
          />
          <Text className="text-center mt-2 text-foreground dark:text-foreground-dark">
            Value: {sliderValue.toFixed(2)}
          </Text>
        </View>
      </DemoSection>

      <DemoSection title="Stepped">
        <View>
          <Slider
            value={steppedValue}
            onValueChange={setSteppedValue}
            max={100}
            step={10}
          />
          <Text className="text-center mt-2 text-foreground dark:text-foreground-dark">
            Value: {steppedValue.toFixed(2)}
          </Text>
        </View>
      </DemoSection>

      <DemoSection title="Disabled">
        <View>
          <Slider
            value={75}
            onValueChange={() => {}}
            disabled
          />
           <Text className="text-center mt-2 text-muted-foreground dark:text-muted-foreground-dark">
            Value: 75
          </Text>
        </View>
      </DemoSection>
    </DemoPage>
  );
};

export default SliderDemo;
