import { PropsWithChildren } from 'react';
import { StyledProps } from '@/types';

export type TableBodyProps = PropsWithChildren<StyledProps>;
export const TableBody = ({ children, style, className }: TableBodyProps) => (
  <tbody {...{ style, className }}>
    {children}
  </tbody>
);
