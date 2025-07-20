import React from 'react';
import { View, Text } from 'react-native';
import { Switch } from '../components/Switch';
import DemoPage from './DemoPage';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';

const DemoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-col items-start gap-4">{children}</CardContent>
    </Card>
  );

const SwitchDemo = () => {
  const [isChecked, setIsChecked] = React.useState(false);
  const [isCustomChecked, setIsCustomChecked] = React.useState(true);
  const [isLargeChecked, setIsLargeChecked] = React.useState(true);

  return (
    <DemoPage
      title="Switch"
      description="A control that allows the user to toggle between two states."
    >
        <DemoSection title="States & Sizes">
            <View className="flex-row items-center gap-2">
                <Switch checked={isChecked} onCheckedChange={setIsChecked} size="sm" />
                <Text className="text-foreground">Small</Text>
            </View>
            <View className="flex-row items-center gap-2">
                <Switch checked={isCustomChecked} onCheckedChange={setIsCustomChecked} />
                <Text className="text-foreground">Default</Text>
            </View>
            <View className="flex-row items-center gap-2">
                <Switch checked={isLargeChecked} onCheckedChange={setIsLargeChecked} size="lg" />
                <Text className="text-foreground">Large</Text>
            </View>
            <View className="flex-row items-center gap-2">
                <Switch checked disabled onCheckedChange={() => {}} />
                <Text className="text-muted-foreground">Disabled</Text>
            </View>
      </DemoSection>
    </DemoPage>
  );
};

export default SwitchDemo;
