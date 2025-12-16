'use client';

import { Header } from '@/components/header/partials/header';
import { Wrapper } from '@/components/wrapper';
import { isLoginSKey } from '@/features/auth/type';
import { useProfile } from '@/hooks/useProfile';
import { removeItems, useLocalStorageState } from '@/lib/storages';
import { safeImageSrc } from '@/lib/utils';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import noImage from '@/../public/images/no-image-available.svg';
import { PopupMessage } from '@/components/popup-message';
import { SearchBox } from '@/components/search-box';
import { OrderStatus } from '@/constant/order-status';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { CartCard } from '@/components/cart-card';
import { useCartSummary } from '@/hooks/useCartSummary';

export default function MyCart() {
  const [selectedMenu, setSelectedMenu] = useState<string>('all menu');
  const { data: itemsInCart } = useCartSummary();
  const [isLogin, hidrated] = useLocalStorageState<boolean>(
    isLoginSKey(),
    true
  );
  const { data: profile } = useProfile();

  const itemFilter = itemsInCart?.cart.flatMap((c) => c.restaurant) ?? [];
  const btnLogout = () => {
    removeItems();
  };

  return (
    <>
      <Wrapper>
        <Header
          isDark={false}
          className='absolute top-0 left-0 mx-0 w-full border-0 border-white bg-transparent'
        />
        <div className='mt-25 flex w-full justify-center gap-x-8'>
          <div className='w-fit flex-col gap-y-6'>
            <div className='text-display-md w-231.25 font-extrabold'>
              My Cart
            </div>
            <div className='flex flex-col gap-y-6 p-6'>
              <CartCard cart={itemsInCart?.cart ?? []} />
            </div>
          </div>
        </div>
      </Wrapper>
      <PopupMessage />
    </>
  );
}
