import { TodoInfo } from '@/types'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../base/table';
import { TodoItem } from './todo';

const headCells = [
  { id: 1, label: 'No', align: 'center' },
  { id: 2, label: 'Title', align: 'center' },
  { id: 3, label: 'Description', align: 'center' },
  { id: 4, label: 'Priority', align: 'center' },
]

export type TodoListProps = {
  data: TodoInfo[];
  onSelect: (id: string) => void;
}
export const TodoList = ({ data, onSelect }: TodoListProps) => {
  return (
    <Table className='w-full'>
      <TableHeader>
        <TableRow>
          {headCells.map(cell => (
            <TableCell key={cell.id} component='th' align={cell.align as any}>
              {cell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((todo, index) => (
          <TodoItem key={todo.id} {...{ todo, index, onSelect }} />
        ))}
      </TableBody>
    </Table>
  )
}
