import { string } from 'zod';

interface OrderStatus {
  title: string;
}

export const OrderStatus: OrderStatus[] = [
  {
    title: 'Preparing',
  },
  {
    title: 'On the Way',
  },
  {
    title: 'Delivered',
  },
  {
    title: 'Done',
  },
  {
    title: 'Canceled',
  },
];

export type Menu = typeof OrderStatus;
