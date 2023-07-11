"use client";

import { useEffect, PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks';

export const AuthGuard = ({ children }: PropsWithChildren) => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin');
    }
  }, [user]);

  return user ? children : null;
}
