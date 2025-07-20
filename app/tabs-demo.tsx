import React from 'react';
import { Text } from 'react-native';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/Tabs';
import DemoPage from './DemoPage';

const TabsDemo = () => {
  const [value, setValue] = React.useState('account');
  return (
    <DemoPage
      title="Tabs"
      description="A set of layered sections of content, known as tab panels, that are displayed one at a time."
    >
      <Tabs value={value} onValueChange={setValue} className="w-full max-w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Text className="text-foreground p-4">Make changes to your account here.</Text>
        </TabsContent>
        <TabsContent value="password">
          <Text className="text-foreground p-4">Change your password here.</Text>
        </TabsContent>
      </Tabs>
    </DemoPage>
  );
};

export default TabsDemo;
