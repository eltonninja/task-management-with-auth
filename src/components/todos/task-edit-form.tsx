import { MouseEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextInput, Text, Select } from '@/components/base/form';
import { Button, Spinner } from '@/components/base';
import { Priority, TodoInfo, TodoStatus } from '@/types';
import { useTodos } from '@/hooks';

const initialValues: Omit<TodoInfo, 'id'> = {
  title: '',
  description: '',
  status: TodoStatus.Ready,
  priority: Priority.Normal,
};

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
});

const priorityOptions = [
  { id: 1, label: Priority.High, value: Priority.High },
  { id: 2, label: Priority.Normal, value: Priority.Normal },
  { id: 3, label: Priority.Low, value: Priority.Low },
];
const statusOptions = [
  { id: 1, label: TodoStatus.Ready, value: TodoStatus.Ready },
  { id: 2, label: TodoStatus.InProgress, value: TodoStatus.InProgress },
  { id: 3, label: TodoStatus.Completed, value: TodoStatus.Completed },
];
export type EditTaskFormProps = {
  onSubmit: (values: Omit<TodoInfo, 'id'>) => void | Promise<void>;
  onBack?: () => void;
  onDelete?: () => void;
}
export const EditTaskForm = ({ onSubmit, onBack, onDelete }: EditTaskFormProps) => {
  const router = useRouter();

  const {
    todo: data,
    deleteStatus: { loading: deleting, error: deleteError },
    updateStatus: { loading: updating, error: updateError },
    createStatus: { loading: creating, error: createError },
  } = useTodos();
  const formik = useFormik({
    initialValues: data ? data : initialValues,
    validationSchema,
    onSubmit,
  });

  const handleDelete = (e: MouseEvent) => {
    e.preventDefault();
    onDelete?.();
  }

  useEffect(() => {
    if (data) {
      formik.setValues({
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
      });
    }
  }, [data])

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex justify-start'>
        {!!onBack && <Button onClick={onBack} variant='link'>Back</Button>}
      </div>
      <Text component='h2' className='text-2xl font-bold my-2 text-center'>
        {data ? 'Update a task' : 'Create a task'}
      </Text>
      <form onSubmit={formik.handleSubmit} className='w-[480px] mx-auto mt-8'>
        <TextInput
          placeholder='Title'
          name='title'
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.errors.title}
          className='w-full my-2'
        />

        <TextInput
          placeholder='Description'
          name='description'
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.errors.description}
          className='w-full my-1'
        />

        <Text>Priority</Text>
        <Select
          name='priority'
          value={formik.values.priority}
          onChange={formik.handleChange}
          className='w-full my-1'
          options={priorityOptions}
        />

        <Text>Status</Text>
        <Select
          name='status'
          value={formik.values.status}
          onChange={formik.handleChange}
          className='w-full my-1'
          options={statusOptions}
        />

        <div className={`flex ${router.query.id ? 'justify-between' : 'justify-end'} mt-4`}>
          {!!router.query.id && (
            <Button variant='danger' className='m-2 inline-flex items-center' onClick={handleDelete}>
              Delete
              {deleting && <Spinner />}
            </Button>
          )}
          <Button type='submit' className='m-2 inline-flex items-center' variant='normal'>
            {router.query.id ? 'Update' : 'Create'}
            {((creating && !router.query.id) || (updating && !!router.query.id)) && <Spinner />}
          </Button>
        </div>
      </form>
    </div>
  )
}
