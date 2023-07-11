import { PropsWithChildren } from 'react';
import { StyledProps } from '@/types';

export type TableHeadProps = PropsWithChildren<StyledProps>;
export const TableHeader = ({ children, style, className }: TableHeadProps) => (
  <thead {...{ style, className }}>
    {children}
  </thead>
);
