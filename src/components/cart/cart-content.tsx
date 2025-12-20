import { cn, formatRupiah } from '@/lib/utils';
import { ComponentProps } from '@/types/component-type';
import { CartItemDetail } from './cart-item';
import { Cart } from '@/features/cart/type';
import { useQueryClient } from '@tanstack/react-query';
import { CartSummary } from '@/app/(pages)/(app)/my-cart/type';
import { cartSummaryQueryKey } from '@/features/cart/cart-summary.service';
import { useEffect, useState } from 'react';
import { CartTotalAmount } from './cart-total-amount';

type Props = { index: number } & ComponentProps;

export const CardContent: React.FC<Props> = ({ className, index }) => {
  const queryClient = useQueryClient();
  const cartSummaryData = queryClient.getQueryData<CartSummary>(
    cartSummaryQueryKey()
  );
  const [itemsInCart, setItemsInCart] = useState<Cart>();
  const cartByResto = cartSummaryData?.cart[index];

  useEffect(() => {
    setItemsInCart(cartByResto);
  }, [cartByResto]);

  return (
    <div className={cn('flex flex-col gap-y-6', className)}>
      {itemsInCart?.items?.map((item) => (
        <div className='flex w-full items-center justify-between' key={item.id}>
          <CartItemDetail key={item.id} cartItem={item} />
        </div>
      ))}
      <hr className='w-full border border-neutral-100' />
      <CartTotalAmount>
        {formatRupiah(itemsInCart?.subtotal ?? 0)}
      </CartTotalAmount>
    </div>
  );
};
