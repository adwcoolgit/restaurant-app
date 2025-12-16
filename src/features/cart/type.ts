export type AddToCart = {
  restaurantId: number;
  menuId: number;
  quantity: number;
};

export type CartItemList = {
  cartItem: CartItem;
};

interface CartItem {
  id: number;
  restaurant: Restaurant;
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

export type CartSummary = {
  cart: Cart[];
  summary: Summary;
};

interface Summary {
  totalItems: number;
  totalPrice: number;
  restaurantCount: number;
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
