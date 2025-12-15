import { useRegister } from '@/features/auth/register.service';
import {
  getUserQKey,
  loginTokenSKey,
  loginUserSKey,
  User,
} from '@/features/auth/type';
import { RegisterPayload, registerSchema } from '@/schemas/register.schema';
import { setDialog } from '@/states/slices/uiSlice';
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
        // Kalau login adalah createAsyncThunk, .unwrap() akan lempar error secara langsung kalau gagal,
        // await dispatch(login(data)).unwrap();
        const res = await registerMutate(data);

        localStorage.setItem(JSON.stringify(data), loginUserSKey());
        localStorage.setItem(res.token, loginTokenSKey());

        setDialog(undefined);
      } catch (error) {
        return { success: false, message: 'Login failed, please try again' };
      }

      return { success: true, message: 'Request submitted' };
    },
    [registerMutate]
  );

  return { submitForm, isPending, isSuccess, ...props };
};
