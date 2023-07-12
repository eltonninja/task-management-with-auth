import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';
import { clearTodo, getAllTodos, getDetail, setRange } from '@/store/slices/todo';
import { useTodos } from '@/hooks/use-todos';
import { TodoList } from '@/components/todos/todo-list';
import { Text } from '@/components/base/form';
import { Button } from '@/components/base';
import { AuthLayout } from '@/components/layout';
import { DEFAULT_PAGE_SIZE } from '@/config';

export default function TodoListPage() {
  const router = useRouter();
  const dispatch = useDispatch<Dispatch<any>>();

  const [page, setPage] = useState(0);
  const { todos, start, end } = useTodos();
  const { data, total } = todos;

  useEffect(() => {
    dispatch(setRange({ start: page * DEFAULT_PAGE_SIZE, end: page * DEFAULT_PAGE_SIZE + DEFAULT_PAGE_SIZE }));
  }, [page])

  useEffect(() => {
    dispatch(getAllTodos({ start, end }));
  }, [start, end]);

  const handleSelect = (id: string) => {
    router.push(`/todos/${id}`);
  }

  const handleNew = () => {
    dispatch(clearTodo());
    router.push(`todos/create`);
  }

  return (
    <AuthLayout>
      <div className='todo-list-container'>
        <Text component='h2' className='text-2xl font-bold my-2 text-center text-blue-500'>Todo List</Text>
        <div className='flex justify-end py-2'>
          <Button onClick={handleNew}>+ New Task</Button>
        </div>
        {!data?.length ? (
          <Text>No data</Text>
        ) : (
          <>
            <TodoList data={data} onSelect={handleSelect} />
          </>
        )}
      </div>
    </AuthLayout>
  )
}
