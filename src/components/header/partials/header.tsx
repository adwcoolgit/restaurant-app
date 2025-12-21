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
import { use, useEffect, useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { useDispatch, useSelector } from 'react-redux';
import { IsLogin } from '@/states/slices/authSlice';
import { RootState } from '@/states/store';
import { useCartSummary } from '@/hooks/useCartSummary';

interface Props extends ComponentProps {
  isDark: boolean;
}

export const Header: React.FC<Props> = ({ className, isDark }) => {
  // const { data: itemsInCart } = useCartSummary();
  const login = useSelector((state: RootState) => state.auth.isLogin);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin, hydrated] = useLocalStorageState<
    boolean | undefined
  >(isLoginSKey(), undefined);
  const [savedUser] = useLocalStorageState<User>(loginUserSKey(), initUser);
  const [user, setUser] = useState<User>(initUser);

  useEffect(() => {
    setUser(savedUser);
  }, [savedUser]);

  useEffect(() => {
    dispatch(IsLogin(Boolean(isLogin)));
  }, [login, isLogin]);

  return (
    <header
      className={cn(
        `bg-background/50 sticky top-0 z-40 flex ${isDark ? 'text-background' : 'text-foreground'} py-3 backdrop-blur-md md:py-4.5`,
        className
      )}
    >
      <Wrapper className='flex-between'>
        <Logo className='' />
        {hydrated && (isLogin ? <ProfileImage {...user} /> : <AuthButton />)}
      </Wrapper>
    </header>
  );
};
