import { cn } from '@/lib/utils';
import { ComponentProps, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from './ui/input';

interface InputGroupProps extends ComponentProps<'input'> {
  errrorMessage?: string;
  useFormReturn?: UseFormReturn;
  children?: React.ReactNode;
}

export const InputGroup: React.FC<InputGroupProps> = ({
  id,
  errrorMessage = '',
  className,
  children,
  ...props
}) => {
  const [eyeOff, setEyeOff] = useState<boolean>(false);

  const btnEye_Click = () => {
    setEyeOff(!eyeOff);
  };

  return (
    <div className={cn('bg-transparent text-sm font-normal', className)}>
      <div className='relative mt-2 h-fit'>
        <Input
          {...props}
          variant='outline'
          id={id}
          className={`flex h-12 w-full pr-9 text-sm leading-6 font-semibold ${errrorMessage && 'border-field-warning'}`}
          type={
            props.type !== 'password'
              ? props.type
              : !eyeOff
                ? 'password'
                : 'text'
          }
          placeholder={props.placeholder}
          autoComplete={id}
        />
        <div className='absolute top-1/2 right-3 -translate-y-1/2 border-0'>
          {props.type === 'password' &&
            (eyeOff == false ? (
              <EyeOff
                onClick={btnEye_Click}
                size={18}
                className='cursor-pointer'
              />
            ) : (
              <Eye
                onClick={btnEye_Click}
                size={18}
                className='cursor-pointer'
              />
            ))}
          {props.type !== 'password' && children}
        </div>
      </div>
      <p
        className={`text-accent-red leading-sm mt-1 flex ${errrorMessage ? 'h-7' : 'h-fit'} items-center text-center text-sm font-medium`}
      >
        {errrorMessage}
      </p>
    </div>
  );
};
