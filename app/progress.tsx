import React from 'react';
import { Progress } from '../components/Progress';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import DemoPage from './DemoPage';

const DemoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-col items-start gap-4">{children}</CardContent>
  </Card>
);

const ProgressDemo = () => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DemoPage
      title="Progress"
      description="Displays an indicator showing the completion progress of a task."
    >
      <DemoSection title="Examples">
        <Progress value={progress} className="w-[80%]" />
        <Progress value={10} className="w-[80%]" />
        <Progress value={90} className="w-[80%]" indicatorClassName="bg-green-500" />
      </DemoSection>
    </DemoPage>
  );
};

export default ProgressDemo;
