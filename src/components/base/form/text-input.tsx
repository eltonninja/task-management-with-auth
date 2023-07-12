import { InputHTMLAttributes } from 'react';
import { StyledProps } from '@/types';
import { Text } from './text';

export type TextInputProps = StyledProps & InputHTMLAttributes<HTMLInputElement> & {
  multiline?: boolean;
  error?: string;
};

export const TextInput = ({ error = '', multiline = false, className, ...others }: TextInputProps) => {
  const Component: any = multiline ? 'textarea' : 'input'
  const classes = 'px-4 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-200 rounded';

  return (
    <div className='my-2 w-full'>
      <Component {...others} className={`${classes} ${className}`} />

      {!!error && <Text className='text-xs text-red-600'>{error}</Text>}
    </div>
  );
}
