import { useLogin } from '@/features/auth/login.service';
import { loginTokenSKey, loginUserSKey } from '@/features/auth/type';
import { LoginPayload, loginSchema } from '@/schemas/login.schema';
import { setDialog } from '@/states/slices/uiSlice';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

export const useLoginAction = () => {
  const queryClient = useQueryClient();
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
        return error;
      }
    },
    [loginMutate]
  );

  return { submitForm, isPending, isSuccess, ...props };
};
