export type CartSummaryByResto = {
  cart: Cart[];
  summary: Summary;
};

interface Summary {
  totalItems: number;
  totalPrice: number;
  restaurantCount: number;
}

export type Cart = {
  restaurant: Restaurant;
  items: Item[];
  subtotal: number;
};

export type Item = {
  id: number;
  menu: Menu;
  quantity: number;
  itemTotal: number;
};

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

export type AddToCart = {
  restaurantId: number;
  menuId: number;
  quantity: number;
};

// export type CartItemList = {
//   cartItem: CartItem;
// };

// export type CartItem = {
//   id: number;
//   restaurant: Restaurant;
//   menu: Menu;
//   quantity: number;
//   itemTotal: number;
// };

// interface Menu {
//   id: number;
//   foodName: string;
//   price: number;
//   type: string;
//   image: string;
// }

// interface Restaurant {
//   id: number;
//   name: string;
//   logo: string;
// }

// export type CartSummary = {
//   cart: Cart[];
//   summary: Summary;
// };

// interface Summary {
//   totalItems: number;
//   totalPrice: number;
//   restaurantCount: number;
// }

// export type Cart = {
//   restaurant: Restaurant;
//   items: Menu[];
//   subtotal: number;
// }

// export type Item = {
//   id: number;
//   menu: Menu;
//   quantity: number;
//   itemTotal: number;
// };

// export type CartItems = {
//   items: Cart[];
// };

// export type UpdateQtyParams = {
//   quantity: number;
// };

export type UpdateQtyVariables = {
  id: number;
  params: UpdateQtyParams;
};
