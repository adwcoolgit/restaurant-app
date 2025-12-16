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

export default function Orders() {
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
        <div className='mt-25 flex w-full justify-start gap-x-8'>
          <div className='flex h-fit flex-col gap-y-6 rounded-2xl p-5 shadow-[0_0_15px_rgba(0,0,0,0.1)] md:w-60'>
            <div className='flex'>
              <div className='relative flex items-center gap-x-4'>
                <Image
                  src={safeImageSrc(profile?.avatar) ?? noImage}
                  alt='user account'
                  sizes='auto'
                  className='size-12'
                />

                <p className='text-lg font-semibold text-inherit'>
                  {profile?.name}
                </p>
              </div>
            </div>
            <hr className='flex w-full border-neutral-300' />
            <div className='flex cursor-pointer gap-x-2'>
              <Icon icon='ri:map-pin-line' width='24' height='24' />
              <p className='text-md font-medium'>Delivery Address</p>
            </div>
            <div className='flex cursor-pointer gap-x-2'>
              <Icon icon='jam:task-list' width='24' height='24' />
              <p className='text-md font-medium'>My Orders</p>
            </div>
            <div className='flex cursor-pointer gap-x-2' onClick={btnLogout}>
              <Icon icon='ri:logout-circle-line' width='24' height='24' />
              <p className='text-md font-medium'>Logout</p>
            </div>
          </div>
          <div className='w-fit flex-col gap-y-6'>
            <div className='text-display-md w-231.25 font-extrabold'>
              My Cart
            </div>
            <div className='flex flex-col gap-y-6 p-6'>
              <div className=''>
                <SearchBox
                  sizes='md'
                  className='left-0 w-full'
                  placeholder='Search Order'
                />
              </div>
              <div className='flex w-fit items-center gap-x-3'>
                <p className='h-full items-center text-center text-lg font-bold'>
                  Status
                </p>
                {OrderStatus.map((status, index) => (
                  <Button
                    key={index}
                    variant='outline'
                    size='md'
                    className={`text-primary-100 text-md border-primary-100/50 ${selectedMenu === status.title ? 'bg-primary-100/10' : 'bg-white'} hover:text-primary-100 px-4 py-2`}
                    onClick={() => setSelectedMenu(status.title)}
                  >
                    {status.title}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
      <PopupMessage />
    </>
  );
}
