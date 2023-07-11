import { NextRequest, NextResponse } from 'next/server';
import { TodoCreatePayload, TodoInfo } from '@/types';
import { deleteTodo, getTodo, updateTodo } from '@/_mock/todo';

export const PUT = async (request: NextRequest, { params }: { params: { id: string }}): Promise<NextResponse<TodoInfo | string>> => {
  const todo: TodoCreatePayload = await request.json();
  const updated = await updateTodo(params.id, todo);

  if (updated) {
    return NextResponse.json(updated, { status: 200 });
  } else {
    return NextResponse.json('Not found', { status: 404 });
  }
}

export const DELETE = async (request: NextRequest, { params }: { params: { id: string }}): Promise<void> => {
  await deleteTodo(params.id);
}

export const GET = async (request: NextRequest, { params }: { params: { id: string }}): Promise<NextResponse<TodoInfo | string>> => {
  const todo = await getTodo(params.id);
  if (todo) {
    return NextResponse.json(todo, { status: 200 });
  } else {
    return NextResponse.json('Not found', { status: 404 });
  }
}
