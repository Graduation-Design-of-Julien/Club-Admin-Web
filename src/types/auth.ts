export interface LoginForm {
    uid?: string,
    phone?: string,
    pwd: string
}

export interface ResetForm {
    uid: string,
    phone: string,
    verification: string
    pwd: string,
    comfirm: string
}