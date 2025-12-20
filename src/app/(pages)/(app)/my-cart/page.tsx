'use client';

import { Header } from '@/components/header/partials/header';
import { Wrapper } from '@/components/wrapper';
import { isLoginSKey } from '@/features/auth/type';
import { useLocalStorageState } from '@/lib/storages';
import { PopupMessage } from '@/components/popup-message';
import { CartCardWrapper } from '@/components/cart/cart-card-wrapper';

export default function MyCart() {
  const [isLogin, setIsLogin, hydrated] = useLocalStorageState<boolean>(
    isLoginSKey(),
    true
  );

  return (
    <>
      {hydrated &&
        (isLogin ? (
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
                  <CartCardWrapper />
                </div>
              </div>
            </Wrapper>
            <PopupMessage />
          </>
        ) : null)}
    </>
  );
}
