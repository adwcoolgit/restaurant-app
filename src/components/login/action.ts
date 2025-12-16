import { useLogin } from '@/features/auth/login.service';
import { LoginPayload, loginSchema } from '@/schemas/login.schema';
import { setDialog } from '@/states/slices/uiSlice';
import axios from 'axios';
import { useCallback } from 'react';

export const useLoginAction = () => {
  const {
    mutateAsync: loginMutate,
    isPending,
    isSuccess,
    ...props
  } = useLogin();

  // Gunakan useCallback , mencegah submitForm dibuat ulang setiap render, menghemat re-render di komponen
  const submitForm = useCallback(
    async (data: LoginPayload) => {
      const result = loginSchema.safeParse(data);

      if (!result.success) {
        return { success: false, message: 'There something went wrong' };
      }

      try {
        const res = await loginMutate(data);

        setDialog(undefined);
        return res;
      } catch (error) {
        let message = 'Login failed, please try again';

        if (axios.isAxiosError(error))
          message = error.response?.data.message || error.message;
        else if (error instanceof Error) message = error.message;

        return { success: false, message: message };
      }
    },
    [loginMutate]
  );

  return { submitForm, isPending, isSuccess, ...props };
};
