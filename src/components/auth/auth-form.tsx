import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextInput, Text } from '@/components/base/form';
import { Button, Spinner } from '@/components/base';
import { signIn, signUp } from '@/store/slices/user';
import { SignupPayload } from '@/types';
import Link from 'next/link';
import { useUser } from '@/hooks';


const initialValues: SignupPayload = {
  username: '',
  email: '',
  password: '',
}

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid mail address').required('Email is required'),
  username: yup.string(),
  password: yup.string().min(6, 'At least 6 characters are required'),
});

export type AuthFormType = {
  isSignUp?: boolean;
}
const AuthForm = ({ isSignUp = false }: AuthFormType) => {
  const { user, loading, error } = useUser();
  const dispatch = useDispatch<Dispatch<any>>();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (isSignUp) {
        dispatch(signUp(values));
      } else {
        dispatch(signIn({
          email: values.email,
          password: values.password,
        }));
      }
    }
  })

  return (
    <div className='w-[480px] my-40 mx-auto bg-white shadow-md rounded-md p-8'>
      <Text component='h2' className='text-2xl text-center font-bold my-8'>{isSignUp ? 'Sign Up' : 'Login'}</Text>
      <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <TextInput
          type='email'
          placeholder='Email address'
          name='email'
          className='w-full'
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {isSignUp && (
          <TextInput
            type='text'
            placeholder='Username'
            name='username'
            className='w-full'
            value={formik.values.username}
            onChange={formik.handleChange}
          />
        )}
        <TextInput
          type='password'
          placeholder='Password'
          name='password'
          className='w-full'
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        {!!error && <Text className='text-xs text-red-600'>{error}</Text>}

        <div className='flex justify-center'>
          <Button type='submit' className='w-full py-2 text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200 rounded flex justify-center'>
            {isSignUp ? 'Sign Up' : 'Login'}
            {loading && <Spinner />}
          </Button>
        </div>
        <div className='flex justify-end p-2'>
          {isSignUp ? (
            <Link href='/auth/signin'>
              <Text className='text-blue-700'>Sign in</Text>
            </Link>
          ) : (
            <Link href='/auth/signup'>
              <Text className='text-blue-700'>Sign up now</Text>
            </Link>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
