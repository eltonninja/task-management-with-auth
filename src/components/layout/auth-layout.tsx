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
    <div className='flex flex-col w-full h-screen px-2 bg-blue-500'>
      <nav className='flex flex-row justify-end py-2 fixed right-4'>
        <Button onClick={handleSignout} variant='link' className='bg-white rounded-sm'>Sign out</Button>
      </nav>
      <div className='container container-md w-1/2 my-20 mx-auto bg-white shadow-md rounded-md p-8'>
        <AuthGuard>
          {children}
        </AuthGuard>
      </div>
    </div>
  )
}
