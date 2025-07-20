import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Sheet } from '../components/Sheet';
import { Button } from '../components/Button';
import DemoPage from './DemoPage';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Input } from '../components/Input';

const DemoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-col items-start gap-4">{children}</CardContent>
    </Card>
  );

const SheetDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <DemoPage
      title="Sheet"
      description="Extends the Dialog component to display content that complements the main screen."
      overlay={
        <Sheet open={open} onOpenChange={setOpen}>
            <View className="p-4">
                <Text className="text-lg font-semibold text-foreground">Edit Profile</Text>
                <Text className="text-muted-foreground text-sm">Make changes to your profile here. Click save when you&apos;re done.</Text>
            </View>
            <View className="p-4 gap-4">
                <View>
                    <Text className="text-sm text-muted-foreground mb-2">Name</Text>
                    <Input defaultValue="John Doe" />
                </View>
                <View>
                    <Text className="text-sm text-muted-foreground mb-2">Username</Text>
                    <Input defaultValue="@johndoe" />
                </View>
            </View>
            <View className="p-4 mt-auto">
                <Button label="Save Changes" onPress={() => setOpen(false)} />
            </View>
        </Sheet>
      }
    >
        <DemoSection title="Example">
            <Button label="Open Sheet" onPress={() => setOpen(true)} />
      </DemoSection>
    </DemoPage>
  );
};

export default SheetDemo;
