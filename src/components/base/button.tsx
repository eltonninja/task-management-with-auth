"use client";

import { ButtonHTMLAttributes } from 'react';
import { StyledProps } from '@/types';

export type ButtonProps = StyledProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'normal' | 'danger' | 'link'
};

export const Button = ({ variant = 'normal', className, ...others }: ButtonProps) => {
  const classes = (
    variant === 'normal' ?
    'bg-blue-600 text-slate-200' : variant === 'danger' ?
    'bg-red-600 text-slate-200' :
    'bg-transparent text-blue-600'
  );
  return (
    <button className={`${classes} px-3 py-1.5 rounded ${className}`} {...others} />
  );
}
