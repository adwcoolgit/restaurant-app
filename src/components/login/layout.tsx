'use client';

import { LoginPayload, loginSchema } from '@/schemas/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { useLoginAction } from './action';
import { AuthContainer } from '../auth-container';
import { InputGroup } from '../input-group';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { isRememberMe } from '@/states/slices/authSlice';

interface AuthLoginProps {
  className?: string;
}

export const AuthLogin: React.FC<AuthLoginProps> = ({ className }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isPending, submitForm, isSuccess } = useLoginAction();

  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  });

  async function onSubmit(data: LoginPayload) {
    submitForm(data);
  }

  function onCheckedChange(checked: boolean | 'indeterminate') {
    dispatch(isRememberMe(checked === true));
  }

  useEffect(() => {
    if (isSuccess) {
      router.push('/');
    }
  });

  return (
    <>
      <AnimatePresence mode='wait'>
        <motion.div
          className={cn(
            'sm:px-auto absolute top-0 flex min-h-screen w-screen bg-black/10 px-3',
            className
          )}
          initial={{ y: 0, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, animationDuration: 0.5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          exit={{ opacity: 0, y: 0 }}
        >
          <AuthContainer isLogin={true} className=''>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit(onSubmit);
              }}
              className='flex w-full flex-col gap-y-5'
            >
              <InputGroup
                id='email'
                title='Email address'
                type='text'
                {...form.register('email')}
                placeholder='Email'
                errrorMessage={form.formState.errors.email?.message}
              />
              <InputGroup
                id='password'
                title='Password'
                type='password'
                {...form.register('password')}
                placeholder='Password'
                errrorMessage={form.formState.errors.password?.message}
              />
              <Label
                htmlFor='remember-me'
                className='text-md leading-md flex items-center gap-x-2 font-medium'
              >
                <Checkbox
                  id='remember-me'
                  className='size-5'
                  onCheckedChange={onCheckedChange}
                />
                Remember me
              </Label>
              <Button
                type='submit'
                disabled={isPending}
                variant='auth'
                className='mb-5 ml-0 flex w-full justify-center md:w-full'
              >
                Login
              </Button>
            </form>
          </AuthContainer>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
