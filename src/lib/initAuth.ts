import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IsLogin } from '@/states/slices/authSlice';
import { removeItems, useRemoveQuery } from './storages';
import { loginTokenSKey, loginUserSKey } from '@/features/auth/type';

export const InitAuth = () => {
  const [removeQuery] = useRemoveQuery();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  useEffect(() => {
    const user = loginUserSKey();
    const token = loginTokenSKey();

    if (token && user) {
      // const parsedUser: User = JSON.parse(user);
      dispatch(IsLogin(true));
    } else {
      // removeItems();
      removeQuery();
      dispatch(IsLogin(false));
    }
  }, [dispatch, queryClient]);

  return null;
};
