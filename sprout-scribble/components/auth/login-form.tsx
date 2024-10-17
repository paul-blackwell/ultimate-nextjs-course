'use client';

import AuthCard from '@/components/auth/auth-card';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <AuthCard
      cardTitle="Welcome back!"
      backButtonHref="/auth/register"
      backButtonLabel="Create a new account"
      showSocials
    >
      <Form></Form>
    </AuthCard>
  );
}
