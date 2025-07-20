import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '../components/RadioGroup';
import DemoPage from './DemoPage';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Text } from 'react-native';

const DemoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-col items-start gap-4">{children}</CardContent>
    </Card>
  );

const RadioGroupDemo = () => {
  const [value, setValue] = useState<string | null>('option-one');

  return (
    <DemoPage
      title="Radio Group"
      description="A set of checkable buttons—known as radio buttons—where only one can be selected at a time."
    >
        <DemoSection title="Example">
            <RadioGroup value={value} onValueChange={setValue} className="gap-4">
                <RadioGroupItem value="option-one" label="Option One" />
                <RadioGroupItem value="option-two" label="Option Two" />
                <RadioGroupItem value="option-three" label="Option Three" />
            </RadioGroup>
            <Text className="text-muted-foreground text-sm mt-2">Selected: {value}</Text>
      </DemoSection>
    </DemoPage>
  );
};

export default RadioGroupDemo;
