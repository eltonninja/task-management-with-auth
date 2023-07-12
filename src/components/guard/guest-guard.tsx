"use client";

import { useEffect, PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks';

export const GuestGuard = ({ children }: PropsWithChildren) => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/todos');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return !user ? children : null;
}
