import { useRegister } from '@/features/auth/register.service';
import { loginTokenSKey, loginUserSKey } from '@/features/auth/type';
import { RegisterPayload, registerSchema } from '@/schemas/register.schema';
import { setDialog } from '@/states/slices/uiSlice';
import axios from 'axios';
import { useCallback } from 'react';

export const useRegisterAction = () => {
  const {
    mutateAsync: registerMutate,
    isPending,
    isSuccess,
    ...props
  } = useRegister();

  // Gunakan useCallback , mencegah submitForm dibuat ulang setiap render, menghemat re-render di komponen yang
  const submitForm = useCallback(
    async (data: RegisterPayload) => {
      const result = registerSchema.safeParse(data);

      if (!result.success) {
        return { success: false, message: 'There something went wrong' };
      }

      try {
        const res = await registerMutate(data);

        localStorage.setItem(JSON.stringify(data), loginUserSKey());
        localStorage.setItem(res.token, loginTokenSKey());

        setDialog(undefined);
      } catch (error) {
        let message = 'Login failed, please try again';

        if (axios.isAxiosError(error))
          message = error.response?.data.message || error.message;
        else if (error instanceof Error) message = error.message;

        return { success: false, message: message };
      }

      return { success: true, message: 'Request submitted' };
    },
    [registerMutate]
  );

  return { submitForm, isPending, isSuccess, ...props };
};
