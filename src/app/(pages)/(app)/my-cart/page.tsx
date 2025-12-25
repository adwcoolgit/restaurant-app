'use client';

import { Header } from '@/components/header/partials/header';
import { Wrapper } from '@/components/wrapper';
import { isLoginSKey } from '@/features/auth/type';
import { useLocalStorageState } from '@/lib/storages';
import { PopupMessage } from '@/components/popup-message';
import { CartCardWrapper } from '@/components/cart/cart-card-wrapper';
import { useCartSummary } from '@/hooks/useCartSummary';
import { Icon } from '@iconify/react';

export default function MyCart() {
  const { data: cartSummaryData } = useCartSummary(); // just to keep the cart summary updated
  const [isLogin, , hydrated] = useLocalStorageState<boolean | undefined>(
    isLoginSKey(),
    undefined
  );

  return (
    <>
      {hydrated && isLogin ? (
        <>
          <Wrapper className='my-0 min-h-screen'>
            <Header
              isDark={false}
              className='absolute top-0 left-0 mx-0 w-full border-0 border-white bg-transparent'
            />
            {(cartSummaryData?.cart.length ?? 0) > 0 ? (
              <div className='top-0 m-0 flex min-h-svh w-full justify-center gap-x-8'>
                <div className='mt-25 flex h-full w-fit flex-col gap-y-6'>
                  <div className='text-display-md flex w-231.25 font-extrabold'>
                    My Cart
                  </div>
                  <CartCardWrapper />
                </div>
              </div>
            ) : (
              <div className='top-1/5 flex w-1/2 flex-col'>
                <div className='flex-center flex h-fit w-full flex-col gap-y-6 rounded-2xl border border-neutral-200 bg-white/50 p-6 text-center shadow-[0_0_15px_rgba(0,0,0,0.05)]'>
                  <Icon
                    icon='streamline-kameleon-color:cart-duo'
                    width='400'
                    height='400'
                    className='text-primary-100'
                  />
                  <div className=''>
                    <p className='text-3xl font-bold'>{`Your cart is empty!`}</p>
                    <p className='text-neutral-400'>
                      {`You have no items in your cart`}{' '}
                    </p>
                    <p className='text-neutral-400'>
                      {`Let's go buy something`}{' '}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Wrapper>
        </>
      ) : (
        <div className='flex-center min-h-screen w-full rounded-2xl bg-white/50 p-6 text-center'>
          <Header
            isDark={false}
            className='absolute top-0 left-0 mx-0 w-full border-0 border-white bg-transparent'
          />
          <div className='flex-center flex h-fit w-1/2 flex-col gap-y-10 rounded-2xl border-0 border-neutral-200 bg-white/50 p-6 text-center'>
            <Icon icon='emojione:shopping-cart' width='400' height='400' />
            <p className='text-2xl'>{`Sign in to see all items in your cart`}</p>
          </div>
        </div>
      )}
      <PopupMessage />
    </>
  );
}
