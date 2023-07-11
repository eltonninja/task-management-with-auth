import { PropsWithChildren, TableHTMLAttributes } from 'react';
import { StyledProps } from '@/types';

export type TableRowProps = PropsWithChildren<StyledProps & Partial<TableHTMLAttributes<HTMLTableRowElement>>>;
export const TableRow = ({ children, ...others }: TableRowProps) => (
  <tr {...others}>
    {children}
  </tr>
);
