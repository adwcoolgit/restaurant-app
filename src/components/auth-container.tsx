import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/states/store';
import { FieldValues } from 'react-hook-form';
import { setDialog, setToast } from '@/states/slices/uiSlice';
import { Logo } from './logo';
import { GenericFormProps } from '@/types/component-type';
import { useRouter } from 'next/navigation';
import { RegisterForm } from './register/partial';

export const AuthContainer = <T extends FieldValues>({
  className,
  isLogin = false,
  children,
}: GenericFormProps<T>) => {
  const dialog = useSelector((state: RootState) => state.ui.authDialog);
  const router = useRouter();

  const closeDialog_Click = () => {
    setDialog(undefined);
    router.push('/');
  };

  const dialogMode_Click = () => {
    setDialog(dialog !== 'LOG_IN' ? 'LOG_IN' : 'REGISTER');
    if (isLogin) router.push('/signup');
    else router.push('/signin');
  };

  return (
    <>
      <div
        className={cn(
          'mx-1 my-auto flex h-fit w-auto grow items-center justify-center gap-y-4 rounded-xl border-0 bg-white p-8.75 drop-shadow-2xl md:mx-auto md:w-111.5 md:grow-0 md:p-6',
          className
        )}
      >
        <X
          onClick={closeDialog_Click}
          className='text-foreground absolute top-2 right-2 cursor-pointer justify-self-end'
        />
        <RegisterForm.Root className='h-fit w-full border-0 p-0'>
          <RegisterForm.Wrapper className='h-fit w-full border-0 md:p-0'>
            <RegisterForm.Content className='flex flex-col justify-start gap-y-5 p-0'>
              <Logo className='w-full' />
              <div className='w-full'>
                <h1 className='text-xs-line-height text-foreground w-full justify-start border-0 font-bold md:text-3xl md:leading-9'>
                  Wellcome Back
                </h1>
                <h3 className='text-xs-line-height text-foreground md:text-md md:leading-md mb-3 w-full justify-start border-0 font-medium'>
                  Good to see you again! Let’s eat
                </h3>
              </div>
              {children}
            </RegisterForm.Content>
          </RegisterForm.Wrapper>
        </RegisterForm.Root>
      </div>
    </>
  );
};
