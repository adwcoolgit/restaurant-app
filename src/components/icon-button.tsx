import { cn } from '@/lib/utils';
import React, { ComponentProps, ReactNode } from 'react';
import { Button } from './ui/button';

interface UIButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
  className?: string;
  value?: string;
  asChild?: boolean;
}

export const UIIconButton: React.FC<UIButtonProps> = ({
  children,
  className,
  value,
  onClick = () => {},
  asChild = false,
  ...props
}) => {
  return (
    <div className={cn('', className)}>
      <div className='relative'>
        <Button
          variant={'borderless'}
          size={'icon'}
          className='p-0.5 m-0 hover:bg-white cursor-pointer shadow-none border-0'
          onClick={onClick}
          asChild={asChild}
        >
          {children}
        </Button>

        {/* Bages notification */}
        {value && (
          <div className='absolute -top-1/2 translate-y-4/5 -right-1 rounded-full size-5 items-center bg-primary'>
            <span className='flex text-white text-xs font-semibold leading-5 text-center justify-center'>
              {value}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
