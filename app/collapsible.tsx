import React from 'react';
import { View, Text } from 'react-native';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/Collapsible';
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

const CollapsibleDemo = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <DemoPage
      title="Collapsible"
      description="An interactive component which expands or collapses a panel."
    >
        <DemoSection title="Example">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <View className="flex-row items-center justify-between w-full">
                    <Text className="text-foreground font-semibold">@peduarte starred 3 repositories</Text>
                    <CollapsibleTrigger>
                        <Text className="text-primary font-semibold p-2">{isOpen ? 'Hide' : 'Show'}</Text>
                    </CollapsibleTrigger>
                </View>
                <CollapsibleContent>
                    <View className="mt-4 p-4 bg-muted/50 rounded-lg">
                        <Text className="text-foreground">This is the collapsible content.</Text>
                    </View>
                </CollapsibleContent>
            </Collapsible>
      </DemoSection>
    </DemoPage>
  );
};

export default CollapsibleDemo;
