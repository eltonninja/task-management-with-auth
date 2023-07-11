import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { TodoInfo } from '@/types';
import { AuthLayout } from '@/components/layout';
import { EditTaskForm } from '@/components/todos/task-edit-form';
import { createTodo, getAllTodos } from '@/store/slices/todo';
import { RootState } from '@/store';
import { useEffect } from 'react';

export default function CreateTaskPage() {
  const dispatch = useDispatch<Dispatch<any>>();
  const router = useRouter();

  const data = useSelector<RootState, TodoInfo | null>(state => state.todo.todo);
  useEffect(() => {
    if (data) {
      setTimeout(() => router.replace('/todos'), 1000);
    }
  }, [data])

  const handleSubmit = async (values: Omit<TodoInfo, 'id'>) => {
    await dispatch(createTodo(values));
    await dispatch(getAllTodos());
    router.push('/todos');
  }

  const handleBack = () => {
    router.back();
  }

  return (
    <AuthLayout>
      <EditTaskForm onSubmit={handleSubmit} onBack={handleBack} />
    </AuthLayout>
  )
}
