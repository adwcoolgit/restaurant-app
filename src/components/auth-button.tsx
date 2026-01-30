import { ComponentProps } from '@/types/component-type';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/states/store';
import { hamburgerState } from '@/states/slices/uiSlice';

export const AuthButton: React.FC<ComponentProps> = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const hamburgerOpen = useSelector(
    (state: RootState) => state.ui.hamburgerOpen
  );

  function onSignIn() {
    toggleHamburger();
    router.push('/signin');
  }

  function onSignUp() {
    toggleHamburger();
    router.push('/signup');
  }

  function toggleHamburger() {
    dispatch(hamburgerState(!hamburgerOpen));
  }

  return (
    <div className='flex w-full items-center justify-between md:w-auto'>
      <div
        className={cn(
          `${hamburgerOpen === true ? 'flex' : 'hidden'} flex-row md:flex`
        )}
      >
        <Button
          className='mr-1 flex text-inherit md:mr-4'
          size='xl'
          variant='outline'
          onClick={onSignIn}
        >
          Sign In
        </Button>
        <Button className='flex' size='xl' variant='default' onClick={onSignUp}>
          Sign Up
        </Button>
      </div>
      <div className='flex w-full justify-end md:hidden'>
        <Button
          className='mr-0 text-inherit'
          asChild
          size='icon'
          variant={'borderless'}
          onClick={toggleHamburger}
        >
          {hamburgerOpen === true ? (
            <Icon icon='ci:close-md' width='48' height='48' />
          ) : (
            <Icon icon='ci:hamburger-md' width='48' height='48' />
          )}
        </Button>
      </div>
    </div>
  );
};
