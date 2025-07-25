import React from 'react';
import { AlertDialog } from '../components/AlertDialog';
import { Button } from '../components/Button';
import PropsTable from '../components/PropsTable';
import DemoPage, { DemoSection } from './DemoPage';

const AlertDialogDemo = () => {
    const [openExample1, setOpenExample1] = React.useState(false);
  const [openExample2, setOpenExample2] = React.useState(false);
  const [openExample3, setOpenExample3] = React.useState(false);
  const [openExample4, setOpenExample4] = React.useState(false);

  const propsData = [
    { name: 'open', description: 'Boolean controlling dialog visibility.' },
    { name: 'onOpenChange', description: 'Callback when open state changes.' },
    { name: 'title', description: 'Dialog title string.' },
    { name: 'description', description: 'Supporting descriptive text.' },
    { name: 'confirmText', description: 'Label for confirm button.' },
    { name: 'cancelText', description: 'Label for cancel button.' },
    { name: 'onConfirm', description: 'Handler executed on confirmation.' },
    { name: 'onCancel', description: 'Optional handler on cancel.' },
    { name: 'contentClassName', description: 'Tailwind classes for modal container.' },
    { name: 'confirmButtonProps', description: 'Extra props forwarded to the confirm button (e.g. className, disabled, loading).' },
    { name: 'cancelButtonProps', description: 'Extra props forwarded to the cancel button.' },
  ] as const;

  return (
    <DemoPage
      title="Alert Dialog"
      description="A modal dialog that interrupts the user with important content and expects a response."
    >
        <DemoSection title="Props & Tailwind classes">
        <PropsTable items={propsData} />
      </DemoSection>

      <DemoSection title="Basic Example">
            <Button label="Show Dialog" onPress={() => setOpenExample1(true)} />
            <AlertDialog
                open={openExample1}
                onOpenChange={setOpenExample1}
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
                onConfirm={() => console.log('Confirmed!')}
            />
      </DemoSection>

      <DemoSection title="Destructive action (custom texts)">
        <Button label="Delete Account" variant="destructive" onPress={() => setOpenExample2(true)} />
        <AlertDialog
          open={openExample2}
          onOpenChange={setOpenExample2}
          title="Delete your account?"
          description="All your data will be permanently removed. This action is not reversible."
          confirmText="Delete"
          cancelText="Keep account"
          onConfirm={() => console.log('Account deleted')}
        />
      </DemoSection>

      <DemoSection title="Custom styling via className">
        <Button label="Show Styled Dialog" onPress={() => setOpenExample3(true)} />
        <AlertDialog
          open={openExample3}
          onOpenChange={setOpenExample3}
          title="Subscribe to newsletter?"
          description="We will occasionally send you updates."
          confirmText="Subscribe"
          cancelText="No thanks"
          contentClassName="bg-primary dark:bg-primary-dark"
          onConfirm={() => console.log('Subscribed')}
        />
      </DemoSection>

      <DemoSection title="Custom buttons">
        <Button label="Open Dialog" variant="secondary" onPress={() => setOpenExample4(true)} />
        <AlertDialog
          open={openExample4}
          onOpenChange={setOpenExample4}
          title="Save changes?"
          description="You have unsaved progress. Would you like to save before leaving?"
          confirmText="Save"
          cancelText="Discard"
          confirmButtonProps={{ variant: 'secondary' }}
          cancelButtonProps={{ variant: 'ghost' }}
          onConfirm={() => console.log('Saved')}
        />
      </DemoSection>
     </DemoPage>
  );
};

export default AlertDialogDemo;
