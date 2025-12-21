'use client';

import { PopupMessage } from '@/components/popup-message';
import { AuthRegister } from '@/components/register/layout';
import { isLoginSKey } from '@/features/auth/type';
import { useLocalStorageState } from '@/lib/storages';
import { IsLogin } from '@/states/slices/authSlice';
import { RootState } from '@/states/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function SignUp() {
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
            <AuthRegister />
            <PopupMessage />
          </>
        ) : null)}
    </>
  );
}
