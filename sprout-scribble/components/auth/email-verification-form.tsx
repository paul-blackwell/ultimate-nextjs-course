'use client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

export default function EmailVerificationForm() {
  const token = useSearchParams().get('token');

  return null;
}
