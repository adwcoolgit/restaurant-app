'use client';

import { cn } from '@/lib/utils';
import { RegisterPayload, registerSchema } from '@/schemas/register.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { Resolver, useForm } from 'react-hook-form';
import { useRegisterAction } from './action';
import { RootState } from '@/states/store';
import { AuthContainer } from '@/components/auth-container';
import { InputGroup } from '@/components/input-group';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { useLocalStorageState } from '@/lib/storages';
import { isLoginSKey } from '@/features/auth/type';
import { useEffect, useState } from 'react';
import { Spinner } from '../spinner';

interface AuthRegisterProps {
  className?: string;
}

export const AuthRegister: React.FC<AuthRegisterProps> = ({ className }) => {
  const router = useRouter();
  const { isPending, submitForm, isSuccess } = useRegisterAction();
  const authDialog = useSelector((state: RootState) => state.ui.authDialog);

  const form = useForm<RegisterPayload>({
    resolver: zodResolver(registerSchema) as Resolver<RegisterPayload>,
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onTouched',
  });

  useEffect(() => {
    if (isSuccess) {
      router.push('/');
    }
  });

  async function onSubmit(data: RegisterPayload) {
    submitForm(data);
  }

  return (
    <AnimatePresence key={authDialog}>
      <motion.div
        className={cn(
          'sm:px-auto absolute top-0 z-50 flex min-h-screen w-screen bg-white px-0',
          className
        )}
        initial={{ y: 0, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1, animationDuration: 0.5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        exit={{ opacity: 0, y: 0 }}
      >
        <AuthContainer isLogin={authDialog === 'LOG_IN' ? true : false}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex w-full flex-col gap-y-5'
          >
            <InputGroup
              id='name'
              title='Name'
              type='text'
              {...form.register('name')}
              placeholder='Name'
              errrorMessage={form.formState.errors.name?.message}
            />
            <InputGroup
              id='phone'
              title='Number Phone'
              type='text'
              {...form.register('phone')}
              placeholder='Enter your number phone'
              errrorMessage={form.formState.errors.name?.message}
            />
            <InputGroup
              id='email'
              title='Email address'
              type='text'
              {...form.register('email')}
              placeholder='Enter your email'
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
            <InputGroup
              id='confrimPassword'
              title='Confirm Password'
              type='password'
              {...form.register('confirmPassword')}
              placeholder='Confirm Password'
              errrorMessage={form.formState.errors.confirmPassword?.message}
            />
            <Button
              type='submit'
              disabled={isPending}
              variant='auth'
              className='mb-5 ml-0 flex w-full justify-center md:w-full'
            >
              Register
            </Button>
          </form>
        </AuthContainer>
      </motion.div>
    </AnimatePresence>
  );
};
