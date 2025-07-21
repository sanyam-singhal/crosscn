import React from 'react';
import { Text, View } from 'react-native';
import { NavigationMenu } from '../components/NavigationMenu';
import DemoPage from './DemoPage';

const NavigationMenuDemo = () => {
  const [active, setActive] = React.useState('Overview');

  const navItems = [
    { name: 'Overview', onPress: () => setActive('Overview') },
    { name: 'Customers', onPress: () => setActive('Customers') },
    { name: 'Products', onPress: () => setActive('Products') },
    { name: 'Settings', onPress: () => setActive('Settings') },
  ];

  return (
    <DemoPage
      title="Navigation Menu"
      description="A simple navigation menu component."
    >
      <View className="w-full max-w-sm">
        <NavigationMenu items={navItems} activeItem={active} />
        <View className="mt-4 p-4 h-32 items-center justify-center bg-muted rounded-lg">
          <Text className="text-lg text-foreground">Content for {active}</Text>
        </View>
      </View>
    </DemoPage>
  );
};

export default NavigationMenuDemo;
