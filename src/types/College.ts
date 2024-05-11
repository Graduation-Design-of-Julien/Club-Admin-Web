export interface College {
    collegeCode: string;
    collegeName: string;
    createTime: Date;
    changeTime: Date;
    deleted: number;
}

export interface CreateCollege {
    collegeName: string;
}

export interface UpdateCollege {
    collegeCode: string;
    collegeName: string;
}

export interface DeleteCollege {
    collegeCode: string;
}
