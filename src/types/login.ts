import { UserInfo } from "./user";

export interface LoginByUid {
    uid: string;
    pwd: string;
}

export interface LoginByPhone {
    phoneNum: string;
    pwd: string;
}

export interface VerifyUser {
    uid: string;
    phoneNum: string;
}

export interface VerifyCode {
    phoneNum: string;
    verifyCode: string;
}

export interface CreateVerifyCode {
    phoneNum: string;
}

export interface ResetPwd {
    uid: string;
    pwd: string;
    confirm: string;
}

export interface LoginResult {
    user: UserInfo;
    accessToken: string;
}
