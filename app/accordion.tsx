import React from 'react';
import { Text } from 'react-native';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/Accordion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import DemoPage from './DemoPage';

const DemoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const AccordionDemo = () => {
  const [singleValue, setSingleValue] = React.useState<string | null>('item-1');
  const [multipleValue, setMultipleValue] = React.useState<string[]>(['item-1']);

  return (
    <DemoPage
      title="Accordion"
      description="A vertically stacked set of interactive headings that each reveal a section of content."
    >
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
                Yes. It&apos;s animated by default, but you can disable it if you prefer.
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
                Yes. It&apos;s animated by default, but you can disable it if you prefer.
              </Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DemoSection>
    </DemoPage>
  );
};

export default AccordionDemo;
