<template>
    <el-form
        ref="NotificationFormRef"
        style="min-width: 200px"
        :model="NotificationForm"
        :rules="rules"
        label-width="auto"
        status-icon
    >
        <el-form-item label="通知标题" prop="title">
            <el-input v-model="NotificationForm.title" />
        </el-form-item>

        <el-form-item label="通知正文" prop="content">
            <el-input
                v-model="NotificationForm.content"
                :rows="5"
                type="textarea"
            />
        </el-form-item>

        <el-form-item label="抄送人" prop="recipients">
            <el-select
                v-model="NotificationForm.recipients"
                multiple
                collapse-tags
                collapse-tags-tooltip
                :max-collapse-tags="3"
                placeholder="请选择抄送对象"
            >
                <el-option
                    v-for="item in recipientsOpitons"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
        </el-form-item>

        <div style="display: flex; justify-content: end">
            <el-form-item>
                <el-button @click="resetForm(NotificationFormRef)"
                    >重置表单</el-button
                >
                <el-button
                    v-show="$props.type == 'create'"
                    @click="submitForm(NotificationFormRef, true)"
                    >存为草稿</el-button
                >
                <el-button
                    type="primary"
                    @click="submitForm(NotificationFormRef)"
                >
                    发送通知
                </el-button>
            </el-form-item>
        </div>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import {
    CreateOutbox,
    Notification,
    UpdateOutbox,
} from "../types/Notification";
import { createOutbox, getAllUser, updateOutbox } from "../api";

const props = defineProps<{
    messageData: UpdateOutbox | CreateOutbox;
    type: "update" | "create";
}>();

const NotificationFormRef = ref<FormInstance>();
const NotificationForm = props.messageData;

// TODO: 从服务器获取用户列表
const recipientsOpitons = ref<{ value: string; label: string }[]>([]);

const getAllUserInfo = () => {
    getAllUser().then((res) => {
        console.log(res.data);
        res.data?.forEach((item) => {
            const obj = {
                value: item.uid,
                label: item.userName,
            };
            recipientsOpitons.value.push(obj);
        });
        console.log(recipientsOpitons.value);
    });
};
getAllUserInfo();

// 表单校验规则
const rules = reactive<FormRules<Notification>>({
    title: [
        {
            required: true,
            message: "请输入通知标题。",
            trigger: "blur",
        },
    ],
    content: [
        {
            required: true,
            message: "请输入通知内容。",
            trigger: "blur",
        },
    ],
    recipients: [
        {
            required: true,
            message: "清选择抄送人。",
            trigger: "blur",
        },
    ],
});

// 提交表单
const submitForm = async (
    formEl: FormInstance | undefined,
    temp: boolean = false
) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            // TODO: 提交
            if (props.type === "create") {
                if (!temp) {
                    NotificationForm.status = 1;
                }
                console.log(NotificationForm);
                createOutbox(NotificationForm as CreateOutbox).then((res) => {
                    if (res.success) {
                        ElMessage({
                            type: "success",
                            message: "创建成功。",
                        });
                        window.location.reload;
                    } else {
                        ElMessage({
                            type: "error",
                            message: res.message,
                        });
                    }
                });
            } else {
                updateOutbox(NotificationForm as UpdateOutbox).then((res) => {
                    if (res.success) {
                        ElMessage({
                            type: "success",
                            message: "修改成功。",
                        });
                        window.location.reload;
                    } else {
                        ElMessage({
                            type: "error",
                            message: res.message,
                        });
                    }
                });
            }
        } else {
            console.log("error submit!", fields);
        }
    });
};

// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};
</script>
