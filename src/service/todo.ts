import { SERVICE_ROOT } from '@/config';
import { httpClient } from './base';
import { TodoInfo, Paginated, TodoCreatePayload, TodoGetAllPayload, TodoDetailPayload, TodoUpdatePayload } from '@/types';


const TODO_API_ROOT = `${SERVICE_ROOT}/todos`;

export const createTodo = async (todo: TodoCreatePayload) => httpClient.post<TodoInfo>(TODO_API_ROOT, todo);

export const getAllTodos = async (range: TodoGetAllPayload) => httpClient.get<Paginated<TodoInfo>>(TODO_API_ROOT, range);

export const getTodo = async ({ id }: TodoDetailPayload) => httpClient.get<TodoInfo>(`${TODO_API_ROOT}/${id}`);

export const updateTodo = async ({ id, todo }: TodoUpdatePayload) => httpClient.put<TodoInfo>(`${TODO_API_ROOT}/${id}`, todo);

export const deleteTodo = async ({ id }: TodoDetailPayload) => httpClient.delete(`${TODO_API_ROOT}/${id}`);
