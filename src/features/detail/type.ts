export type RestaurantDetails = {
  id: number;
  name: string;
  star: number;
  averageRating: number;
  place: string;
  coordinates: Coordinates;
  distance: number;
  logo: string;
  images: string[];
  category: string;
  totalMenus: number;
  totalReviews: number;
  menus: Item[];
  reviews: Review[];
};

interface Review {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  user: User;
}

interface User {
  id: number;
  name: string;
  avatar: string;
}

export type Item = {
  id: number;
  foodName: string;
  price: number;
  type: string;
  image: string;
};

interface Coordinates {
  lat: number;
  long: number;
}

export type Items = Item[];
