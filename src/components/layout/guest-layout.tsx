import { PropsWithChildren } from 'react';
import { GuestGuard } from '@/components/guard';

export const GuestLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex w-full h-screen justify-center align-center'>
      <GuestGuard>
        {children}
      </GuestGuard>
    </div>
  )
}
