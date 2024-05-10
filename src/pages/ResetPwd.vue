<template>
    <div class="pages">
        <el-card>
            <h2>重置您的密码</h2>
            <el-steps
                style="width: 600px"
                align-center
                :active="active"
                finish-status="success"
            >
                <el-step title="Step 1" description="确定信息" />
                <el-step title="Step 2" description="认证身份" />
                <el-step title="Step 3" description="设置密码" />
            </el-steps>

            <div v-if="show(0)">
                <br />
                <el-form
                    ref="step1FormRef"
                    style="max-width: 600px"
                    :model="resetForm"
                    :rules="FormRule"
                    label-width="80px"
                    label-position="left"
                    status-icon
                >
                    <el-form-item label="账号" prop="uid">
                        <el-input v-model="resetForm.uid">
                            <template #prepend> UCS- </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="resetForm.phone" />
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="checkUserInfo(step1FormRef)"
                    >下一步</el-button
                >
            </div>
            <div v-if="show(1)">
                <el-form
                    ref="step2FormRef"
                    style="max-width: 600px"
                    :model="resetForm"
                    :rules="FormRule"
                    label-width="80px"
                    label-position="left"
                    status-icon
                >
                    <el-form-item label="验证码" prop="verification">
                        <el-input
                            v-model="resetForm.verification"
                            style="width: 60%; padding: 5px"
                        />
                        <el-button
                            :disabled="btnDisabled"
                            :type="btnType"
                            @click="sendVC"
                            style="width: 40%; padding: 5px"
                            >{{ btnText }}</el-button
                        >
                    </el-form-item>
                </el-form>
                <el-button
                    type="primary"
                    @click="checkVerification(step2FormRef)"
                    >下一步</el-button
                >
            </div>
            <div v-if="show(2)">
                <el-form
                    ref="step3FormRef"
                    style="max-width: 600px"
                    :model="resetForm"
                    :rules="FormRule"
                    label-width="80px"
                    label-position="left"
                    status-icon
                >
                    <el-form-item label="新密码" prop="pwd">
                        <el-input
                            v-model="resetForm.pwd"
                            type="password"
                            show-password
                        />
                    </el-form-item>
                    <el-form-item label="确认密码" prop="comfirm">
                        <el-input
                            v-model="resetForm.comfirm"
                            type="password"
                            show-password
                        />
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="finishReset(step3FormRef)"
                    >下一步</el-button
                >
            </div>
            <div v-if="show(3)">
                <el-result
                    :icon="resetResult.icon"
                    :title="resetResult.title"
                    :sub-title="resetResult.subTitle"
                >
                    <template #extra>
                        <el-button type="primary" @click="router.push('/login')"
                            >返回登录</el-button
                        >
                    </template>
                </el-result>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { FormInstance, FormRules } from "element-plus";
import { reactive, ref } from "vue";
import { ResetForm } from "../types/auth";
import { SEND_SMS_DELAY } from "../config/baseData";
import router from "../router";

// 步骤
const active = ref(0);

// 下一步骤
const next = () => {
    if (active.value++ > 2) active.value = 0;
};

// 显示步骤对应操作
const show = (tab: number) => {
    return tab == active.value ? true : false;
};

// 步骤二对应操作
const btnDisabled = ref(false);
const btnType = ref<
    | ""
    | "default"
    | "primary"
    | "success"
    | "text"
    | "warning"
    | "info"
    | "danger"
>("primary");
const btnText = ref("获取验证码");
const countdownTime = ref(0);
// 倒计时函数
const countdown = () => {
    if (countdownTime.value == 0) {
        btnDisabled.value = false;
        btnText.value = "重新获取验证码";
        btnType.value = "primary";
        return;
    } else {
        setTimeout(() => {
            countdownTime.value--;
            btnText.value = `${
                countdownTime.value < 10
                    ? "0" + countdownTime.value
                    : countdownTime.value
            }`;
            countdown();
        }, 1000);
    }
};
// 进入第二步骤
const startStep2 = () => {
    btnDisabled.value = true;
    btnType.value = "info";
    countdownTime.value = SEND_SMS_DELAY;
    btnText.value = `${countdownTime.value}`;
    countdown();
};
// 发送验证码
const sendVC = () => {
    startStep2();
    // TODO: Send SMS
};

// 步骤一表单
const step1FormRef = ref<FormInstance>();
// 步骤二表单
const step2FormRef = ref<FormInstance>();
// 步骤三表单
const step3FormRef = ref<FormInstance>();

// 重设密码表单
const resetForm = reactive<ResetForm>({
    uid: "",
    phone: "",
    verification: "",
    pwd: "",
    comfirm: "",
});

// 账号验证
const checkUid = (rule: any, value: any, callback: any) => {
    console.log(rule);
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
};

// 手机号验证
const checkPhone = (rule: any, value: any, callback: any) => {
    console.log(rule);
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
};

const checkVerificationRule = (rule: any, value: any, callback: any) => {
    console.log(rule);
    if (value === "") {
        callback(new Error("验证码不能为空。"));
    } else {
        const pattern = /^[0-9]{6}$/;
        if (pattern.test(value)) {
            callback();
        } else {
            callback(new Error("验证码格式错误。"));
        }
    }
};

// 密码预校验
const checkPwd = (rule: any, value: any, callback: any) => {
    console.log(rule);
    if (value === "") {
        callback(new Error("密码不能为空。"));
    } else {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\da-zA-Z]{10,16}$/;
        if (!pattern.test(value)) {
            callback(
                new Error(
                    "密码长度为10-16，且必须包含一个大写字母，一个小写字母和一个数字。"
                )
            );
        } else {
            if (value !== resetForm.comfirm) {
                if (resetForm.comfirm === "") {
                    callback(new Error("请确认您的密码。"));
                } else {
                    callback(new Error("两次输入的密码不一致。"));
                }
            } else {
                callback();
            }
        }
    }
};
// 确认密码预校验
const checkComfirm = (rule: any, value: any, callback: any) => {
    console.log(rule);
    if (value === "") {
        callback(new Error("请确认您的密码。"));
    } else if (value !== resetForm.pwd) {
        callback(new Error("两次输入的密码不一致。"));
    } else {
        step3FormRef.value?.clearValidate("pwd");
        callback();
    }
};

// 表单验证
const FormRule = reactive<FormRules<ResetForm>>({
    uid: [
        {
            validator: checkUid,
            trigger: "blur",
        },
    ],
    phone: [
        {
            validator: checkPhone,
            trigger: "blur",
        },
    ],
    verification: [
        {
            validator: checkVerificationRule,
            trigger: "blur",
        },
    ],
    pwd: [
        {
            validator: checkPwd,
            trigger: "blur",
        },
    ],
    comfirm: [
        {
            validator: checkComfirm,
            trigger: "blur",
        },
    ],
});
// 核实uid和phone信息
const checkUserInfo = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            // TODO: 向后端获取是否有该信息
            next();
            sendVC();
        } else {
            console.log("error submit!", fields);
        }
    });
};
// 核实验证码
const checkVerification = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            // TODO: 与后端校验验证码
            next();
        } else {
            console.log("error submit!", fields);
        }
    });
};
// 修改密码的状态
interface ResetResult {
    icon: "success" | "warning" | "info" | "error";
    title: string;
    subTitle: string;
}
interface ResetResultList {
    success: ResetResult;
    faild: ResetResult;
}
const resetResultList: ResetResultList = {
    success: {
        icon: "success",
        title: "密码已重置",
        subTitle: "现在你可以返回并登录系统了。",
    },
    faild: {
        icon: "error",
        title: "密码重置失败",
        subTitle: "我们遇到了一些问题，导致了您此次重置失败，请稍后再试。",
    },
};
const resetResult = ref({
    ...resetResultList.faild,
});

// 修改密码
const finishReset = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            // TODO: 完成修改
            next();
        } else {
            console.log("error submit!", fields);
        }
    });
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
