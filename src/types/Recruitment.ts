export interface Recruitment {
    recruitmentID: string;
    recruitmentName: string;
    recruitmentTime: string;
    recruitmentDepaList: string;
    recruitmentDirecList: string;
    recruitmentRoleList: string;
    collegeCodeList: string;
    mojarCodeList: string;
    status: number;
    createTime: string;
    changeTime: string;
    deleted: number;
}

export interface CreateRecruitment {
    recruitmentName: string;
    recruitmentTime: string;
    recruitmentDepaList: string;
    recruitmentDirecList: string;
    recruitmentRoleList: string;
    collegeCodeList: string;
    mojarCodeList: string;
}

export interface UpdateRecruitment {
    recruitmentID: string;
    recruitmentName: string;
    recruitmentTime: string;
    recruitmentDepaList: string;
    recruitmentDirecList: string;
    recruitmentRoleList: string;
    collegeCodeList: string;
    mojarCodeList: string;
    status: number;
}

export interface DeleteRecruitment {
    recruitmentID: string;
}

export interface ApplicationTable {
    applicationID: string;
    studentID: string;
    studentName: string;
    recruitmentID: string;
    sex: string;
    phoneNum: string;
    collegeCode: string;
    mojarCode: string;
    departmentCode: string;
    directionCode: string;
    userRole: string;
    introduction: string;
    obey: boolean;
    status: number;
    createTime: string;
    deleted: number;
}

export interface CreateApplication {
    studentID: string;
    studentName: string;
    recruitmentID: string;
    sex: string;
    phoneNum: string;
    collegeCode: string;
    mojarCode: string;
    departmentCode: string;
    directionCode: string;
    userRole: string;
    introduction: string;
    obey: boolean;
}

export interface UpdateApplication {
    studentID: string;
    studentName: string;
    recruitmentID: string;
    sex: string;
    phoneNum: string;
    collegeCode: string;
    mojarCode: string;
    departmentCode: string;
    directionCode: string;
    userRole: string;
    introduction?: string;
    obey: boolean;
}

export interface DeleteApplication {
    applicationID: string;
}
