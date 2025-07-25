import React from 'react';
import { Text } from 'react-native';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/Accordion';
import PropsTable from '../components/PropsTable';
import DemoPage, { DemoSection } from './DemoPage';

const AccordionDemo = () => {
  const [singleValue, setSingleValue] = React.useState<string | null>('item-1');
  const [multipleValue, setMultipleValue] = React.useState<string[]>(['item-1']);

  const propsData = [
    { name: 'value', description: 'Current selected value(s). String or array.' },
    { name: 'onValueChange', description: 'Callback invoked when selection changes.' },
    { name: 'type', description: '`single` or `multiple` accordion behavior.' },
    { name: 'AccordionItem.value', description: 'Unique identifier for each item.' },
    { name: 'className', description: 'Tailwind / NativeWind classes to override styling.' },
  ] as const;

  return (
    <DemoPage
      title="Accordion"
      description="A vertically stacked set of interactive headings that each reveal a section of content."
    >
      <DemoSection title="Props & Tailwind classes">
        <PropsTable items={propsData} />
      </DemoSection>

      <DemoSection title="Single (Default)">
        <Accordion
          type="single"
          value={singleValue}
          onValueChange={setSingleValue as (value: string | string[] | null) => void}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <Text className="text-foreground text-lg font-semibold">Is it accessible?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text className="text-muted-foreground">
                Yes. It adheres to the WAI-ARIA design pattern.
              </Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <Text className="text-foreground text-lg font-semibold">Is it styled?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text className="text-muted-foreground">
                Yes. It comes with a default style that matches the rest of the components.
              </Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <Text className="text-foreground text-lg font-semibold">Is it animated?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text className="text-muted-foreground">
                No. Animations are disabled for stability.
              </Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DemoSection>

      <DemoSection title="Multiple">
        <Accordion
          type="multiple"
          value={multipleValue}
          onValueChange={setMultipleValue as (value: string | string[] | null) => void}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <Text className="text-foreground text-lg font-semibold">Is it accessible?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text className="text-muted-foreground">
                Yes. It adheres to the WAI-ARIA design pattern.
              </Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <Text className="text-foreground text-lg font-semibold">Is it styled?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text className="text-muted-foreground">
                Yes. It comes with a default style that matches the rest of the components.
              </Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <Text className="text-foreground text-lg font-semibold">Is it animated?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text className="text-muted-foreground">
                No. Animations are disabled for stability.
              </Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DemoSection>
    </DemoPage>
  );
};

export default AccordionDemo;
