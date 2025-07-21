import React from 'react';
import { Chart } from '../components/Chart';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import DemoPage from './DemoPage';

const DemoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card className="mb-6 w-full">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-col gap-4">{children}</CardContent>
  </Card>
);

const chartData = [
  { x: 1, y: 10 },
  { x: 2, y: 25 },
  { x: 3, y: 15 },
  { x: 4, y: 30 },
  { x: 5, y: 20 },
];

const ChartDemo = () => {
  return (
    <DemoPage
      title="Chart"
      description="A placeholder for charts. Requires a charting library like 'victory-native'."
    >
      <DemoSection title="Types">
        <Chart type="bar" data={chartData} />
        <Chart type="line" data={chartData} />
        <Chart type="spark" data={chartData} />
      </DemoSection>
    </DemoPage>
  );
};

export default ChartDemo;
