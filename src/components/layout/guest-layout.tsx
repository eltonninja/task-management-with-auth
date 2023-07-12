import { PropsWithChildren } from 'react';
import { GuestGuard } from '@/components/guard';

export const GuestLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex w-full h-screen justify-center align-center bg-blue-500'>
      <GuestGuard>
        {children}
      </GuestGuard>
    </div>
  )
}
