import { useQuery } from '@tanstack/react-query';
import { cartSummaryQueryOption } from '@/features/cart/cart-summary.service';

export const useCartSummary = () => {
  return useQuery({ ...cartSummaryQueryOption() });
};
