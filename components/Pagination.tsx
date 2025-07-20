import * as React from 'react';
import { View, Text } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { Feather } from '@expo/vector-icons';
import { IconButton } from './IconButton';

interface PaginationProps extends React.ComponentPropsWithoutRef<typeof View> {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Extra classes for the page info text */
  textClassName?: string;
}

const Pagination = React.forwardRef<View, PaginationProps>(
  ({ page, pageCount, onPageChange, className, textClassName, ...props }, ref) => {
    const handlePrevious = () => {
      if (page > 1) {
        onPageChange(page - 1);
      }
    };

    const handleNext = () => {
      if (page < pageCount) {
        onPageChange(page + 1);
      }
    };

    return (
      <View
        ref={ref}
        className={twMerge('flex-row items-center justify-center gap-2', className)}
        {...props}
      >
        <IconButton
          icon={<Feather name="chevron-left" />}
          onPress={handlePrevious}
          disabled={page <= 1}
          variant="outline"
        />
                <Text
          className={twMerge(
            'mx-2 text-sm font-medium text-foreground dark:text-foreground-dark',
            textClassName
          )}
        >
          Page {page} of {pageCount}
        </Text>
        <IconButton
          icon={<Feather name="chevron-right" />}
          onPress={handleNext}
          disabled={page >= pageCount}
          variant="outline"
        />
      </View>
    );
  }
);

Pagination.displayName = 'Pagination';

export { Pagination };
