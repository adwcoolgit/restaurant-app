import { ComponentProps } from '@/types/component-type';
import { Icon } from '@iconify/react';
import { Activity, useEffect, useState } from 'react';
import { CardContent } from './cart-content';
import { useLocalStorageState } from '@/lib/storages';
import { isLoginSKey } from '@/features/auth/type';
import { useDispatch, useSelector } from 'react-redux';
import { IsLogin } from '@/states/slices/authSlice';
import { RootState } from '@/states/store';
import { formatRupiah } from '@/lib/utils';
import { CartTotalAmount } from './cart-total-amount';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { CartSummary } from '@/app/(pages)/(app)/my-cart/type';
import { cartSummaryQueryKey } from '@/features/cart/cart-summary.service';

type Props = ComponentProps;

export const CartCardWrapper: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const login = useSelector((state: RootState) => state.auth.isLogin);
  const [show, setShow] = useState<boolean[]>([]);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const cartSummaryData = queryClient.getQueryData<CartSummary>(
    cartSummaryQueryKey()
  );
  const [isLogin, setIsLogin, hydrated] = useLocalStorageState<boolean>(
    isLoginSKey(),
    false
  );

  useEffect(() => {
    dispatch(IsLogin(Boolean(isLogin)));
  }, [isLogin]);

  return (
    <>
      {hydrated &&
        (login ? (
          <>
            <div className='flex w-full'>
              <div className='w-full'>
                <div className='relative flex w-full flex-col gap-y-6'>
                  {cartSummaryData?.cart
                    .flatMap((c) => c.restaurant)
                    .filter(
                      (v, i, a) => a.findIndex((t) => t.id === v.id) === i
                    )
                    .map((d, restoIdx) => (
                      <div key={d.id}>
                        <div className='flex w-full flex-col gap-y-4 rounded-xl border border-gray-200 p-6 pb-6 shadow-[0_0_15px_rgba(0,0,0,0.1)]'>
                          <div className='flex items-center gap-x-2'>
                            <div className='flex w-1/4 items-center'>
                              <p
                                className='cursor-pointer text-center text-lg font-bold'
                                onClick={() =>
                                  router.push(`/restaurant/${d.id}`)
                                }
                              >
                                {d.name}
                              </p>
                              <Icon
                                icon='tabler:chevron-right'
                                className='cursor-pointer'
                                width='24'
                                height='24'
                                onClick={() =>
                                  setShow((prev) => {
                                    const next = [...prev];
                                    next[restoIdx] = !show[restoIdx];
                                    return next;
                                  })
                                }
                              />
                            </div>

                            <Activity
                              mode={!show[restoIdx] ? 'hidden' : 'visible'}
                              key={d.id}
                            >
                              <CartTotalAmount>
                                {formatRupiah(
                                  cartSummaryData?.cart
                                    .filter((c) => c.restaurant.id === d.id)
                                    .reduce((sum, c) => sum + c.subtotal, 0) ??
                                    0
                                )}
                              </CartTotalAmount>
                            </Activity>
                          </div>
                          <Activity
                            mode={show[restoIdx] ? 'hidden' : 'visible'}
                            key={d.id}
                          >
                            <CardContent key={d.id} index={restoIdx} />
                          </Activity>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </>
        ) : null)}
    </>
  );
};
