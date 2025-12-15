import imgAllFood from '@/../public/images/all-food.svg';
import imgLocation from '@/../public/images/location.svg';
import imgDiscount from '@/../public/images/discount.svg';
import imgBestSeller from '@/../public/images/best-seller.svg';
import imgDelivery from '@/../public/images/delivery.svg';
import imgLunch from '@/../public/images/lunch.svg';
import { StaticImageData } from 'next/image';

export interface MenuItems {
  id: string;
  title: string;
  image?: StaticImageData;
  subItems?: MenuItems[];
}

export const menuBarItems: MenuItems[] = [
  {
    id: 'all-restaurant',
    title: 'All Restaurant',
    image: imgAllFood,
  },
  {
    id: 'nearby',
    title: 'Nearby',
    image: imgLocation,
  },
  {
    id: 'discount',
    title: 'Discount',
    image: imgDiscount,
  },
  {
    id: 'best-seller',
    title: 'Best Seller',
    image: imgBestSeller,
  },
  {
    id: 'delivery',
    title: 'Delivery',
    image: imgDelivery,
  },
  {
    id: 'lunch',
    title: 'Lunch',
    image: imgLunch,
  },
];

export type MenuBarItem = typeof menuBarItems;
