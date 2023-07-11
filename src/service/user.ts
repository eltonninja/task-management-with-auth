import { SERVICE_ROOT } from '@/config';
import { SigninPayload, SignupPayload, UserInfo } from '@/types';
import { httpClient } from './base';


const USER_API_ROOT = `${SERVICE_ROOT}/auth`;

export const signIn = (body: SigninPayload): Promise<UserInfo> => httpClient.post(`${USER_API_ROOT}/signin`, body);

export const signUp = (body: SignupPayload): Promise<UserInfo> => httpClient.post(`${USER_API_ROOT}/signup`, body);
