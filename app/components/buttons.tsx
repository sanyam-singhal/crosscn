import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from '../../components/Button';
import { IconButton } from '../../components/IconButton';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/Card';
import { Feather } from '@expo/vector-icons';

const DemoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-row flex-wrap gap-2">{children}</CardContent>
  </Card>
);

const ButtonsDemo = () => {
  return (
    <ScrollView className="p-4">
      <DemoSection title="Button Variants">
        <Button label="Default" />
        <Button label="Outline" variant="outline" />
        <Button label="Destructive" variant="destructive" />
        <Button label="Secondary" variant="secondary" />
        <Button label="Ghost" variant="ghost" />
        <Button label="Link" variant="link" />
        <Button label="Loading" loading />
        <Button label="Custom Style" className="bg-purple-600" textClassName="text-white" />
      </DemoSection>

      <DemoSection title="Icon Buttons">
        <IconButton icon={<Feather name="home" />} />
        <IconButton icon={<Feather name="save" />} variant="outline" />
        <IconButton icon={<Feather name="bluetooth" />} variant="secondary" />
        <IconButton icon={<Feather name="wifi" />} variant="ghost" />
        <IconButton icon={<Feather name="link" />} variant="link" />
        <IconButton icon={<Feather name="loader" />} loading />
        <IconButton icon={<Feather name="trash" />} variant="destructive" iconClassName="text-red-500" />
      </DemoSection>
    </ScrollView>
  );
};

export default ButtonsDemo;
