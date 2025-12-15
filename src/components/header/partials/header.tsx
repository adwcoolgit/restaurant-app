'use client';

import { useLocalStorageState } from '@/lib/storages';
import { isLoginSKey, loginUserSKey, User } from '@/features/auth/type';
import { Wrapper } from '@/components/wrapper';
import { Logo } from '@/components/logo';
import { ComponentProps } from '@/types/component-type';
import { cn } from '@/lib/utils';
import { ProfileImage } from '@/components/profile-image';
import { initUser } from '@/types/global-types';
import { AuthButton } from '@/components/auth-button';
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/ui/spinner';

interface Props extends ComponentProps {
  isDark: boolean;
}

export const Header: React.FC<Props> = ({ className, isDark }) => {
  const [isLogin, hidrated] = useLocalStorageState<boolean>(
    isLoginSKey(),
    false
  );
  const [user_] = useLocalStorageState<User>(loginUserSKey(), initUser);
  const [user, setUser] = useState<User>(initUser);
  const [mState, setMState] = useState(true);

  useEffect(() => {
    setUser(user_);
  }, [user_]);

  if (!hidrated) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <header
      className={cn(
        `bg-background/50 sticky top-0 z-40 flex ${isDark ? 'text-background' : 'text-foreground'} py-3 backdrop-blur-md md:py-4.5`,
        className
      )}
    >
      <Wrapper className='flex-between'>
        <Logo className='' />
        {isLogin ? <ProfileImage {...user} /> : <AuthButton />}
      </Wrapper>
    </header>
  );
};
