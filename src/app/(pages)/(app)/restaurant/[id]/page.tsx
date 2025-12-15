'use client';

import { Header } from '@/components/header/partials/header';
import { Wrapper } from '@/components/wrapper';
import { useResto } from '@/hooks/useResto';
import Image from 'next/image';
import { use, useEffect, useState } from 'react';
import noImage from '@/../public/images/no-image-available.svg';
import { safeImageSrc } from '@/lib/utils';
import { ImageFull } from '@/components/full-image';
import { useDispatch } from 'react-redux';
import { fullImage } from '@/states/slices/uiSlice';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { ItemMenu } from '@/constant/category';
import { ItemList } from '@/components/item-list';
import { ItemCard } from '@/components/items-card';

interface PageParam {
  params: Promise<{ id: string }>;
}

export default function RestoDetail({ params }: PageParam) {
  const { id } = use(params);
  const { data: resto } = useResto(id);
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const [selectedMenu, setSelectedMenu] = useState<string>('all menu');
  const distpatch = useDispatch();

  function clickImage(index: number) {
    setSelected(index);
    distpatch(fullImage(true));
  }

  const itemFilter =
    selectedMenu.toLowerCase() !== 'all menu'
      ? resto?.menus.filter((a) => a.type === selectedMenu.toLowerCase())
      : resto?.menus;

  return (
    <>
      <Wrapper className='flex flex-col gap-y-8'>
        <Header
          isDark={false}
          className='absolute top-0 left-0 mx-0 w-full bg-transparent shadow-black/30 drop-shadow-2xl'
        />
        <div className='mt-25 flex h-full w-full gap-x-5'>
          <div
            className='relative flex flex-[5.6] basis-80 cursor-pointer overflow-hidden rounded-2xl'
            onClick={() => clickImage(0)}
          >
            <Image
              src={safeImageSrc(resto?.images[0].toString()) ?? noImage}
              alt=''
              className='group object-cover'
              fill
            />
          </div>
          <div className='flex flex-[4.4] basis-80 flex-col gap-y-5'>
            <div
              className='relative flex-[7.4] basis-80 cursor-pointer overflow-hidden rounded-2xl'
              onClick={() => clickImage(1)}
            >
              <Image
                src={safeImageSrc(resto?.images[1].toString()) ?? noImage}
                alt=''
                className='group object-cover'
                fill
              />
            </div>
            <div className='relative flex flex-[2.6] basis-80 gap-x-5'>
              <div
                className='relative flex-5 basis-80 cursor-pointer overflow-hidden rounded-2xl'
                onClick={() => clickImage(2)}
              >
                <Image
                  src={safeImageSrc(resto?.images[2].toString()) ?? noImage}
                  alt=''
                  className='group object-cover'
                  fill
                />
              </div>
              <div
                className='relative flex-5 basis-80 cursor-pointer overflow-hidden rounded-2xl'
                onClick={() => clickImage(3)}
              >
                <Image
                  src={safeImageSrc(resto?.images[3].toString()) ?? noImage}
                  alt=''
                  className='group object-cover'
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
      <Wrapper className='my-8'>
        {selected !== undefined && (
          <ImageFull
            image={safeImageSrc(resto?.images[selected].toString()) ?? noImage}
          />
        )}
        <div className='flex w-full gap-x-4'>
          <div className='relative size-30 overflow-hidden rounded-full'>
            <Image
              src={safeImageSrc(resto?.logo) ?? noImage}
              alt={resto?.name ?? 'logo'}
              fill
              className='object-contain'
            />
          </div>
          <div className='w-auto grow flex-col'>
            <p className='text-display-md font-bold'>{resto?.name}</p>
            <div className='flex items-center'>
              <Icon
                icon='material-symbols:star-rounded'
                className='text-yellow-500'
                width='24'
                height='24'
              />
              <p className='text-center'>{resto?.star}</p>
            </div>
            <div className='flex gap-x-2'>
              <p className=''>{resto?.place}</p>
              <p className=''>.</p>
              <p className=''>{resto?.distance}</p>
            </div>
          </div>
          <div className='w-11xl flex'>
            <Button
              variant='outline'
              size='xl'
              className='flex w-full cursor-pointer gap-x-3.75 text-inherit hover:text-inherit'
            >
              <Icon icon='mage:share' width='24' height='24' />
              <p className=''>Share</p>
            </Button>
          </div>
        </div>
      </Wrapper>
      <Wrapper className='flex-col gap-y-8'>
        <hr className='w-full border-gray-300' />
        <div className='flex w-full flex-col gap-y-6'>
          <p className='text-display-lg ml-0 flex justify-start font-extrabold'>
            Menu
          </p>
          <div className='flex w-fit gap-x-3'>
            {ItemMenu.map((menu, index) => (
              <Button
                key={index}
                variant='outline'
                size='md'
                className={`text-primary-100 text-md border-primary-100/50 ${selectedMenu === menu.title ? 'bg-primary-100/10' : 'bg-white'} hover:text-primary-100 px-4 py-2`}
                onClick={() => setSelectedMenu(menu.title)}
              >
                {menu.title}
              </Button>
            ))}
          </div>
          <div className=''></div>
          <div className=''></div>
        </div>
      </Wrapper>
      <Wrapper>
        <div className='grid w-full justify-between gap-y-6 md:grid-cols-4 lg:grid-cols-5'>
          {itemFilter?.map((item) => (
            <ItemCard key={item.id} {...item} />
          ))}
        </div>
      </Wrapper>
    </>
  );
}
