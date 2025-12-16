import { ApiResponse } from '@/types/global-types';
import { AddToCart, CartItemList } from './type';
import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setToast } from '@/states/slices/uiSlice';
import axios from 'axios';
import { cartSummaryQueryKey } from './cart-summary.service';

export async function addToCartService(
  params: AddToCart
): Promise<ApiResponse<CartItemList>> {
  const { data } = await axiosInstance.post<ApiResponse<CartItemList>>(
    '/api/cart',
    params
  );
  return data;
}

type UseAddToCartParams = {
  mutationConfig?: MutationConfig<typeof addToCartService>;
};

export const useAddToCart = (params: UseAddToCartParams = {}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCartService,
    retry: false,
    onSuccess: (data) => {
      dispatch(setToast(data.message));
      queryClient.invalidateQueries({ queryKey: cartSummaryQueryKey() });
    },
    onError: (error) => {
      let message = 'Something went wrong';

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      dispatch(setToast(message));
    },
    ...params.mutationConfig,
  });
};
