import React from 'react';
import { Text } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '../components/Avatar';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import DemoPage from './DemoPage';

const DemoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-row flex-wrap items-center gap-4">{children}</CardContent>
  </Card>
);

const AvatarDemo = () => {
  return (
    <DemoPage
      title="Avatar"
      description="An image element with a fallback for representing a user."
    >
      <DemoSection title="Examples">
        <Avatar>
          <AvatarImage source={{ uri: 'https://github.com/shadcn.png' }} />
          <AvatarFallback>
            <Text className="text-white text-lg font-bold">CN</Text>
          </AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage source={{ uri: 'https://github.com/not-a-real-user.png' }} />
          <AvatarFallback>
            <Text className="text-white text-lg font-bold">JD</Text>
          </AvatarFallback>
        </Avatar>
        <Avatar className="bg-blue-500">
          <AvatarFallback>
            <Text className="text-white text-lg font-bold">SL</Text>
          </AvatarFallback>
        </Avatar>
      </DemoSection>
    </DemoPage>
  );
};

export default AvatarDemo;
