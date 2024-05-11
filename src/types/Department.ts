export interface Department {
    departmentCode: string;
    departmentName: string;
    createTime: Date;
    changeTime: Date;
    deleted: number;
}

export interface CreateDepartment {
    departmentName: string;
}

export interface UpdateDepartment {
    departmentCode: string;
    departmentName: string;
}

export interface DeleteDepartment {
    departmentCode: string;
}
