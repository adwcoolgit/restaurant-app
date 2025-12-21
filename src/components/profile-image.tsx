import { ComponentProps } from '@/types/component-type';
import Image from 'next/image';
import { User } from '@/features/auth/type';
import { cn, safeImageSrc } from '@/lib/utils';
import noImage from '@/../public/images/no-image-available.svg';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { CartSummary } from '@/app/(pages)/(app)/my-cart/type';
import { cartSummaryQueryKey } from '@/features/cart/cart-summary.service';

type Props = User & ComponentProps;

export const ProfileImage: React.FC<Props> = ({
  className,
  name,
  avatar,
  ...props
}) => {
  const queryClient = useQueryClient();
  const cartSummaryData = queryClient.getQueryData<CartSummary>(
    cartSummaryQueryKey()
  );
  const router = useRouter();

  const totalQty =
    cartSummaryData?.cart
      .flatMap((c) => c.items)
      .reduce((sum, qty) => sum + qty.quantity, 0) ?? 0;

  const btnProfile = () => router.push('/profile');
  const btnCart = () => router.push('/my-cart');

  return (
    <>
      {name && (
        <div
          className={cn('flex cursor-pointer items-center gap-x-6', className)}
        >
          <div className='relative' onClick={btnCart}>
            <Icon icon='lets-icons:bag-fill' className='size-8 text-inherit' />
            <div className='bg-primary-100 flex-center absolute top-0 size-5 translate-x-1/2 justify-self-end rounded-full'>
              <p className='text-xs text-white'>{totalQty}</p>
            </div>
          </div>
          <div
            className='relative flex items-center gap-x-4'
            onClick={btnProfile}
          >
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
