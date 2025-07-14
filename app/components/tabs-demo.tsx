import React from 'react';
import { Text } from 'react-native';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/Tabs';

const TabsDemo = () => {
  const [value, setValue] = React.useState('account');
  return (
    <Tabs value={value} onValueChange={setValue} className="w-[400px] p-4">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Text>Make changes to your account here.</Text>
      </TabsContent>
      <TabsContent value="password">
        <Text>Change your password here.</Text>
      </TabsContent>
    </Tabs>
  );
};

export default TabsDemo;
