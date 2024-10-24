'use client';

import AuthCard from '@/components/auth/auth-card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoginSchema } from '@/types/login-schema';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { emailSignIn } from '@/server/actions/email-sign';
import { useAction } from 'next-safe-action/hooks';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [error, setError] = useState();

  const { execute, status } = useAction(emailSignIn, {
    onSuccess(data) {
      console.log(data);
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    // React hook form will handle all validation, so if we get values the form was submitted correctly
    execute(values);
  };

  return (
    <AuthCard
      cardTitle="Create an account"
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account?"
      showSocials
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="email@gmail.com"
                      type="email"
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="********"
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size={'sm'} variant={'link'} asChild>
              <Link href="/auth/reset">Forgot your password</Link>
            </Button>
          </div>
          <Button
            type="submit"
            className={cn(
              'w-full my-2',
              status === 'executing' ? 'animate-pulse' : ''
            )}
          >
            Login
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
