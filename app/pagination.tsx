import React from 'react';
import { Text, View } from 'react-native';
import { Pagination } from '../components/Pagination';
import DemoPage from './DemoPage';

const PaginationDemo = () => {
  const [page, setPage] = React.useState(1);
  const pageCount = 10;

  return (
    <DemoPage
      title="Pagination"
      description="A component for navigating between pages of content."
    >
      <View className="items-center gap-4">
        <View className="h-24 w-full items-center justify-center rounded-lg bg-muted">
          <Text className="text-2xl font-medium text-foreground">
            Content for Page {page}
          </Text>
        </View>
        <Pagination
          page={page}
          pageCount={pageCount}
          onPageChange={setPage}
        />
      </View>
    </DemoPage>
  );
};

export default PaginationDemo;
