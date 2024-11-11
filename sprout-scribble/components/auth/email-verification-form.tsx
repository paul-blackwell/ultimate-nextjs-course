'use client';
import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { newVerification } from '@/server/actions/tokens';
import AuthCard from '@/components/auth/auth-card';
import { FormSuccess } from '@/components/auth/form-success';
import { FormError } from '@/components/auth/form-error';

export default function EmailVerificationForm() {
  const router = useRouter();
  const token = useSearchParams().get('token');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleVerification = useCallback(async () => {
    if (success || error) return;
    if (!token) return setError('Token not found');

    newVerification(token).then((data) => {
      if (data.error) setError(data.error);
      if (data.success) {
        setSuccess(data.success);
        router.push('/auth/login');
      }
    });
  }, []);

  useEffect(() => {
    handleVerification();
  }, []);

  return (
    <AuthCard
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      cardTitle="Verify your account"
    >
      <div className="flex items-center flex-col w-full justify-center">
        <p>{!success && !error ? 'Verifying email...' : null}</p>
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </AuthCard>
  );
}
