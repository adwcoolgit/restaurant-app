import { ComponentProps } from '@/types/component-type';
import Image from 'next/image';
import noImage from '@/../public/images/no-image-available.svg';
import { Icon } from '@iconify/react';
import { Restaurant } from '@/features/restaurants/type';
import { safeImageSrc } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = Restaurant & ComponentProps;

export const RestoCard: React.FC<Props> = ({ className, ...resto }) => {
  const [id, setId] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (id !== '') router.push(`/restaurant/${id}`);
  }, [id]);

  return (
    <div
      className='flex w-full cursor-pointer items-center gap-x-3 rounded-2xl border-0 p-4 shadow-[0_0_15px_rgba(0,0,0,0.05)] hover:shadow-[0_0_15px_rgba(0,0,0,0.15)]'
      onClick={() => setId(resto.id?.toString() ?? '')}
    >
      <div className='relative flex size-22.5 overflow-hidden rounded-xl border-0 md:size-30'>
        <Image
          src={safeImageSrc(resto.logo) ?? noImage}
          alt=''
          fill
          className='object-contain *:object-center'
        />
      </div>
      <div className=''>
        <div className=''>
          <p className='leading-md md:leading-lg text-md font-extrabold md:text-lg'>
            {resto.name}
          </p>
        </div>
        <div className=''>
          <div className='flex items-center'>
            <Icon
              icon='material-symbols:star-rounded'
              className='text-yellow-500'
              width='24'
              height='24'
            />
            <p className='md:text-md leading-sm md:leading-md text-sm font-medium'>
              {resto.star}
            </p>
          </div>
        </div>
        <div className='flex items-center gap-x-2'>
          <p className='md:text-md leading-sm md:leading-md text-sm'>
            {resto.place}
          </p>
          <p className=''>.</p>
          <p className=''>{resto.distance}</p>
        </div>
      </div>
    </div>
  );
};
