'use client';

import { PopupMessage } from '@/components/popup-message';
import { AuthRegister } from '@/components/register/layout';
import { Spinner } from '@/components/spinner';
import { isLoginSKey } from '@/features/auth/type';
import { ClearStorage } from '@/functions/user-function';
import { useLocalStorageState } from '@/lib/storages';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SignUp() {
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
      <AuthRegister />;
      <PopupMessage />
    </>
  );
}
