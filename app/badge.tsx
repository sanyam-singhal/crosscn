import React from 'react';
import { Badge } from '../components/Badge';
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

const BadgeDemo = () => {
  return (
    <DemoPage
      title="Badge"
      description="Displays a badge or a component that looks like a badge."
    >
      <DemoSection title="Variants">
        <Badge label="Default" />
        <Badge label="Secondary" variant="secondary" />
        <Badge label="Destructive" variant="destructive" />
        <Badge label="Outline" variant="outline" />
      </DemoSection>
    </DemoPage>
  );
};

export default BadgeDemo;
