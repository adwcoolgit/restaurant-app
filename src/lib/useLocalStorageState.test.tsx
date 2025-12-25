/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';
import { useLocalStorageState } from './storages';
import { isRememberMeSKey } from '@/features/auth/type';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/states/slices/authSlice';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function TestComp({ k, initial }: { k: string; initial: any }) {
  const [state, setState, hydrated] = useLocalStorageState(k, initial);
  return (
    <div>
      <div data-testid='state'>{hydrated ? JSON.stringify(state) : 'not'}</div>
      <button onClick={() => setState({ updated: true })}>update</button>
    </div>
  );
}

describe('useLocalStorageState', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  function renderWithProvider(ui: React.ReactElement) {
    const store = configureStore({ reducer: { auth: authReducer } });
    const qc = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    return render(
      <Provider store={store}>
        <QueryClientProvider client={qc}>{ui}</QueryClientProvider>
      </Provider>
    );
  }

  it('hydrates from remember-me storage', async () => {
    localStorage.setItem(isRememberMeSKey(), '1');
    localStorage.setItem('myKey', JSON.stringify({ x: 1 }));

    renderWithProvider(<TestComp k='myKey' initial={{ x: 0 }} />);

    await waitFor(() => {
      expect(screen.getByTestId('state').textContent).toContain('"x":1');
    });
  });

  it('hydrates from expiry stored item when not remember-me', async () => {
    localStorage.setItem(isRememberMeSKey(), '0');
    const payload = { value: { y: 2 }, expiry: Date.now() + 10000 };
    localStorage.setItem('expKey', JSON.stringify(payload));

    renderWithProvider(<TestComp k='expKey' initial={{ y: 0 }} />);

    await waitFor(() => {
      expect(screen.getByTestId('state').textContent).toContain('"y":2');
    });
  });

  it('persists state changes when remember-me is set', async () => {
    localStorage.setItem(isRememberMeSKey(), '1');

    renderWithProvider(<TestComp k='persist' initial={{ a: 1 }} />);

    const btn = screen.getByText('update');
    fireEvent.click(btn);

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem('persist') || 'null');
      expect(stored).toEqual({ updated: true });
    });
  });
});
