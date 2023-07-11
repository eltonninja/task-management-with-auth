import { StyledProps } from '@/types';
import { PropsWithChildren } from 'react';

export type TableProps = PropsWithChildren<StyledProps & {
  layout?: 'auto' | 'fixed';
}>;
export const Table = ({ children, layout, style, className }: TableProps) => (
  <table style={{ ...style, tableLayout: layout }} className={className}>
    {children}
  </table>
);

Table.defaultProps = {
  layout: 'auto',
}
