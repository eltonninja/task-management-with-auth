import { PropsWithChildren, TableHTMLAttributes } from 'react';
import { StyledProps } from '@/types';

export type TableCellProps = PropsWithChildren<StyledProps & Partial<TableHTMLAttributes<HTMLTableCellElement>> & {
  component?: string;
}>;
export const TableCell = ({ component, children, ...others }: TableCellProps) => {
  const Component: any = component ?? 'td';
  return (
    <Component {...others}>
      {children}
    </Component>
  );
}
