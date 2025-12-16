import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'flex justify-center items-center m-auto shrink-0 rounded-full disabled:pointer-events-none text-md font-bold leading-md disabled:opacity-50 cursor-pointer outline-none text-black flex-center',
  {
    variants: {
      variant: {
        default: 'bg-white hover:bg-pressed-button hover:bg-neutral-200',
        auth: 'bg-primary-100 text-white hover:bg-primary-100/80',
        outline:
          'bg-transparent hover:bg-neutral-100/20 text-white hover:mix-blend-difference border-2 border-neutral-300',
        borderless: 'bg-transparent hover:bg-transparent text-black',
      },
      size: {
        default: 'h-10',
        sm: 'h-7',
        md: 'h-10',
        lg: 'h-11',
        xl: 'h-12 w-40.75',
        icon: 'size-9',
        'icon-sm': 'size-10',
        'icon-md': 'size-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
