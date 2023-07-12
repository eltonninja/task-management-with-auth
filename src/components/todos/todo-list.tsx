import { TodoInfo } from '@/types'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../base/table';
import { TodoItem } from './todo';

const headCells = [
  { id: 1, label: 'No', align: 'center' },
  { id: 2, label: 'Title', align: 'center' },
  { id: 3, label: 'Description', align: 'center' },
  { id: 4, label: 'Priority', align: 'center' },
  { id: 5, label: 'Status', align: 'center' },
]

export type TodoListProps = {
  data: TodoInfo[];
  onSelect: (id: string) => void;
}
export const TodoList = ({ data, onSelect }: TodoListProps) => {
  return (
    <Table className='w-full divide-y divide-gray-200'>
      <TableHeader>
        <TableRow className='bg-gray-50'>
          {headCells.map(cell => (
            <TableCell key={cell.id} component='th' align={cell.align as any} className='px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>
              {cell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className='bg-white divide-y divide-gray-200'>
        {data.map((todo, index) => (
          <TodoItem key={todo.id} {...{ todo, index, onSelect }} />
        ))}
      </TableBody>
    </Table>
  )
}
