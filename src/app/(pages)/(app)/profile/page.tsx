'use client';

import { Wrapper } from '@/components/wrapper';
import { useProfile } from '@/hooks/useProfile';
import { safeImageSrc } from '@/lib/utils';
import noImage from '@/../public/images/no-image-available.svg';
import Image from 'next/image';
import { Header } from '@/components/header/partials/header';
import { Icon } from '@iconify/react';
import {
  removeItems,
  useLocalStorageState,
  useRemoveQuery,
} from '@/lib/storages';
import { isLoginSKey } from '@/features/auth/type';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PopupMessage } from '@/components/popup-message';
import { useCartSummary } from '@/hooks/useCartSummary';

export default function Profile() {
  const { data: cartSummaryData } = useCartSummary(); // just to keep the cart summary updated
  const [removeQuery] = useRemoveQuery();
  const [isLogin, , hydrated] = useLocalStorageState<boolean | undefined>(
    isLoginSKey(),
    undefined
  );
  const { data: profile } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (!Boolean(isLogin) && hydrated) {
      router.push('/signin');
    }
  }, [isLogin]);

  const btnLogout = () => {
    // removeItems();
    removeQuery();
    router.push('/');
  };

  return (
    <>
      {hydrated && isLogin && (
        <>
          <Wrapper>
            <Header
              isDark={false}
              className='absolute top-0 left-0 mx-0 w-full border-0 border-white bg-transparent'
            />
            <div className='mt-25 flex w-full justify-start gap-x-8'>
              <div className='flex flex-col gap-y-6 rounded-2xl p-5 shadow-[0_0_15px_rgba(0,0,0,0.1)] md:w-60'>
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
                <div
                  className='flex cursor-pointer gap-x-2'
                  onClick={btnLogout}
                >
                  <Icon icon='ri:logout-circle-line' width='24' height='24' />
                  <p className='text-md font-medium'>Logout</p>
                </div>
              </div>
              <div className='flex-col gap-y-6 p-5'>
                <div className=''></div>
                <div className='flex-col gap-y-6'>
                  <div className=''></div>
                  <div className=''></div>
                </div>
              </div>
            </div>
          </Wrapper>
          <PopupMessage />
        </>
      )}
    </>
  );
}
