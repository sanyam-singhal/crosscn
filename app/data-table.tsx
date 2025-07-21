import React from 'react';
import { Text, View } from 'react-native';
import {

  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/DataTable';


interface Invoice {
  invoice: string;
  paymentStatus: string;
  totalAmount: string;
  paymentMethod: string;
}

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
];

const DataTableDemo = () => {
  return (
    <TableBody<Invoice>
      data={invoices}
      keyExtractor={(item) => item.invoice}
      ListHeaderComponent={() => (
        <>
          <View className="p-4 lg:p-6">
            <View className="mb-4">
              <Text className="text-3xl font-bold tracking-tight text-foreground dark:text-foreground-dark">Data Table</Text>
              <Text className="mt-2 text-lg text-muted-foreground dark:text-muted-foreground-dark">A responsive table component for displaying data.</Text>
            </View>
          </View>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead><Text className="w-[100px]">Invoice</Text></TableHead>
              <TableHead><Text>Status</Text></TableHead>
              <TableHead><Text>Method</Text></TableHead>
              <TableHead><Text className="text-right">Amount</Text></TableHead>
            </TableRow>
          </TableHeader>
        </>
      )}
      renderItem={({ item }: { item: Invoice }) => (
        <TableRow>
          <TableCell>
            <Text className="text-foreground font-medium">{item.invoice}</Text>
          </TableCell>
          <TableCell>
            <Text className="text-foreground">{item.paymentStatus}</Text>
          </TableCell>
          <TableCell>
            <Text className="text-foreground">{item.paymentMethod}</Text>
          </TableCell>
          <TableCell>
            <Text className="text-right text-foreground">{item.totalAmount}</Text>
          </TableCell>
        </TableRow>
      )}
    />
  );
};

export default DataTableDemo;
