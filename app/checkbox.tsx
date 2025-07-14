import React from 'react';
import { View, Text } from 'react-native';
import { Checkbox } from '../components/Checkbox';
import { DemoPage } from '../components/DemoPage';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';

const DemoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-col items-start gap-4">{children}</CardContent>
    </Card>
  );

const CheckboxDemo = () => {
  const [isChecked, setIsChecked] = React.useState(false);
  const [isCustomChecked, setIsCustomChecked] = React.useState(true);

  return (
    <DemoPage
      title="Checkbox"
      description="A control that allows the user to select one or more options from a set."
    >
        <DemoSection title="States">
            <View className="flex-row items-center gap-2">
                <Checkbox checked={isChecked} onCheckedChange={setIsChecked} />
                <Text className="text-foreground">Accept terms and conditions</Text>
            </View>
            <View className="flex-row items-center gap-2">
                <Checkbox checked disabled onCheckedChange={() => {}} />
                <Text className="text-muted-foreground">Disabled</Text>
            </View>
            <View className="flex-row items-center gap-2">
                <Checkbox checked={isCustomChecked} onCheckedChange={setIsCustomChecked} className="border-purple-500 data-[state=checked]:bg-purple-200" />
                <Text className="text-foreground">Custom Styled</Text>
            </View>
      </DemoSection>
    </DemoPage>
  );
};

export default CheckboxDemo;
