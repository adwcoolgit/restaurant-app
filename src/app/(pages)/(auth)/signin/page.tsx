'use client';

import { AuthLogin } from '@/components/login/layout';
import { PopupMessage } from '@/components/popup-message';
import { useRouter } from 'next/navigation';
import { ClearStorage } from '@/functions/user-function';
import { Spinner } from '@/components/spinner';
import { useLocalStorageState } from '@/lib/storages';
import { isLoginSKey } from '@/features/auth/type';
import { useEffect, useState } from 'react';

export default function SignIn() {
  const [isLogin] = useLocalStorageState<boolean>(isLoginSKey(), false);
  const [mState, setMState] = useState(true);
  const router = useRouter();
  ClearStorage();

  useEffect(() => {
    if (isLogin) {
      router.push('/');
    }
    setMState(isLogin);
  }, []);

  if (mState) {
    return <Spinner />;
  }

  return (
    <>
      <AuthLogin />
      <PopupMessage />
    </>
  );
}
