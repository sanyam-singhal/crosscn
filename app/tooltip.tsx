import React from 'react';
import { Tooltip } from '../components/Tooltip';
import { Button } from '../components/Button';
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

const TooltipDemo = () => {
  return (
    <DemoPage
      title="Tooltip"
      description="A popup that displays information related to an element when the element receives keyboard focus or the user hovers over it."
    >
        <DemoSection title="Example">
            <Tooltip content="This is a tooltip">
                <Button label="Hover over me" />
            </Tooltip>
      </DemoSection>
    </DemoPage>
  );
};

export default TooltipDemo;
