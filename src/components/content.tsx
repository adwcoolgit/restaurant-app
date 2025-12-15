import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

type HeaderTitleProps = {
  children: ReactNode;
  className?: string;
};

export const Content: React.FC<HeaderTitleProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'custom-container mx-auto inline w-full items-center border-0 text-sm leading-6 font-medium text-gray-600',
        className
      )}
    >
      {children}
    </div>
  );
};
