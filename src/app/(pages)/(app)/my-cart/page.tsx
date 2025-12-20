'use client';

import { Header } from '@/components/header/partials/header';
import { Wrapper } from '@/components/wrapper';
import { isLoginSKey } from '@/features/auth/type';
import { useLocalStorageState } from '@/lib/storages';
import { PopupMessage } from '@/components/popup-message';
import { CartCardWrapper } from '@/components/cart/cart-card-wrapper';
import { useCartSummary } from '@/hooks/useCartSummary';

export default function MyCart() {
  const { data: cartSummaryData } = useCartSummary();
  const [isLogin, setIsLogin, hydrated] = useLocalStorageState<boolean>(
    isLoginSKey(),
    true
  );

  return (
    <>
      {hydrated && isLogin && (
        <>
          <Wrapper>
            <Header
              isDark={false}
              className='absolute top-0 left-0 mx-0 w-full border-0 border-white bg-transparent'
            />
            <div className='mt-25 flex w-full justify-center gap-x-8'>
              <div className='flex w-fit flex-col gap-y-6'>
                <div className='text-display-md flex w-231.25 font-extrabold'>
                  My Cart
                </div>
                {(cartSummaryData?.cart.length ?? 0 > 0) ? (
                  <CartCardWrapper />
                ) : (
                  <div className='flex-center h-50 w-full rounded-2xl bg-white/50 p-6 text-center shadow-[0_0_15px_rgba(0,0,0,0.1)]'>
                    <p className=''>{`You have item's in your cart`}</p>
                  </div>
                )}
              </div>
            </div>
          </Wrapper>
          <PopupMessage />
        </>
      )}
    </>
  );
}
