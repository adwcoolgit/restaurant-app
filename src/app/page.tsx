'use client';

import { Header } from '@/components/header/partials/header';
import { PopupMessage } from '@/components/popup-message';
import { loginUserSKey, User } from '@/features/auth/type';
import { useLocalStorageState } from '@/lib/storages';
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

  useEffect(() => {
    setUser(savedUser);
  }, [savedUser]);

  return (
    <div className='flex flex-col gap-y-12'>
      <Wrapper className='bg-foreground h-162 w-full md:h-206.75'>
        <Image
          src={imgHero}
          alt='burger-background'
          fill
          className='object-cover md:object-contain'
        />
        <div className='absolute left-0 mt-0 h-full w-full bg-linear-to-t from-black from-0% to-transparent to-100%'></div>
        <Header
          isDark={true}
          className='absolute top-0 left-0 mx-0 w-full border-0 border-white bg-transparent'
        />
        <div className='absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col border-0 border-white px-5.5 md:w-178 md:px-0'>
          <div className='flex-center flex-col border-0 border-neutral-100 text-white'>
            <h1 className='md:text-display-2xl text-display-lg leading-display-lg md:leading-2xl text-center font-extrabold text-inherit'>
              Explore Culinary Experiences
            </h1>
            <h3 className='md:text-display-xs leading-lg md:leading-display-xs text-center text-lg font-bold text-inherit'>
              Search and refine your choice to discover the perfect restaurant.
            </h3>
          </div>
          <SearchBox
            className='mx-auto mt-5 w-full justify-center border-0 border-neutral-100 md:mt-10 md:w-151'
            placeholder='Search for restaurant, food or drink'
          />
        </div>
      </Wrapper>
      <Wrapper className='flex w-full justify-center border-0'>
        <div className='mx-0 grid w-full grid-cols-3 justify-between gap-x-4 gap-y-6 md:grid-cols-6 md:gap-x-6'>
          {menuBarItems.map((menu) => (
            <MenuCard
              key={menu.id}
              {...menu}
              className='flex w-full justify-center border-0'
            />
          ))}
        </div>
      </Wrapper>
      <Restaurants />
      <PopupMessage />
    </div>
  );
}
