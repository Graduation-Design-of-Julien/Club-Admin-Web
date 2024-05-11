export interface Department {
    departmentCode: string;
    departmentName: string;
    createTime: string;
    changeTime: string;
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
