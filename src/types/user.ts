export type BaseUserInfo = {
    id: string;
    username: string;
    email: string;
}

export type AuthInfo = {
    accessToken: string;
}

export type UserInfo = AuthInfo & {
    user: BaseUserInfo & { password: string } | null;
}

export type SigninPayload = {
    email: string;
    password: string;
}

export type SignupPayload = {
    username: string;
    email: string;
    password: string;
}
