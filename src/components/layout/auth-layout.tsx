import { PropsWithChildren } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { signOut } from '@/store/slices/user';
import { AuthGuard } from '@/components/guard';
import { Button } from '@/components/base';

export const AuthLayout = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch<Dispatch<any>>();

  const handleSignout = () => {
    dispatch(signOut());
  }

  return (
    <div className='flex flex-col w-full h-screen px-2'>
      <nav className='flex flex-row justify-end py-2'>
        <Button onClick={handleSignout} variant='link'>Sign out</Button>
      </nav>
      <div className='container container-md mx-auto'>
        <AuthGuard>
          {children}
        </AuthGuard>
      </div>
    </div>
  )
}
