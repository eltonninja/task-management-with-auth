import { RootState, useSelector } from '@/store';

export const useTodos = () => useSelector((state: RootState) => state.todo);
