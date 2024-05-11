export interface Mojar {
    mojarCode: string;
    mojarName: string;
    collegeCode: string;
    createTime: string;
    changeTime: string;
    deleted: number;
}

export interface CreateMojar {
    mojarName: string;
    collegeCode: string;
}

export interface UpdateMojar {
    mojarName: string;
    collegeCode: string;
}

export interface DeleteMojar {
    mojarCode: string;
}
