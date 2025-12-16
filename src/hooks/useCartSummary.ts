import { cartSummaryQueryOption } from '@/features/cart/cart-summary.service';
import { useQuery } from '@tanstack/react-query';

export const useCartSummary = () => {
  return useQuery({
    ...cartSummaryQueryOption(),
  });
};
