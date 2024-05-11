import { BUSINESS_ERROR_CODE } from "../config/config";
import { redirectToLogin } from "../router";

export const handleBusinessError = async (code: number) => {
    switch (code) {
        case BUSINESS_ERROR_CODE.USER_PASSWORD_INVALID:
            ElMessage.error("账号密码不正确");
            break;
    }
};

export const handleHttpCode = async (code: number) => {
    switch (code) {
        case 401:
            await redirectToLogin();
            break;
        case 403:
            ElMessage.error("没有权限");
            break;
        default:
            ElMessage.error("请求失败");
            break;
    }
};
