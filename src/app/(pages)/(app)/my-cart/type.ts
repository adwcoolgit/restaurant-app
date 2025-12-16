export interface CartSummary {
  cart: Cart[];
}

interface Cart {
  restaurant: Restaurant;
  items: Item[];
  subtotal: number;
}

interface Item {
  id: number;
  menu: Menu;
  quantity: number;
  itemTotal: number;
}

interface Menu {
  id: number;
  foodName: string;
  price: number;
  type: string;
  image: string;
}

interface Restaurant {
  id: number;
  name: string;
  logo: string;
}
