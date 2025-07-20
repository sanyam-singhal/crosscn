import React from 'react';
import { View } from 'react-native';
import { Skeleton } from '../components/Skeleton';
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

const SkeletonDemo = () => {
  return (
    <DemoPage
      title="Skeleton"
      description="Use to show a placeholder while content is loading."
    >
        <DemoSection title="Example">
            <View className="flex-row items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <View className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </View>
            </View>
      </DemoSection>
    </DemoPage>
  );
};

export default SkeletonDemo;
