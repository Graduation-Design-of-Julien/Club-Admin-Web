<template>
    <h2>发送通知</h2>
    <div style="display: flex; justify-content: center; align-items: center;">
        <el-card style="width: 80%" >
            <el-form
                ref="NotificationFormRef"
                style="min-width: 200px;"
                :model="NotificationForm"
                :rules="rules"
                label-width="auto"
                :size="formSize"
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
                    <el-cascader
                        v-model="NotificationForm.recipients"
                        :options="recipientsOpitons"
                        :props="recipientsProps"
                        collapse-tags
                        collapse-tags-tooltip
                        clearable
                        placeholder="请选择抄送对象"
                    />
                </el-form-item>

                <div style="display: flex; justify-content: end">
                    <el-form-item>
                        <el-button @click="resetForm(NotificationFormRef)"
                            >重置表单</el-button
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
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { Notification } from "../../types/Notification";

const formSize = ref("default");
const NotificationFormRef = ref<FormInstance>();
const NotificationForm = reactive<Notification>({
    notificationID: "",
    title: "",
    content: "",
    sender: "",
    createTime: new Date(),
    status: "string",
    changeTime: new Date(),
    recipients: [],
});

const recipientsProps = { multiple: true };

// TODO: 从服务器获取用户列表
const recipientsOpitons = [
    {
        value: 1,
        label: "Asia",
        children: [
            {
                value: 2,
                label: "China",
                children: [
                    { value: 3, label: "Beijing" },
                    { value: 4, label: "Shanghai" },
                    { value: 5, label: "Hangzhou" },
                ],
            },
            {
                value: 6,
                label: "Japan",
                children: [
                    { value: 7, label: "Tokyo" },
                    { value: 8, label: "Osaka" },
                    { value: 9, label: "Kyoto" },
                ],
            },
            {
                value: 10,
                label: "Korea",
                children: [
                    { value: 11, label: "Seoul" },
                    { value: 12, label: "Busan" },
                    { value: 13, label: "Taegu" },
                ],
            },
        ],
    },
    {
        value: 14,
        label: "Europe",
        children: [
            {
                value: 15,
                label: "France",
                children: [
                    { value: 16, label: "Paris" },
                    { value: 17, label: "Marseille" },
                    { value: 18, label: "Lyon" },
                ],
            },
            {
                value: 19,
                label: "UK",
                children: [
                    { value: 20, label: "London" },
                    { value: 21, label: "Birmingham" },
                    { value: 22, label: "Manchester" },
                ],
            },
        ],
    },
    {
        value: 23,
        label: "North America",
        children: [
            {
                value: 24,
                label: "US",
                children: [
                    { value: 25, label: "New York" },
                    { value: 26, label: "Los Angeles" },
                    { value: 27, label: "Washington" },
                ],
            },
            {
                value: 28,
                label: "Canada",
                children: [
                    { value: 29, label: "Toronto" },
                    { value: 30, label: "Montreal" },
                    { value: 31, label: "Ottawa" },
                ],
            },
        ],
    },
];

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
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            // TODO: 提交
            console.log("submit!");
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
