import { beforeEach, describe, expect, it } from 'vitest';
import {
  setItemWithExpiry,
  getItemWithExpiry,
  setItem,
  removeItem,
  removeItems,
} from './storages';
import { loginTokenSKey, loginUserSKey } from '../features/auth/type';

describe('storages helpers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('setItem and removeItem work', () => {
    setItem('k', 'v');
    expect(localStorage.getItem('k')).toBe('v');
    removeItem('k');
    expect(localStorage.getItem('k')).toBeNull();
  });

  it('setItemWithExpiry and getItemWithExpiry return value before expiry', () => {
    const key = 'foo';
    const value = { a: 1 };
    setItemWithExpiry({ key, value });
    const raw = getItemWithExpiry(key);
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw as string)).toEqual(value);
  });

  it('getItemWithExpiry returns null for expired items', () => {
    const key = 'expired';
    const payload = { value: { b: 2 }, expiry: Date.now() - 1000 };
    localStorage.setItem(key, JSON.stringify(payload));
    expect(getItemWithExpiry(key)).toBeNull();
  });

  it('removeItems removes login token and user keys', () => {
    localStorage.setItem(loginTokenSKey(), 'tk');
    localStorage.setItem(loginUserSKey(), JSON.stringify({ id: 1 }));
    removeItems();
    expect(localStorage.getItem(loginTokenSKey())).toBeNull();
    expect(localStorage.getItem(loginUserSKey())).toBeNull();
  });
});
