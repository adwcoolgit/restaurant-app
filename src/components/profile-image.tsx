import { ComponentProps } from '@/types/component-type';
import Image from 'next/image';
import { User } from '@/features/auth/type';
import { cn, safeImageSrc } from '@/lib/utils';
import noImage from '@/../public/images/no-image-available.svg';
import { Icon } from '@iconify/react';
import { AuthButton } from './auth-button';

type Props = User & ComponentProps;

export const ProfileImage: React.FC<Props> = ({
  className,
  name,
  avatar,
  ...props
}) => {
  return (
    <>
      {name && (
        <div className={cn('flex items-center gap-x-6', className)}>
          <Icon icon='lets-icons:bag-fill' className='size-8 text-inherit' />
          <div className='flex items-center gap-x-4'>
            <Image
              src={safeImageSrc(avatar) ?? noImage}
              alt='user account'
              sizes='auto'
              className='size-12'
            />
            <p className='text-lg font-semibold text-inherit'>{name}</p>
          </div>
        </div>
      )}
    </>
  );
};
