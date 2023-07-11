import { Paginated, TodoInfo } from "@/types"
import { readTodos, saveTodos } from "./utils";
import * as uuid from 'uuid';

export const getTodos = async (start: number, end: number | undefined): Promise<Paginated<TodoInfo>> => {
  const todos: TodoInfo[] = await readTodos();

  return {
    data: todos.slice(start, end),
    total: todos.length,
    start,
    end: Math.min(end ?? todos.length, todos.length)
  }
}

export const createTodo = async (values: Omit<TodoInfo, 'id'>) => {
  const todo: TodoInfo = {
    id: uuid.v4(),
    ...values,
  }

  const todos: TodoInfo[] = await readTodos();
  todos.push(todo);

  await saveTodos(todos);
  return todo;
}

export const deleteTodo = async (id: string) => {
  const todos: TodoInfo[] = await readTodos();
  const idx = todos.findIndex(todo => todo.id === id);
  if (idx >= 0) {
    todos.splice(idx, 1);
  }

  await saveTodos(todos);
  return todos;
}

export const getTodo = async (id: string) => {
  const todos: TodoInfo[] = await readTodos();
  return todos.find(todo => todo.id === id);
}

export const updateTodo = async (id: string, values: Omit<TodoInfo, 'id'>) => {
  const todos: TodoInfo[] = await readTodos();
  const todo = todos.find(todo => todo.id === id);

  if (!todo) return null;

  todo.title = values.title;
  todo.description = values.description;
  todo.priority = values.priority;
  todo.status = values.status;

  await saveTodos(todos);
  return todo;
}
