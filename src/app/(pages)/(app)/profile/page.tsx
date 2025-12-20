'use client';

import { Wrapper } from '@/components/wrapper';
import { useProfile } from '@/hooks/useProfile';
import { safeImageSrc } from '@/lib/utils';
import noImage from '@/../public/images/no-image-available.svg';
import Image from 'next/image';
import { Header } from '@/components/header/partials/header';
import { Icon } from '@iconify/react';
import { removeItems, useLocalStorageState } from '@/lib/storages';
import { isLoginSKey } from '@/features/auth/type';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/spinner';
import { ClearStorage } from '@/functions/user-function';
import { PopupMessage } from '@/components/popup-message';

export default function Profile() {
  const [isLogin, hydrated] = useLocalStorageState<boolean>(
    isLoginSKey(),
    true
  );
  const [mState, setMState] = useState(true);
  const { data: profile } = useProfile();
  const router = useRouter();
  // ClearStorage();

  useEffect(() => {
    if (!Boolean(isLogin)) {
      router.push('/signin');
    }
  }, [isLogin]);

  if (!hydrated) return <></>;

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
            <div className='flex cursor-pointer gap-x-2' onClick={btnLogout}>
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
  );
}
