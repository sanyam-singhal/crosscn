import React from 'react';
import { Button } from '../components/Button';
import { IconButton } from '../components/IconButton';
import PropsTable from '../components/PropsTable';
import { Feather } from '@expo/vector-icons';
import DemoPage, { DemoSection } from './DemoPage';

const ButtonsDemo = () => {
  const propsData = [
    { name: 'label', description: 'Text content of the button.' },
    { name: 'variant', description: '`default` | `destructive` | `outline` | `secondary` | `ghost` | `link`.' },
    { name: 'size', description: '`default` | `sm` | `lg`.' },
    { name: 'loading', description: 'Shows ActivityIndicator when true.' },
    { name: 'className', description: 'Tailwind classes for Pressable container.' },
    { name: 'textClassName', description: 'Tailwind classes for inner Text.' },
  ] as const;
  return (
    <DemoPage
      title="Buttons"
      description="Displays a button or a component that looks like a button."
    >
      <DemoSection title="Props & Tailwind classes">
        <PropsTable items={propsData} />
      </DemoSection>

      <DemoSection title="Variants">
        <Button label="Default" />
        <Button label="Outline" variant="outline" />
        <Button label="Destructive" variant="destructive" />
        <Button label="Secondary" variant="secondary" />
        <Button label="Ghost" variant="ghost" />
        <Button label="Link" variant="link" />
      </DemoSection>

      <DemoSection title="States">
        <Button label="Loading" loading />
        <Button label="Custom Style" className="bg-purple-600" textClassName="text-white" />
      </DemoSection>

      <DemoSection title="Icon Buttons">
        <IconButton icon={<Feather name="home" />} />
        <IconButton icon={<Feather name="save" />} variant="outline" />
        <IconButton icon={<Feather name="bluetooth" />} variant="secondary" />
        <IconButton icon={<Feather name="wifi" />} variant="ghost" />
        <IconButton icon={<Feather name="link" />} variant="link" />
        <IconButton icon={<Feather name="loader" />} loading />
        <IconButton icon={<Feather name="trash" />} variant="destructive" iconClassName="text-red-500" />
      </DemoSection>
    </DemoPage>
  );
};

export default ButtonsDemo;
