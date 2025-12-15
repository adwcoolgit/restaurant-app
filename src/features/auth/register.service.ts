import { MutationConfig } from '@/lib/react-query';
import { RegisterPayload } from '@/schemas/register.schema';
import { IsRegister } from '@/states/slices/authSlice';
import { setToast } from '@/states/slices/uiSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { getUserQKey, RegisterResponse, User } from './type';
import { axiosInstance } from '@/lib/axios';
import axios from 'axios';
import { ApiResponse } from '@/types/global-types';

export async function registerService(
  params: RegisterPayload
): Promise<RegisterResponse> {
  const { data } = await axiosInstance.post<ApiResponse<RegisterResponse>>(
    '/api/auth/register',
    params
  );

  return data.data;
}

type UseRegisterParam = {
  mutationConfig?: MutationConfig<typeof registerService>;
};

export const useRegister = (params: UseRegisterParam = {}) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: registerService,
    ...params.mutationConfig,
    onSuccess: (data, variables, onMutationResult, contex) => {
      if (!data.token) return;

      queryClient.setQueryData<User>(getUserQKey(), data.user);
      dispatch(IsRegister(true));

      params.mutationConfig?.onSuccess?.(
        data,
        variables,
        onMutationResult,
        contex
      );
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
