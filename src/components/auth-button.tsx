import { ComponentProps } from '@/types/component-type';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export const AuthButton: React.FC<ComponentProps> = () => {
  const router = useRouter();

  function onSignIn() {
    router.push('/signin');
  }

  function onSignUp() {
    router.push('/signup');
  }

  return (
    <div className='flex flex-row'>
      <Button
        className='mr-4 flex text-inherit'
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
  );
};
