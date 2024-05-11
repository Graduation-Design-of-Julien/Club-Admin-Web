/**
 * 服务器基础 Url
 */
export const BASE_URL: string = "http://127.0.0.1:3000/cms";

/**
 * http超时时间
 */
export const TIME_OUT = 20000;

/**
 * 服务器错误码
 */
export const BUSINESS_ERROR_CODE = {
    COMMON: 10001, // 公共错误码
    TOKEN_INVALID: 10002, // 特殊错误码
    ACCESS_FORBIDDEN: 10003, // 禁止访问
    PERMISSION_DISABLED: 10003, // 权限已禁用

    USER_PASSWORD_INVALID: 200000, // 账号密码不正确
    USER_INVALID: 200001, // 用户无效

    CREATE_FAILED: 400001,
    DELETE_FAILED: 400002,
    UPDATE_FAILED: 400003,
    EXISTED: 400005,
    NO_EXIST: 400006,

    SUCCESS: 500001,
    FAILED: 500002,

    REGISTER_FAIL: 60000,
    DELETE_RECRUIT_FAIL: 60001, //报名失败
    NEW_RECRUIT_NO_EXIST: 60002, //不存在该纳新人员
};

/**
 * 发送验证码间隔时间
 * 单位：秒
 */
export const SEND_SMS_DELAY = 60;

/**
 * 社团名称
 */
export const SYS_NAME = "京涛海纳工作室";

/**
 * 社团Logo Url
 */
export const SYS_LOGO_URL = "https://ucs.zjlblog.site/assets/logo-69c25431.png";
