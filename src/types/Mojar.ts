export interface Mojar {
    mojarCode: string;
    mojarName: string;
    college: string;
    createTime: Date;
    changeTime: Date;
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
