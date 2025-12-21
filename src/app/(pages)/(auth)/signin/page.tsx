'use client';

import { AuthLogin } from '@/components/login/layout';
import { PopupMessage } from '@/components/popup-message';
import { useRouter } from 'next/navigation';
import { useLocalStorageState } from '@/lib/storages';
import { isLoginSKey } from '@/features/auth/type';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/states/store';
import { IsLogin } from '@/states/slices/authSlice';

export default function SignIn() {
  const login = useSelector((state: RootState) => state.auth.isLogin);
  const [isLogin, setIsLogin, hydrated] = useLocalStorageState<
    boolean | undefined
  >(isLoginSKey(), undefined);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(IsLogin(Boolean(isLogin)));
  }, [isLogin]);

  useEffect(() => {
    if (login) {
      router.push('/');
    }
  }, [login]);

  return (
    <>
      {hydrated &&
        (!login ? (
          <>
            <AuthLogin />
            <PopupMessage />
          </>
        ) : null)}
    </>
  );
}
