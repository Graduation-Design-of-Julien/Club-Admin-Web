<template>
    <div class="pages">
        <el-card style="max-width: 480px">
            <el-image
                style="width: 300px; height: 300px"
                src="../assets/logo.png"
                fit="contain"
            />
            <h2>登录到 {{ systemData.systemName }}</h2>
            <el-tabs v-model="activeTab" class="demo-tabs" style="width: 300px">
                <el-tab-pane label="使用账号登录" name="useUid">
                    <el-form
                        ref="uidFormRef"
                        style="max-width: 600px"
                        :model="loginForm"
                        :rules="rules"
                        label-width="60px"
                        label-position="left"
                        status-icon
                    >
                        <el-form-item label="账号" prop="uid">
                            <el-input v-model="loginForm.uid">
                                <template #prepend> UCS- </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pwd">
                            <el-input
                                v-model="loginForm.pwd"
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
                        :model="loginForm"
                        :rules="rules"
                        label-width="60px"
                        label-position="left"
                        status-icon
                    >
                        <el-form-item label="手机号" prop="phone">
                            <el-input v-model="loginForm.phone" />
                        </el-form-item>
                        <el-form-item label="密码" prop="pwd">
                            <el-input
                                v-model="loginForm.pwd"
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
import { LoginForm } from "../types/auth";
import router from "../router";

// 基本数据
const systemData = ref<{
    systemName: string;
    systemLogoUrl: string;
}>({
    systemName: "京涛海纳工作室",
    systemLogoUrl: "",
});
// 加载基本数据
// TODO: 完成网络请求部分
const loadSysData = () => {};
loadSysData();

// 标签页初始值
const activeTab = ref("useUid");

// 账号登录表单
const uidFormRef = ref<FormInstance>();
// 手机号登录表单
const phoneFormRef = ref<FormInstance>();
// 表单内容
const loginForm = reactive<LoginForm>({
    uid: "",
    phone: "",
    pwd: "",
});

// 账号或手机号非空验证
const checkLoginWay = (rule: any, value: any, callback: any) => {
    console.log(rule);
    if (activeTab.value == "useUid") {
        if (value === "") {
            callback(new Error("账号不能为空。"));
        } else {
            const pattern = /^[0-9]*$/;
            if (pattern.test(value)) {
                callback();
            } else {
                callback(new Error("账号格式错误。"));
            }
        }
    } else if (activeTab.value == "usePhone") {
        if (value === "") {
            callback(new Error("手机号不能为空。"));
        } else {
            const pattern =
                /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
            if (pattern.test(value)) {
                callback();
            } else {
                callback(new Error("手机号格式错误。"));
            }
        }
    }
};

// 登录表单验证
const rules = reactive<FormRules<LoginForm>>({
    uid: [
        {
            validator: checkLoginWay,
            trigger: "blur",
        },
    ],
    phone: [
        {
            validator: checkLoginWay,
            trigger: "blur",
        },
    ],
});

// 提交
// TODO: 实际请求
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log(loginForm);
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
.pages{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
