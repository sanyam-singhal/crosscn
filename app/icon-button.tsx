import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { IconButton } from '../components/IconButton';
import DemoPage from './DemoPage';

const DemoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-row flex-wrap items-center gap-4">{children}</CardContent>
  </Card>
);

const IconButtonDemo = () => {
  return (
    <DemoPage
      title="Icon Button"
      description="A button component that only contains an icon."
    >
      <DemoSection title="Variants">
        <IconButton icon={<Feather name="heart" />} />
        <IconButton icon={<Feather name="trash-2" />} variant="destructive" />
        <IconButton icon={<Feather name="link" />} variant="link" />
        <IconButton icon={<Feather name="star" />} variant="outline" />
        <IconButton icon={<Feather name="bell" />} variant="secondary" />
        <IconButton icon={<Feather name="camera" />} variant="ghost" />
      </DemoSection>
      <DemoSection title="Sizes">
        <IconButton icon={<Feather name="plus" />} size="sm" />
        <IconButton icon={<Feather name="plus" />} size="default" />
        <IconButton icon={<Feather name="plus" />} size="lg" />
      </DemoSection>
      <DemoSection title="Loading">
        <IconButton icon={<Feather name="loader" />} loading />
        <IconButton icon={<Feather name="save" />} variant="outline" loading />
      </DemoSection>
    </DemoPage>
  );
};

export default IconButtonDemo;
