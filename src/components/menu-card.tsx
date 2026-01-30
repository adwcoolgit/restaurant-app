import { ComponentProps } from '@/types/component-type';
import Image from 'next/image';
import noImage from '@/../public/images/no-image-available.svg';
import { MenuItems } from '@/constant/menu-bar';
import { cn } from '@/lib/utils';

type Props = MenuItems & ComponentProps;

export const MenuCard: React.FC<Props> = ({ className, ...props }) => {
  return (
    <div className={cn('flex cursor-pointer flex-col gap-y-1.5', className)}>
      <div className='flex w-full flex-col items-center justify-between border-0 border-neutral-200 px-0'>
        <div className='bg-background z-0 flex w-26.5 rounded-2xl border-0 border-neutral-200 px-7.25 py-5.5 shadow-[0_0_15px_rgba(0,0,0,0.05)] hover:shadow-[0_0_15px_rgba(0,0,0,0.15)] md:w-40.25 md:px-12 md:py-4.25'>
          <div className='relative size-12 md:size-16.5'>
            <Image
              src={props.image ?? noImage}
              alt='all food'
              fill
              className='object-contain'
            />
          </div>
        </div>
        <p className='leading-md sm:leading-lg flex-center flex border-0 text-center text-sm font-bold md:text-lg'>
          {props.title}
        </p>
      </div>
    </div>
  );
};
