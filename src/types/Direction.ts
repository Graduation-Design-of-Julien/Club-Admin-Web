export interface Direction {
    directionCode: string;
    directionName: string;
    departmentCode: number;
    createTime: string;
    changeTime: string;
    deleted: number;
}

export interface CreateDirection {
    directionName: string;
    departmentCode: number;
}

export interface UpdateDirection {
    directionCode: string;
    directionName: string;
}

export interface DeleteDirection {
    directionCode: string;
}
