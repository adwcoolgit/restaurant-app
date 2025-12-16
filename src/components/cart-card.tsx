import { CartSummary } from '@/app/(pages)/(app)/my-cart/type';
import { formatRupiah, safeImageSrc } from '@/lib/utils';
import { ComponentProps } from '@/types/component-type';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { Fragment } from 'react/jsx-runtime';
import noImage from '@/../public/images/no-image-available.svg';
import { Button } from './ui/button';
import { Activity, useState } from 'react';

type Props = CartSummary & ComponentProps;

export const CartCard: React.FC<Props> = ({ className, ...item }) => {
  const [show, setShow] = useState<boolean[]>([]);
  const [tota, setTotal] = useState<number[]>([]);

  return (
    <div className='flex w-full p-5'>
      <div className='w-full'>
        <div className='relative w-full'>
          {item.cart
            .flatMap((c) => c.restaurant)
            .map((d, index) => (
              <Fragment key={d.id}>
                <div className='flex w-full flex-col gap-y-4 pb-6'>
                  <div className='flex items-center gap-x-2'>
                    <p className='text-center text-lg font-bold'>{d.name}</p>
                    <Icon
                      icon='tabler:chevron-right'
                      className='cursor-pointer'
                      width='24'
                      height='24'
                      onClick={() =>
                        setShow((prev) => {
                          const next = [...prev];
                          next[index] = !show[index];
                          return next;
                        })
                      }
                    />
                  </div>
                  {item.cart
                    .filter((c) => c.restaurant.id === d.id)
                    .flatMap((c) => c.items)
                    .map((i) => (
                      <>
                        <Activity
                          mode={show[index] ? 'hidden' : 'visible'}
                          key={i.id}
                        >
                          <div
                            className='flex w-full items-center justify-between'
                            key={i.id}
                          >
                            <div className='flex items-center'>
                              <div className='relative mr-4 size-20 overflow-hidden rounded-xl'>
                                <Image
                                  src={safeImageSrc(i.menu.image) ?? noImage}
                                  alt={i.menu.foodName}
                                  fill
                                  className='object-cover'
                                />
                              </div>
                              <div className='flex flex-col'>
                                <p className='text-md font-medium'>
                                  {i.menu.foodName}
                                </p>
                                <p className='text-lg font-extrabold'>
                                  {formatRupiah(i.itemTotal)}
                                </p>
                              </div>
                            </div>
                            <div className='flex items-center gap-x-4'>
                              <Button
                                variant='outline'
                                className='size-10 rounded-full border'
                              >
                                <Icon
                                  icon='ic:round-remove'
                                  width='24'
                                  height='24'
                                  className='text-black'
                                />
                              </Button>
                              <p className='text-lg font-semibold'>
                                {i.quantity}
                              </p>
                              <Button
                                variant='auth'
                                className='size-10 rounded-full border'
                              >
                                <Icon
                                  icon='ic:round-add'
                                  width='24'
                                  height='24'
                                />
                              </Button>
                            </div>
                          </div>
                        </Activity>
                      </>
                    ))}
                  <div className='w-full flex-row justify-between'>
                    <div className=''>
                      <p className='text-md font-medium'>Total</p>
                      <p className='text-xl font-extrabold'>
                        {formatRupiah(0)}
                      </p>
                    </div>
                    <div className=''></div>
                  </div>
                </div>
              </Fragment>
            ))}
        </div>
        <p className=''></p>
      </div>
      <div className=''></div>
      <div className=''></div>
    </div>
  );
};
