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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return user ? children : null;
}
