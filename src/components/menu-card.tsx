import { ComponentProps } from '@/types/component-type';
import Image from 'next/image';
import noImage from '@/../public/images/no-image-available.svg';
import { MenuItems } from '@/constant/menu-bar';
import { cn, safeImageSrc } from '@/lib/utils';

type Props = MenuItems & ComponentProps;

export const MenuCard: React.FC<Props> = ({ className, ...props }) => {
  return (
    <div className={cn('flex cursor-pointer flex-col gap-y-1.5', className)}>
      <div className='bg-background z-0 flex w-40.25 rounded-2xl px-12 py-4.25 shadow-[0_0_15px_rgba(0,0,0,0.05)] hover:shadow-[0_0_15px_rgba(0,0,0,0.15)]'>
        <div className='relative size-16.5'>
          <Image
            src={props.image ?? noImage}
            alt='all food'
            fill
            className='object-contain'
          />
        </div>
      </div>
      <p className='leading-lg flex-center flex h-8 border-0 text-center text-lg font-bold'>
        {props.title}
      </p>
    </div>
  );
};
