interface Result {
    status: number;
    message: string;
    success: boolean;
}

export interface ResultData<T = any> extends Result {
    data?: T;
}
