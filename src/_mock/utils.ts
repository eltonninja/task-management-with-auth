import { TodoInfo, UserInfo } from '@/types';
import fs from 'fs';

export const readFile = (path: string): Promise<string> => new Promise((resolve, reject) => {
  fs.readFile(path, (error, data) => {
    if (error) {
      reject(error);
    } else {
      resolve(data.toString());
    }
  });
});

export const writeFile = (path: string, content: string): Promise<void> => new Promise((resolve) => {
  fs.writeFile(path, content, { flag: 'w+' }, () => {
    resolve();
  });
});

export const readUsers = async () => {
  const result = await readFile('./src/_mock/users.json');
  return JSON.parse(result);
}

export const saveUsers = async (users: UserInfo[]) => writeFile('./src/_mock/users.json', JSON.stringify(users));

export const readTodos = async () => {
  const result = await readFile('./src/_mock/todos.json');
  return JSON.parse(result);
}

export const saveTodos = async (todos: TodoInfo[]) => writeFile('./src/_mock/todos.json', JSON.stringify(todos));
