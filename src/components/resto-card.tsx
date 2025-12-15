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
      className='flex w-full cursor-pointer gap-x-3 shadow-[0_0_15px_rgba(0,0,0,0.05)] hover:shadow-[0_0_15px_rgba(0,0,0,0.15)] md:rounded-2xl md:p-4'
      onClick={() => setId(resto.id?.toString() ?? '')}
    >
      <div className='relative flex size-30 overflow-hidden rounded-xl border-0'>
        <Image
          src={safeImageSrc(resto.logo) ?? noImage}
          alt=''
          fill
          className='object-contain'
        />
      </div>
      <div className=''>
        <div className=''>
          <p className='leading-lg h-8 text-lg font-extrabold'>{resto.name}</p>
        </div>
        <div className=''>
          <div className='flex'>
            <Icon
              icon='material-symbols:star-rounded'
              className='text-yellow-500'
              width='24'
              height='24'
            />
            <p className='text-md font-medium'>{resto.star}</p>
          </div>
        </div>
        <div className=''>
          <p className=''>{resto.place}</p>
          <p className=''>.</p>
          <p className=''>{resto.distance}</p>
        </div>
      </div>
    </div>
  );
};
