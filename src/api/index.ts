import { Direction } from "element-plus";
import {
    College,
    CreateCollege,
    DeleteCollege,
    UpdateCollege,
} from "../types/College";
import {
    CreateDepartment,
    DeleteDepartment,
    Department,
    UpdateDepartment,
} from "../types/Department";
import {
    CreateDirection,
    DeleteDirection,
    UpdateDirection,
} from "../types/Direction";
import { CreateMojar, DeleteMojar, Mojar, UpdateMojar } from "../types/Mojar";
import {
    CreateVerifyCode,
    LoginByPhone,
    LoginByUid,
    LoginResult,
    ResetPwd,
    VerifyCode,
    VerifyUser,
} from "../types/login";
import { CreateUser, DeleteUser, UpdateUser, UserInfo } from "../types/user";
import request from "../utils/http";
import { Role } from "../types/Role";
import {
    CreateOutbox,
    DeleteInbox,
    DeleteOutbox,
    Inbox,
    Outbox,
    UpdateInbox,
    UpdateOutbox,
} from "../types/Notification";
import {
    CreateBorrow,
    CreateResource,
    CreateResourceType,
    DeleteBorrow,
    DeleteResource,
    DeleteResourceType,
    Resource,
    ResourceBorrow,
    ResourceType,
    UpdateBorrow,
    UpdateResource,
    UpdateResourceType,
} from "../types/Resource";
import {
    ApplicationTable,
    CreateApplication,
    CreateRecruitment,
    DeleteApplication,
    DeleteRecruitment,
    Recruitment,
    UpdateApplication,
    UpdateRecruitment,
} from "../types/Recruitment";

// 以下是鉴权相关API
export const loginByUid = async (data: LoginByUid) => {
    return await request.post<LoginResult>("/user/login/uid", data);
};

export const loginByPhone = async (data: LoginByPhone) => {
    return await request.post<LoginResult>("/user/login/phone", data);
};

export const verifyUser = async (data: VerifyUser) => {
    return await request.post("/user/verifyUser", data);
};

export const verifyCode = async (data: VerifyCode) => {
    return await request.post("/user/verifyCode", data);
};

export const createVerifyCode = async (data: CreateVerifyCode) => {
    return await request.post("/user/createVerifyCode", data);
};

export const resetPwd = async (resetPwd: ResetPwd) => {
    return await request.post("/user/resetPwd", resetPwd);
};

// 以下是用户相关API
export const createUser = async (data: CreateUser) => {
    return await request.post("/user/create", data);
};

export const getUserInfo = async () => {
    return await request.post<UserInfo>("/user/getUserInfo");
};

export const updateUser = async (data: UpdateUser) => {
    return await request.post("/user/update", data);
};

export const getAllUser = async () => {
    return await request.post<UserInfo[]>("/user/get");
};

export const deleteUser = async (data: DeleteUser) => {
    return await request.post("/user/delete", data);
};

// 以下是学院相关API
export const createCollege = async (data: CreateCollege) => {
    return await request.post("/college/create", data);
};

export const updateCollege = async (data: UpdateCollege) => {
    return await request.post("/college/update", data);
};

export const getAllCollege = async () => {
    return await request.post<College[]>("/college/get");
};

export const deleteCollege = async (data: DeleteCollege) => {
    return await request.post("/college/delete", data);
};

// 以下是专业相关API
export const createMojar = async (data: CreateMojar) => {
    return await request.post("/mojar/create", data);
};

export const updateMojar = async (data: UpdateMojar) => {
    return await request.post("/mojar/update", data);
};

export const getAllMojar = async () => {
    return await request.post<Mojar[]>("/mojar/get");
};

export const deleteMojar = async (data: DeleteMojar) => {
    return await request.post("/mojar/delete", data);
};

// 以下是部门相关API
export const createDepartmern = async (data: CreateDepartment) => {
    return await request.post("/department/create", data);
};

export const updateDepartment = async (data: UpdateDepartment) => {
    return await request.post("/department/update", data);
};

export const getAllDepartment = async () => {
    return await request.post<Department[]>("/department/get");
};

export const deleteDepartment = async (data: DeleteDepartment) => {
    return await request.post("/department/delete", data);
};

// 以下是岗位相关API
export const createDirection = async (data: CreateDirection) => {
    return await request.post("/direction/create", data);
};

export const updateDirection = async (data: UpdateDirection) => {
    return await request.post("/direction/update", data);
};

export const getAllDirection = async () => {
    return await request.post<Direction[]>("/direction/get");
};

export const deleteDirection = async (data: DeleteDirection) => {
    return await request.post("/direction/delete", data);
};

// 以下是职位相关API
export const getAllRole = async () => {
    return await request.post<Role[]>("role/get");
};

// 以下是通知模块相关API
export const createOutbox = async (data: CreateOutbox) => {
    return await request.post("/notification/send", data);
};

export const updateOutbox = async (data: UpdateOutbox) => {
    return await request.post("/notification/updateSend", data);
};

export const deleteOutbox = async (data: DeleteOutbox) => {
    return await request.post("/notification/deleteSend", data);
};

export const getMyOutbox = async () => {
    return await request.post<Outbox[]>("/notification/getMyOutbox");
};

export const updateInbox = async (data: UpdateInbox) => {
    return await request.post("/notification/updateRecieve", data);
};

export const deleteInbox = async (data: DeleteInbox) => {
    return await request.post("/notification/deleteRecieve", data);
};

export const getMyInbox = async () => {
    return await request.post<Inbox[]>("/notification/getMyInbox");
};

export const getNotificationByID = async (data: { notificationID: string }) => {
    return await request.post<Outbox>(
        "/notification/getNotificationByID",
        data
    );
};

// 以下是物资模块相关API
export const getResourceType = async () => {
    return await request.post<ResourceType[]>("/resource/getResourceType");
};

export const getResourceTypeByID = async (data: { resourceTypeID: string }) => {
    return await request.post<ResourceType>(
        "/resource/getResourceTypeByID",
        data
    );
};

export const createResourceType = async (data: CreateResourceType) => {
    return await request.post("/resource/createResourceType", data);
};

export const updateResourceType = async (data: UpdateResourceType) => {
    return await request.post("/resource/updateResourceType", data);
};

export const deleteResourceType = async (data: DeleteResourceType) => {
    return await request.post("/resource/deleteResourceType", data);
};

export const getResource = async () => {
    return await request.post<Resource[]>("/resource/getResource");
};

export const createResource = async (data: CreateResource) => {
    return await request.post("/resource/createResource", data);
};

export const updateResource = async (data: UpdateResource) => {
    return await request.post("/resource/updateResource", data);
};

export const deleteResource = async (data: DeleteResource) => {
    return await request.post("/resource/deleteResource", data);
};

export const getBorrow = async () => {
    return await request.post<ResourceBorrow[]>("/resource/getBorrow");
};

export const createBorrow = async (data: CreateBorrow) => {
    return await request.post("/resource/createBorrow", { data });
};

export const updateBorrow = async (data: UpdateBorrow) => {
    return await request.post("/resource/updateBorrow", data);
};

export const deleteBorrow = async (data: DeleteBorrow) => {
    return await request.post("/resource/deleteBorrow", data);
};

// 以下是纳新模块相关API
export const getAllRecruitment = async () => {
    return await request.post<Recruitment[]>("/recruitment/getAllRecruitment");
};

export const createRecruitment = async (data: CreateRecruitment) => {
    return await request.post("/recruitment/createRecruitment", data);
};

export const updateRecruitment = async (data: UpdateRecruitment) => {
    return await request.post("/recruitment/updateRecruitment", data);
};

export const deleteRecruitment = async (data: DeleteRecruitment) => {
    return await request.post("/recruitment/deleteRecruitment", data);
};

export const getAllApplication = async () => {
    return await request.post<ApplicationTable[]>(
        "/recruitment/getAllApplication"
    );
};

export const createApplication = async (data: CreateApplication) => {
    return await request.post("/recruitment/createApplication", data);
};

export const updateApplication = async (data: UpdateApplication) => {
    return await request.post("/recruitment/updateApplication", data);
};

export const deleteApplication = async (data: DeleteApplication) => {
    return await request.post("/recruitment/deleteApplication", data);
};
