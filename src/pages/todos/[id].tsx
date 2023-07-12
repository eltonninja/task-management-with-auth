import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Dispatch } from '@reduxjs/toolkit';
import { TodoInfo } from '@/types';
import { AuthLayout } from '@/components/layout';
import { EditTaskForm } from '@/components/todos/task-edit-form';
import { deleteTodo, getDetail, updateTodo, getAllTodos } from '@/store/slices/todo';

export default function EditTaskPage() {
  const dispatch = useDispatch<Dispatch<any>>();
  const router = useRouter();

  const id = router.query.id as string;

  useEffect(() => {
    dispatch(getDetail({ id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleSubmit = (values: Omit<TodoInfo, 'id'>) => {
    dispatch(updateTodo({ id, todo: values }));
  }

  const handleBack = () => {
    router.back();
  }

  const handleDelete = async () => {
    await dispatch(deleteTodo({ id }));
    await dispatch(getAllTodos());
    router.push('/todos');
  }

  return (
    <AuthLayout>
      <EditTaskForm onSubmit={handleSubmit} onBack={handleBack} onDelete={handleDelete} />
    </AuthLayout>
  )
}
