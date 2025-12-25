import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { LoginPayload } from '@/schemas/login.schema';
import { setToast } from '@/states/slices/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/states/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IsLogin } from '@/states/slices/authSlice';
import axios from 'axios';
import {
  isLoginSKey,
  isRememberMeSKey,
  LoginResponse,
  loginTokenSKey,
  loginUserSKey,
} from './type';
import {
  removeItems,
  setItem,
  setItemWithExpiry,
  useRemoveQuery,
} from '@/lib/storages';
import { ApiResponse } from '@/types/global-types';

export async function loginService(
  params: LoginPayload
): Promise<LoginResponse> {
  try {
    const { data } = await axiosInstance.post<ApiResponse<LoginResponse>>(
      '/api/auth/login',
      params
    );

    return data.data;
  } catch (error) {
    throw error;
  }
}

type UseLoginParams = {
  mutationConfig?: MutationConfig<typeof loginService>;
};

export const useLogin = (params: UseLoginParams = {}) => {
  const isRememberMe = useSelector(
    (state: RootState) => state.auth.blnRememberMe
  );
  const queryClient = useQueryClient();
  const [removeQuery] = useRemoveQuery();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: loginService,
    ...params.mutationConfig,
    onSuccess: (data, variable, onMutateResult, context) => {
      // removeItems();
      removeQuery();
      if (!data) return;

      axiosInstance.defaults.headers.Authorization = `Bearer ${data.token}`;

      setItem(isRememberMeSKey(), String(Number(isRememberMe)));
      if (!isRememberMe) {
        setItemWithExpiry({
          key: loginUserSKey(),
          value: data.user,
        });
        setItemWithExpiry({ key: loginTokenSKey(), value: data.token });
        setItemWithExpiry({ key: isLoginSKey(), value: true });
      } else {
        setItem(loginUserSKey(), JSON.stringify(data.user));
        setItem(loginTokenSKey(), data.token);
        setItem(isLoginSKey(), 'true');
      }

      dispatch(IsLogin(true));
      queryClient.invalidateQueries({ queryKey: userQueryKey() });

      return {
        data,
        variable,
        onMutateResult,
        context,
      };
    },
    onError: (error) => {
      let message = 'Something went wrong';

      if (axios.isAxiosError(error)) {
        message = error.response?.data.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      dispatch(setToast(message));
    },
    retry: false,
  });
};

export const userQueryKey = () => ['me'];
