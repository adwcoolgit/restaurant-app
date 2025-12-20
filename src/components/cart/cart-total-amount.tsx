import { ComponentProps } from '@/types/component-type';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export const CartTotalAmount: React.FC<ComponentProps> = ({
  className,
  children,
}) => {
  return (
    <div className={cn('flex w-full flex-col', className)}>
      <div className='flex w-full flex-row items-center justify-between'>
        <div className='flex w-full flex-col'>
          <p className='text-md font-medium'>Total</p>
          <p className='text-xl font-extrabold'>{children}</p>
        </div>
        <Button className='flex w-60 justify-self-end' variant='auth'>
          Checkout
        </Button>
      </div>
    </div>
  );
};
