import React from 'react';
import { Text } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '../components/Avatar';
import PropsTable from '../components/PropsTable';
import DemoPage, { DemoSection } from './DemoPage';

const AvatarDemo = () => {
  const propsData = [
    { name: 'Avatar.className', description: 'Tailwind classes applied to outer wrapper.' },
    { name: 'AvatarImage.source', description: 'Image source object or URI.' },
    { name: 'AvatarImage.className', description: 'Tailwind classes for image.' },
    { name: 'AvatarFallback.className', description: 'Tailwind classes for fallback circle.' },
    { name: 'AvatarFallback.children', description: 'ReactNode shown when image fails.' },
  ] as const;
  return (
    <DemoPage
      title="Avatar"
      description="An image element with a fallback for representing a user."
    >
      <DemoSection title="Props & Tailwind classes">
        <PropsTable items={propsData} />
      </DemoSection>

      <DemoSection title="Examples">
        <Avatar>
          <AvatarImage source={{ uri: 'https://github.com/shadcn.png' }} />
          <AvatarFallback>
            <Text className="text-white text-lg font-bold">CN</Text>
          </AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage source={{ uri: 'https://github.com/not-a-real-user.png' }} />
          <AvatarFallback>
            <Text className="text-white text-lg font-bold">JD</Text>
          </AvatarFallback>
        </Avatar>
        <Avatar className="bg-blue-500">
          <AvatarFallback>
            <Text className="text-white text-lg font-bold">SL</Text>
          </AvatarFallback>
        </Avatar>
      </DemoSection>
    </DemoPage>
  );
};

export default AvatarDemo;
