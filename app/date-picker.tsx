import React from 'react';
import { DatePicker } from '../components/DatePicker';
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

const DatePickerDemo = () => {
  const [date, setDate] = React.useState<Date | null>(new Date());

  return (
    <DemoPage
      title="Date Picker"
      description="A component that allows users to select a date from a calendar."
    >
        <DemoSection title="Example">
            <DatePicker date={date} onDateChange={setDate} />
      </DemoSection>
    </DemoPage>
  );
};

export default DatePickerDemo;
