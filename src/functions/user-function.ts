import { isRememberMeSKey } from '@/features/auth/type';
import { removeItems, useLocalStorageState } from '@/lib/storages';
import { useEffect } from 'react';

function ClearStorage() {
  const [rememberMe] = useLocalStorageState<boolean>(isRememberMeSKey(), false);

  useEffect(() => {
    // if (!rememberMe) removeItems();
  }, []);
}

export { ClearStorage };
