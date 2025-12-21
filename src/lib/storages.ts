'use client';

import { isRememberMeSKey } from '@/features/auth/type';
import { IsLogin } from '@/states/slices/authSlice';
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

export const setItemWitExpiry = <T>(params: storageProps<T>) => {
  const currentDate = new Date();
  const ttl = 1000 * 60 * 5;

  const item: itemWithExpiry<T> = {
    value: params.value,
    expiry: currentDate.getTime() + ttl,
  };

  localStorage.setItem(params.key, JSON.stringify(item));
};

export const getItemWithExpiry = (key: string) => {
  const itemString = localStorage.getItem(key);
  if (!itemString) return null;

  try {
    const item = JSON.parse(itemString);
    const currentDate = new Date();
    const itemExpiry: Date = new Date(item.expiry);

    if (currentDate > itemExpiry) {
      removeItems();
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
  localStorage.clear();

  return null;
};

export function useLocalStorageState<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    try {
      const isRememberMe: boolean = Boolean(
        Number(localStorage.getItem(isRememberMeSKey()))
      );
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
    if (localStorage.length === 0) return;

    try {
      const isRememberMe: boolean = Boolean(
        Number(localStorage.getItem(isRememberMeSKey()))
      );
      if (isRememberMe) {
        localStorage.setItem(key, JSON.stringify(state));
      } else {
        setItemWitExpiry({ key, value: state });
      }
    } catch {}
  }, [key, state, hydrated]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.length === 0) return;

    const handler = (e: StorageEvent) => {
      if (e.key !== e.newValue || e.newValue === null) return;

      try {
        setState(JSON.parse(e.newValue));
      } catch {}
    };
  });

  return [state, setState, hydrated] as const;
}
