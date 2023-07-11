import { TodoInfo } from '@/types';
import { TableRow, TableCell } from '@/components/base/table';
import { Text } from '@/components/base/form';

type TodoItemProps = {
  index: number;
  todo: TodoInfo;
  onSelect: (id: string) => void;
}

export const TodoItem = ({ index, todo, onSelect }: TodoItemProps) => {
  const handleSelect = () => {
    if (onSelect) {
      onSelect(todo.id);
    }
  }

  return (
    <TableRow onClick={handleSelect} className='cursor-pointer'>
      <TableCell align='center'>
        <Text className='px-2 py-1'>{index}</Text>
      </TableCell>
      <TableCell align='center'>
        <Text className='px-2 py-1'>{todo.title}</Text>
      </TableCell>
      <TableCell align='center'>
        <Text className='px-2 py-1'>{todo.description}</Text>
      </TableCell>
      <TableCell align='center'>
        <Text className='px-2 py-1'>{todo.priority}</Text>
      </TableCell>
    </TableRow>
  );
}