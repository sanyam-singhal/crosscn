import React from 'react';
import { AlertDialog } from '../components/AlertDialog';
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

const AlertDialogDemo = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <DemoPage
      title="Alert Dialog"
      description="A modal dialog that interrupts the user with important content and expects a response."
    >
        <DemoSection title="Example">
            <Button label="Show Dialog" onPress={() => setIsOpen(true)} />
            <AlertDialog
                open={isOpen}
                onOpenChange={setIsOpen}
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
                onConfirm={() => console.log('Confirmed!')}
            />
      </DemoSection>
    </DemoPage>
  );
};

export default AlertDialogDemo;
