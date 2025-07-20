import React from 'react';
import { Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { DropdownMenu } from '../components/DropdownMenu';
import { PopoverPlacement } from 'react-native-popover-view';
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

const DropdownMenuDemo = () => {
  const menuItems = [
    {
      label: 'Profile',
      onSelect: () => Alert.alert('Profile selected'),
      icon: <Feather name="user" size={14} />,
    },
    {
      label: 'Settings',
      onSelect: () => Alert.alert('Settings selected'),
      icon: <Feather name="settings" size={14} />,
    },
    {
      label: 'Logout',
      onSelect: () => Alert.alert('Logout selected'),
      icon: <Feather name="log-out" size={14} />,
      destructive: true,
    },
  ];

  return (
    <DemoPage
      title="Dropdown Menu"
      description="Displays a menu to the user — such as a set of actions or functions — triggered by a button."
    >
        <DemoSection title="Example">
            <DropdownMenu
                trigger={<Button label="Open Menu" />}
                items={menuItems}
                placement={PopoverPlacement.BOTTOM}
            />
      </DemoSection>
    </DemoPage>
  );
};

export default DropdownMenuDemo;
