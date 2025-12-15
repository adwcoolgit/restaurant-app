export type RestoPayload = {
  location?: string;
  range?: number;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  category?: number;
};

export type Restaurants = {
  restaurants: Restaurant[];
  pagination: Pagination;
};

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export type Restaurant = {
  id?: number;
  name?: string;
  star?: number;
  place?: string;
  logo?: string;
  images?: string[];
  category?: string;
  reviewCount?: number;
  menuCount?: number;
  priceRange?: PriceRange;
  distance?: number;
};

export type PriceRange = {
  min: number;
  max: number;
};
