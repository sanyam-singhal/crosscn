import React from 'react';
import { Badge } from '../components/Badge';
import PropsTable from '../components/PropsTable';
import DemoPage, { DemoSection } from './DemoPage';

const BadgeDemo = () => {
  const propsData = [
    { name: 'label', description: 'Text shown inside the badge.' },
    { name: 'variant', description: '`default` | `secondary` | `destructive` | `outline`.' },
    { name: 'className', description: 'Tailwind classes for badge container.' },
  ] as const;
  return (
    <DemoPage
      title="Badge"
      description="Displays a badge or a component that looks like a badge."
    >
      <DemoSection title="Props & Tailwind classes">
        <PropsTable items={propsData} />
      </DemoSection>

      <DemoSection title="Variants">
        <Badge label="Default" />
        <Badge label="Secondary" variant="secondary" />
        <Badge label="Destructive" variant="destructive" />
        <Badge label="Outline" variant="outline" />
      </DemoSection>
    </DemoPage>
  );
};

export default BadgeDemo;
