interface FoodBaverage {
  title: string;
}

export const ItemMenu: FoodBaverage[] = [
  {
    title: 'All Menu',
  },
  {
    title: 'Food',
  },
  {
    title: 'Drink',
  },
];

export type Menu = typeof ItemMenu;
