'use client';

import { userQueryKey } from '@/features/auth/login.service';
import {
  isRememberMeSKey,
  loginTokenSKey,
  loginUserSKey,
  isLoginSKey,
} from '@/features/auth/type';
import { cartSummaryQueryKey } from '@/features/cart/cart-summary.service';
import { IsLogin } from '@/states/slices/authSlice';
import { setToast } from '@/states/slices/uiSlice';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState, useRef } from 'react';
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
      try {
        // broadcast expiry to other tabs
        localStorage.setItem(
          appStorageSKey(),
          JSON.stringify({ key, type: 'expired', ts: Date.now() })
        );
        localStorage.removeItem(appStorageSKey());
      } catch {}
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
  try {
    localStorage.setItem(
      appStorageSKey(),
      JSON.stringify({ key, type: 'removed', ts: Date.now() })
    );
    localStorage.removeItem(appStorageSKey());
  } catch {}
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
    // remove user-related query cache
    queryClient.removeQueries({ queryKey: userQueryKey() });

    // ensure cart summary is cleared (avoid showing stale data)
    try {
      queryClient.setQueryData(cartSummaryQueryKey(), {
        cart: [],
        summary: { totalItems: 0, totalPrice: 0, restaurantCount: 0 },
      });
      try {
        queryClient.invalidateQueries({ queryKey: cartSummaryQueryKey() });
      } catch {}
    } catch {}

    removeItems();

    try {
      // broadcast logout to other tabs so they can clear their caches
      localStorage.setItem(appLogOutSKey(), String(Date.now()));
    } catch {}
  };

  return [removeQuery];
}

export function useLocalStorageState<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const handlingStorageRef = useRef(false);
  const stateRef = useRef<T>(state);

  React.useEffect(() => {
    stateRef.current = state;
  }, [state]);

  React.useEffect(() => {
    try {
      const isRememberMe: boolean =
        localStorage.getItem(isRememberMeSKey()) === '1';
      const raw = isRememberMe
        ? localStorage.getItem(key)
        : getItemWithExpiry(key);

      if (raw !== null) {
        const data: T = JSON.parse(raw);
        setState(data);
      } else {
        setHydrated(true);
        // mark as logged out
        dispatch(IsLogin(false));
        try {
          // if the key that expired is the login flag, clear cart summary cache
          if (key === isRememberMeSKey() || key === isLoginSKey()) {
            queryClient.setQueryData(cartSummaryQueryKey(), {
              cart: [],
              summary: { totalItems: 0, totalPrice: 0, restaurantCount: 0 },
            });
            try {
              queryClient.invalidateQueries({
                queryKey: cartSummaryQueryKey(),
              });
            } catch {}
          }
        } catch {}
        return;
      }
    } catch {
      dispatch(setToast('[useLocalStorageState] hydrate error'));
    } finally {
      setHydrated(true);
    }
  }, [key, dispatch, queryClient]);

  React.useEffect(() => {
    if (!hydrated || typeof window === 'undefined') return;
    if (handlingStorageRef.current) return;
    try {
      const isRememberMe: boolean =
        localStorage.getItem(isRememberMeSKey()) === '1';
      if (isRememberMe) {
        localStorage.setItem(key, JSON.stringify(state));
      } else {
        setItemWithExpiry({
          key,
          value: key === isLoginSKey() && state === '' ? false : (state ?? ''),
        });
      }
    } catch {}
  }, [key, state, hydrated]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handler = (e: StorageEvent) => {
      // other tab broadcast: clear cart summary cache
      if (e.key === appLogOutSKey()) {
        try {
          queryClient.setQueryData(cartSummaryQueryKey(), {
            cart: [],
            summary: { totalItems: 0, totalPrice: 0, restaurantCount: 0 },
          });
          try {
            queryClient.invalidateQueries({ queryKey: cartSummaryQueryKey() });
          } catch {}
        } catch {}
        return;
      }
      if (e.key === appAddItem()) {
        queryClient.invalidateQueries({ queryKey: cartSummaryQueryKey() });
      }
      // also support generic storage broadcasts (app:storage)
      if (e.key === appStorageSKey()) {
        try {
          const payload = e.newValue ? JSON.parse(e.newValue) : null;
          if (payload && payload.key === key) {
            // Reuse same logic as if the specific key changed
            const isRememberMe: boolean =
              localStorage.getItem(isRememberMeSKey()) === '1';
            const raw = isRememberMe
              ? localStorage.getItem(key)
              : getItemWithExpiry(key);

            handlingStorageRef.current = true;
            if (raw !== null) {
              const parsed = JSON.parse(raw) as T;
              try {
                if (
                  JSON.stringify(parsed) !== JSON.stringify(stateRef.current)
                ) {
                  setState(parsed);
                }
              } catch {
                setState(parsed);
              }
            } else {
              if (
                JSON.stringify(initial) !== JSON.stringify(stateRef.current)
              ) {
                setState(initial as T);
              }
              if (key === isLoginSKey()) {
                try {
                  dispatch(IsLogin(false));
                } catch {}
              }
            }
            void Promise.resolve().then(() => {
              handlingStorageRef.current = false;
            });
          }
        } catch {}

        return;
      }

      queryClient.invalidateQueries({ queryKey: cartSummaryQueryKey() });

      if (e.key !== key) return;

      try {
        // Read storage using the same logic as hydrate to avoid nested wrappers
        const isRememberMe: boolean =
          localStorage.getItem(isRememberMeSKey()) === '1';
        const raw = isRememberMe
          ? localStorage.getItem(key)
          : getItemWithExpiry(key);

        handlingStorageRef.current = true;
        if (raw !== null) {
          const parsed = JSON.parse(raw) as T;
          try {
            if (JSON.stringify(parsed) !== JSON.stringify(stateRef.current)) {
              setState(parsed);
            }
          } catch {
            setState(parsed);
          }
        } else {
          // value was removed/expired in other tab
          if (JSON.stringify(initial) !== JSON.stringify(stateRef.current)) {
            setState(initial as T);
          }
          if (key === isLoginSKey()) {
            try {
              dispatch(IsLogin(false));
            } catch {}
          }
        }
        // reset the flag on next microtask after React has processed state updates
        void Promise.resolve().then(() => {
          handlingStorageRef.current = false;
        });
      } catch {}
    };

    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [key, queryClient, dispatch, initial]);

  return [state, setState, hydrated] as const;
}

export const appStorageSKey = () => 'app:storage';
export const appLogOutSKey = () => 'app:logout';
export const appAddItem = () => 'app:addItem';
