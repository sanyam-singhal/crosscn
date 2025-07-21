import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
import { twMerge } from 'tailwind-merge';

const Table = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={twMerge('w-full', className)} {...props} />
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={twMerge('border-b border-border', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

function TableBodyFn<T>(
  props: React.ComponentPropsWithoutRef<typeof FlatList<T>>,
  ref: React.Ref<FlatList<T>>
) {
  return (
    <FlatList<T>
      ref={ref}
      contentContainerClassName={twMerge('divide-y divide-border', props.className)}
      {...props}
    />
  );
}

const TableBody = React.forwardRef(TableBodyFn) as <T>(
  props: React.ComponentPropsWithoutRef<typeof FlatList<T>> & { ref?: React.Ref<FlatList<T>> }
) => React.ReactElement;

(TableBody as React.FC).displayName = 'TableBody';


const TableFooter = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={twMerge('border-t border-border bg-muted/50 font-medium', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={twMerge('flex-row hover:bg-muted/50', className)}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={twMerge(
      'h-12 flex-1 px-4 text-left align-middle font-medium text-muted-foreground',
      className
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  View, // Using View to allow for more complex cell content
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={twMerge('p-4 align-middle flex-1', className)}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={twMerge('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
