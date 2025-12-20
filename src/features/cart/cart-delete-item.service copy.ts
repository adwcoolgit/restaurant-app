import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { setToast } from '@/states/slices/uiSlice';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Item } from './type';
import { ApiResponse } from '@/types/global-types';
import { cartSummaryQueryKey } from './cart-summary.service';

export async function deleteItemService(
  id: number
): Promise<ApiResponse<undefined>> {
  try {
    const { data } = await axiosInstance.delete<ApiResponse<undefined>>(
      `/api/cart/${id}`
    );

    return data;
  } catch (error) {
    throw error;
  }
}

type UseDeleteItemParams = {
  mutationConfig?: MutationConfig<typeof deleteItemService>;
};

export const useDeleteItem = (params: UseDeleteItemParams) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteItemService,
    onSuccess: (data) => {
      dispatch(setToast(data.message));
      queryClient.invalidateQueries({ queryKey: cartSummaryQueryKey() });
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
    ...params.mutationConfig,
  });
};
