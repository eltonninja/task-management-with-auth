import { SigninPayload, SignupPayload, UserInfo } from '@/types';
import * as uuid from 'uuid';
import { readUsers, saveUsers } from './utils';


export const createUser = async (payload: SignupPayload) => {
  const users: UserInfo[] = await readUsers();

  const user = users.find(user => user.user?.email === payload.email);
  if (!user) {
    const accessToken = uuid.v4();
    const newUser = {
      user: { id: uuid.v4(), ...payload },
      accessToken,
    };

    users.push(newUser);
    await saveUsers(users);
    return newUser;
  }
}

export const findUser = async (payload: SigninPayload) => {
  const users: UserInfo[] = await readUsers();
  const user = users.find(user => user.user?.email === payload.email && user.user?.password === payload.password);
  if (user) return user;
}
