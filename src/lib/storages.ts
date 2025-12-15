'use client';

import { isRememberMeSKey } from '@/features/auth/type';
import React, { useEffect, useState } from 'react';

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

    if (currentDate.getTime() > item.expiry) {
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
  localStorage.clear();
  return null;
};

export function useLocalStorageState<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

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

    const handler = (e: StorageEvent) => {
      if (e.key !== e.newValue || e.newValue === null) return;

      try {
        setState(JSON.parse(e.newValue));
      } catch {}
    };
  });

  return [state, setState, hydrated] as const;
}
