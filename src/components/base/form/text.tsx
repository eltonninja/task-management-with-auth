import { PropsWithChildren, Component } from 'react';
import { StyledProps } from '@/types';

export type TextProps = PropsWithChildren<StyledProps & {
  component?: string | Component;
}>

export const Text = ({ children, style = {}, className, component = 'p' }: TextProps) => {
  const Component: any = component;
  return (
    <Component {...{ style, className }}>{children}</Component>
  )
}
