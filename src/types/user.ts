export interface UserInfo {
    uid: string;
    userName: string;
    sex: string | null;
    nativePlace: string | null;
    phoneNum: string;
    email: string | null;
    cardNum: string | null;
    avatarUrl: string | null;
    introduction: string;
    departmentCode: number;
    directionCode: number;
    userRole: number;
    collegeCode: number;
    mojarCode: number;
    createTime: string;
    changeTime: string;
}

export interface CreateUser {
    userName: string;
    sex: string;
    nativePlace: string;
    phoneNum: string;
    email: string;
    cardNum: string;
    avatarUrl: string;
    introduction: string;
    departmentCode: number;
    directionCode: number;
    userRole: number;
    collegeCode: number;
    mojarCode: number;
}

export interface UpdateUser {
    uid: string;
    userName: string;
    sex: string;
    nativePlace: string;
    phoneNum: string;
    email: string;
    cardNum: string;
    avatarUrl: string;
    introduction: string;
    departmentCode: number;
    directionCode: number;
    userRole: number;
    collegeCode: number;
    mojarCode: number;
}

export interface DeleteUser {
    uid: string;
}
