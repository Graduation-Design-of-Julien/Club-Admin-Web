<template>
    <div class="pages">
        <el-card style="width: 480px">
            <el-image
                style="width: 300px; height: 300px"
                :src="SYS_LOGO_URL"
                fit="contain"
            />
            <h2>登录到 {{ SYS_NAME }}</h2>
            <el-tabs v-model="activeTab" class="demo-tabs" :stretch="true">
                <el-tab-pane label="使用账号登录" name="useUid">
                    <el-form
                        ref="uidFormRef"
                        style="max-width: 600px"
                        :model="uidForm"
                        :rules="uidRules"
                        label-width="100px"
                        label-position="left"
                        status-icon
                    >
                        <el-form-item label="账号" prop="uid">
                            <el-input v-model="uidForm.uid" />
                        </el-form-item>
                        <el-form-item label="密码" prop="pwd">
                            <el-input
                                v-model="uidForm.pwd"
                                type="password"
                                show-password
                            />
                        </el-form-item>
                    </el-form>
                    <div style="display: flex; justify-content: end">
                        <el-button type="info" @click="resetPwd"
                            >忘记密码</el-button
                        >
                        <el-button
                            type="primary"
                            @click="submitForm(uidFormRef)"
                            >登录</el-button
                        >
                    </div>
                </el-tab-pane>
                <el-tab-pane label="使用手机号登录" name="usePhone">
                    <el-form
                        ref="phoneFormRef"
                        style="max-width: 600px"
                        :model="phoneForm"
                        :rules="phoneRules"
                        label-width="100px"
                        label-position="left"
                        status-icon
                    >
                        <el-form-item label="手机号" prop="phoneNum">
                            <el-input v-model="phoneForm.phoneNum" />
                        </el-form-item>
                        <el-form-item label="密码" prop="pwd">
                            <el-input
                                v-model="phoneForm.pwd"
                                type="password"
                                show-password
                            />
                        </el-form-item>
                    </el-form>
                    <div style="display: flex; justify-content: end">
                        <el-button type="info" @click="resetPwd"
                            >忘记密码</el-button
                        >
                        <el-button
                            type="primary"
                            @click="submitForm(phoneFormRef)"
                            >登录</el-button
                        >
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import router from "../router";
import { LoginByPhone, LoginByUid } from "../types/login";
import { loginByPhone, loginByUid } from "../api";
import { useLocalStorage } from "../utils/useLocalStorage";
import { SYS_LOGO_URL, SYS_NAME } from "../config/config";

// 标签页初始值
const activeTab = ref("useUid");

// 账号登录表单
const uidFormRef = ref<FormInstance>();
// 手机号登录表单
const phoneFormRef = ref<FormInstance>();
// 表单内容
const uidForm = reactive<LoginByUid>({
    uid: "",
    pwd: "",
});
const phoneForm = reactive<LoginByPhone>({
    phoneNum: "",
    pwd: "",
});

// 账号验证
const checkUid = (rule: any, value: any, callback: any) => {
    console.log(rule);
    if (value === "") {
        callback(new Error("账号不能为空。"));
    } else {
        const pattern = /^[A-Za-z]*-[0-9]*$/;
        if (pattern.test(value)) {
            callback();
        } else {
            callback(new Error("账号格式错误。"));
        }
    }
};

// 手机号验证
const checkPhoneNum = (rule: any, value: any, callback: any) => {
    console.log(rule);
    const pattern =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (pattern.test(value)) {
        callback();
    } else {
        callback(new Error("手机号格式错误。"));
    }
};

// 登录表单验证
const uidRules = reactive<FormRules<LoginByUid>>({
    uid: [
        {
            required: true,
            message: "帐号不能为空。",
            trigger: "blur",
        },
        {
            validator: checkUid,
            trigger: "blur",
        },
    ],
    pwd: [
        {
            required: true,
            message: "密码不能为空。",
            trigger: "blur",
        },
    ],
});
const phoneRules = reactive<FormRules<LoginByPhone>>({
    phoneNum: [
        {
            required: true,
            message: "帐号不能为空。",
            trigger: "blur",
        },
        {
            validator: checkPhoneNum,
            trigger: "blur",
        },
    ],
    pwd: [
        {
            required: true,
            message: "请输入密码。",
            trigger: "blur",
        },
    ],
});

const successLogin = (token: string) => {
    const localStorageHelper = useLocalStorage();
    localStorageHelper.setLocalStorage("token", token);
};

// 提交
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            if (activeTab.value === "useUid") {
                loginByUid(uidForm)
                    .then((res) => {
                        if (res.success) {
                            successLogin(res.data!.accessToken);
                            router.push("/layout/home");
                        }
                    })
                    .catch(() => {
                        ElMessage({
                            type: "error",
                            message: "登录失败，请稍后再试。",
                        });
                    });
            } else if (activeTab.value === "usePhone") {
                loginByPhone(phoneForm)
                    .then((res) => {
                        if (res.success) {
                            successLogin(res.data!.accessToken);
                            router.push("/layout/home");
                        }
                    })
                    .catch(() => {
                        ElMessage({
                            type: "error",
                            message: "登录失败，请稍后再试。",
                        });
                    });
            }
        } else {
            console.log("error submit!", fields);
        }
    });
};

const resetPwd = () => {
    router.push("/reset");
};
</script>

<style scoped>
.pages {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
