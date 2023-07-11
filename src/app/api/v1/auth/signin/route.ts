import { NextRequest, NextResponse } from 'next/server';
import { UserInfo } from '@/types';
import { findUser } from '@/_mock/auth';

export const POST = async (request: NextRequest): Promise<NextResponse<UserInfo | string>> => {
  const req = await request.json();
  const user = await findUser(req);

  if (user) {
    return NextResponse.json(user, { status: 200 })
  }

  return NextResponse.json('email or password is incorrect', { status: 401 });
}
