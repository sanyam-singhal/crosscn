import React from 'react';
import { Text } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/Card';
import DemoPage from './DemoPage';

const CardDemo = () => {
  return (
    <DemoPage
      title="Card"
      description="Cards are used to group and display content in a clear and concise way."
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <Text className="text-foreground">This is the card content. You can put any component you want in here.</Text>
        </CardContent>
        <CardFooter>
          <Text className="text-muted-foreground">Card Footer</Text>
        </CardFooter>
      </Card>
    </DemoPage>
  );
};

export default CardDemo;
