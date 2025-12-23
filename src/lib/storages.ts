'use client';

import { userQueryKey } from '@/features/auth/login.service';
import {
  isRememberMeSKey,
  loginTokenSKey,
  loginUserSKey,
} from '@/features/auth/type';
import { cartSummaryQueryKey } from '@/features/cart/cart-summary.service';
import { IsLogin } from '@/states/slices/authSlice';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface storageProps<T> {
  key: string;
  value: T;
}

interface itemWithExpiry<T> {
  value: T;
  expiry: number;
}

export const setItemWithExpiry = <T>(params: storageProps<T>) => {
  const currentDate = new Date();
  const ttl = 1000 * 60 * 5;

  const item: itemWithExpiry<T> = {
    value: params.value,
    expiry: currentDate.getTime() + ttl,
  };

  localStorage.setItem(params.key, JSON.stringify(item));
};

export const getItemWithExpiry = (key: string) => {
  if (typeof window === 'undefined') return null;
  const itemString = localStorage.getItem(key);
  if (!itemString) return null;

  try {
    const item = JSON.parse(itemString) as itemWithExpiry<unknown> | null;
    if (!item || typeof item.expiry !== 'number') {
      localStorage.removeItem(key);
      return null;
    }

    const current = Date.now();
    if (current > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return JSON.stringify(item.value);
  } catch {
    localStorage.removeItem(key);
    return null;
  }
};

export const setItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
  return null;
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
  return null;
};

export const removeItems = () => {
  if (typeof window === 'undefined') return;
  removeItem(loginTokenSKey());
  removeItem(loginUserSKey());

  return null;
};

export function useRemoveQuery() {
  const queryClient = useQueryClient();

  const removeQuery = () => {
    queryClient.removeQueries({ queryKey: cartSummaryQueryKey() });
    queryClient.removeQueries({ queryKey: userQueryKey() });
    removeItems();
  };

  return [removeQuery];
}

export function useLocalStorageState<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    try {
      const isRememberMe: boolean =
        localStorage.getItem(isRememberMeSKey()) === '1';
      const raw = isRememberMe
        ? localStorage.getItem(key)
        : getItemWithExpiry(key);

      if (raw !== null) {
        //   setState(JSON.parse(raw));
        // } else {
        const data: T = JSON.parse(raw);
        setState(data);
      } else {
        setHydrated(true);
        dispatch(IsLogin(false));
        return;
      }
    } catch {
      console.info('[useLocalStorageState] hydrate error');
    } finally {
      setHydrated(true);
    }
  }, [key]);

  React.useEffect(() => {
    if (!hydrated || typeof window === 'undefined') return;

    try {
      const isRememberMe: boolean =
        localStorage.getItem(isRememberMeSKey()) === '1';
      if (isRememberMe) {
        localStorage.setItem(key, JSON.stringify(state));
      } else {
        setItemWithExpiry({ key, value: state });
      }
    } catch {}
  }, [key, state, hydrated]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handler = (e: StorageEvent) => {
      if (e.key !== key || e.newValue === null) return;

      try {
        setState(JSON.parse(e.newValue));
      } catch {}
    };

    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [key]);

  return [state, setState, hydrated] as const;
}
