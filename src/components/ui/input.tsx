import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'flex text-foreground border placeholder:text-muted-foreground border-neutral-500/50 w-auto rounded-xl font-semibold outline-none py-2 items-center text-sm leading-md focus:placeholder-transparent',
  {
    variants: {
      variant: {
        default: 'px-4',
        outline: 'border bg-none px-4',
        search: 'rounded-full w-125 h-11 pl-12.5 pr-1.5',
      },
      sizes: {
        default: 'h-12',
        sm: 'h-7',
        md: 'h-10',
        lg: 'h-11',
        xl: 'h-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      sizes: 'default',
    },
  }
);

function Input({
  className,
  variant,
  sizes,
  ...props
}: React.ComponentProps<'input'> &
  VariantProps<typeof inputVariants> & {
    asChild?: boolean;
  }) {
  return (
    <input
      data-slot='input'
      className={cn(inputVariants({ className, variant, sizes, ...props }))}
      {...props}
    />
  );
}

export { Input, inputVariants };
