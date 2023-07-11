import { NextRequest, NextResponse } from 'next/server';
import { TodoInfo, Paginated, TodoCreatePayload } from '@/types';
import { createTodo, getTodos } from '@/_mock/todo';

export const GET = async (request: NextRequest): Promise<NextResponse<Paginated<TodoInfo> | string>> => {
  const params = new URLSearchParams(request.nextUrl.searchParams);
  const start = params.get('start') ?? '0';
  const end = params.get('end');
  const result = await getTodos(parseInt(start), end ? parseInt(end) : undefined);

  if (result) {
    return NextResponse.json(result, { status: 200 })
  }

  return NextResponse.json('email or password is incorrect', { status: 401 });
}

export const POST = async (request: NextRequest): Promise<NextResponse<TodoInfo | string>> => {
  const body: TodoCreatePayload = await request.json();
  const todo = await createTodo(body);

  return NextResponse.json(todo, { status: 200 });
}



