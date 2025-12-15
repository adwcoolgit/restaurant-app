import { cn } from '@/lib/utils';
import { ComponentProps } from '@/types/component-type';

export const Wrapper: React.FC<ComponentProps> = ({ children, className }) => {
  return (
    <>
      <section
        className={cn(
          'custom-container font-nunito flex-center relative h-fit w-full px-4 md:px-30',
          className
        )}
      >
        {children}
      </section>
    </>
  );
};
