import { cn } from '@/lib/utils';
import imgLogo from '../../public/images/logo.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ComponentProps } from '@/types/component-type';

export const Logo: React.FC<ComponentProps> = ({ className }) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        'flex w-fit cursor-pointer flex-row items-center justify-start gap-x-3.75',
        className
      )}
      onClick={() => router.push('/')}
    >
      <div className='relative size-10 md:size-10.5'>
        <Image
          fill
          alt='logo'
          src={imgLogo}
          className='absolute object-contain'
        />
      </div>
      <p className='text-display-xs leading-xs hidden font-bold text-inherit md:block'>
        Foody
      </p>
    </div>
  );
};
