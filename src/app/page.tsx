'use client';

import { Header } from '@/components/header/partials/header';
import { PopupMessage } from '@/components/popup-message';
import { loginUserSKey, User } from '@/features/auth/type';
import { ClearStorage } from '@/functions/user-function';
import { removeItems, useLocalStorageState } from '@/lib/storages';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import imgHero from '@/../public/images/hero.png';
import { initUser } from '@/types/global-types';
import { SearchBox } from '@/components/search-box';
import { MenuCard } from '@/components/menu-card';
import { Wrapper } from '@/components/wrapper';
import { menuBarItems } from '@/constant/menu-bar';
import { Restaurants } from '@/components/restaurants';
import { useCartSummary } from '@/hooks/useCartSummary';

export default function Home() {
  const { data: cartSummaryData } = useCartSummary(); // just to keep the cart summary updated
  const [savedUser] = useLocalStorageState<User>(loginUserSKey(), initUser);
  const [user, setUser] = useState<User>(initUser);

  // removeItems();

  useEffect(() => {
    setUser(savedUser);
  }, [savedUser]);

  return (
    <div className='flex flex-col gap-y-12'>
      <Wrapper className='bg-foreground h-206.75 w-full'>
        <Image
          src={imgHero}
          alt='burger-background'
          fill
          className='md:object-contain'
        />
        <div className='absolute left-0 mt-0 h-full w-full bg-linear-to-t from-black from-0% to-transparent to-100%'></div>
        <Header
          isDark={true}
          className='absolute top-0 left-0 mx-0 w-full border-0 border-white bg-transparent'
        />
        <div className='absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-y-10 border-0 border-white md:w-178'>
          <div className='flex-center flex-col text-white'>
            <h1 className='md:text-display-2xl text-display-lg text-center font-extrabold text-inherit'>
              Explore Culinary Experiences
            </h1>
            <h3 className='md:text-display-xs text-center text-lg font-bold text-inherit'>
              Search and refine your choice to discover the perfect restaurant.
            </h3>
          </div>
          <SearchBox sizes='xl' className='mx-auto justify-center md:w-151' />
        </div>
      </Wrapper>
      <Wrapper className='w-full'>
        <div className='mx-0 flex w-full justify-between'>
          {menuBarItems.map((menu) => (
            <MenuCard key={menu.id} {...menu} />
          ))}
        </div>
      </Wrapper>
      <Restaurants />
      <PopupMessage />
    </div>
  );
}
