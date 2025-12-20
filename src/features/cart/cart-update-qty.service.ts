import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { setToast } from '@/states/slices/uiSlice';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Item, UpdateQtyVariables } from './type';
import { ApiResponse } from '@/types/global-types';
import { cartSummaryQueryKey } from './cart-summary.service';

export async function updateQtyService(
  params: UpdateQtyVariables
): Promise<ApiResponse<Item>> {
  try {
    const { data } = await axiosInstance.put<ApiResponse<Item>>(
      `/api/cart/${params.id}`,
      params.params
    );

    return data;
  } catch (error) {
    throw error;
  }
}

type UseUpdateQtyParams = {
  mutationConfig?: MutationConfig<typeof updateQtyService>;
};

export const useUpdateQty = (params: UseUpdateQtyParams) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateQtyService,
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
