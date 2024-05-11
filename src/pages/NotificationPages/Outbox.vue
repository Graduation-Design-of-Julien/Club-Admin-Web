<template>
    <h2>发件箱</h2>
    <div style="display: flex; flex-direction: row">
        <el-input
            style="width: 200px"
            placeholder="请输入通知标题"
            v-model="searchInput"
        ></el-input>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="primary" @click="resetSearch">重置</el-button>
    </div>
    <div style="display: flex; flex-direction: row; margin: 10px 0 10px 0">
        <el-button type="primary" @click="handleCreate">发布通知</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="createTime" label="发件时间" width="200" />
        <el-table-column prop="updateTime" label="修改时间" width="200" />
        <el-table-column prop="title" label="标题" width="180" />
        <el-table-column prop="content" label="通知内容" />
        <el-table-column label="状态" width="100">
            <template #default="scope">
                <el-tag :type="scope.row.status == '0' ? 'info' : 'success'">{{
                    scope.row.status == "0" ? "草稿" : "已发送"
                }}</el-tag>
            </template>
        </el-table-column>

        <el-table-column label="操作" width="180">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row)"
                    >修改</el-button
                >
                <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.row)"
                    >删除</el-button
                >
            </template>
        </el-table-column>
    </el-table>

    <el-dialog
        v-model="createDialogVisible"
        title="发布通知"
        width="500"
        destroy-on-close
        center
    >
        <el-form
            ref="createFormRef"
            style="min-width: 200px"
            :model="createOutboxForm"
            :rules="createRules"
            label-width="auto"
            status-icon
        >
            <el-form-item label="通知标题" prop="title">
                <el-input v-model="createOutboxForm.title" />
            </el-form-item>

            <el-form-item label="通知正文" prop="content">
                <el-input
                    v-model="createOutboxForm.content"
                    :rows="5"
                    type="textarea"
                />
            </el-form-item>

            <el-form-item label="抄送人" prop="recipients">
                <el-select
                    v-model="createOutboxForm.recipients"
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
                    <el-button @click="resetForm(createFormRef)"
                        >重置表单</el-button
                    >
                    <el-button @click="createSumit(createFormRef, true)"
                        >存为草稿</el-button
                    >
                    <el-button
                        type="primary"
                        @click="createSumit(createFormRef)"
                    >
                        发送通知
                    </el-button>
                </el-form-item>
            </div>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="createDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="createDialogVisible = false">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>

    <el-dialog
        v-model="updateDialogVisible"
        title="修改通知"
        width="500"
        destroy-on-close
        center
    >
        <el-form
            ref="editFormRef"
            style="min-width: 200px"
            :model="editForm"
            :rules="editRules"
            label-width="auto"
            status-icon
        >
            <el-form-item label="通知标题" prop="title">
                <el-input v-model="editForm.title" />
            </el-form-item>

            <el-form-item label="通知正文" prop="content">
                <el-input
                    v-model="editForm.content"
                    :rows="5"
                    type="textarea"
                />
            </el-form-item>

            <el-form-item label="抄送人" prop="recipients">
                <el-select
                    v-model="editForm.recipients"
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
                    <el-button @click="resetForm(editFormRef)"
                        >重置表单</el-button
                    >
                    <el-button type="primary" @click="updateSumit(editFormRef)">
                        发送通知
                    </el-button>
                </el-form-item>
            </div>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="updateDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="updateDialogVisible = false">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import {
    CreateOutbox,
    Notification,
    Outbox,
    UpdateOutbox,
} from "../../types/Notification";
import {
    createOutbox,
    deleteOutbox,
    getAllUser,
    getMyOutbox,
    updateOutbox,
} from "../../api";
import { FormInstance, FormRules } from "element-plus";

const tableData = ref<Array<Outbox>>();

const getOutboxList = () => {
    getMyOutbox()
        .then((res) => {
            tableData.value = res.data;
        })
        .catch(() => {
            ElMessage({
                type: "error",
                message: "获取发件箱失败。",
            });
        });
};
getOutboxList();

const searchInput = ref("");

const search = () => {
    const searchResult = tableData.value?.find(
        (value) => value.title == searchInput.value
    );
    tableData.value = [];
    tableData.value.push(searchResult!);
};

const resetSearch = () => {
    getOutboxList(), (searchInput.value = "");
};

// 修改
const editForm = ref<UpdateOutbox>({
    notificationID: "",
    title: "测试标题1",
    content: "测试内容1",
    status: 1,
    recipients: "",
});
const editFormRef = ref<FormInstance>();
const updateDialogVisible = ref(false);
// 表单校验规则
const createRules = reactive<FormRules<CreateOutbox>>({
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

const editRules = reactive<FormRules<UpdateOutbox>>({
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

// 发布
const createOutboxForm = ref<CreateOutbox>({
    title: "",
    content: "",
    status: 1,
    recipients: "",
});
const createFormRef = ref<FormInstance>();
const createDialogVisible = ref(false);

const createSumit = async (
    formEl: FormInstance | undefined,
    temp: boolean = false
) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            if (temp) {
                createOutboxForm.value.status = 0;
            }
            createOutbox(createOutboxForm.value).then((res) => {
                if (res.success) {
                    ElMessage({
                        type: "success",
                        message: "创建成功。",
                    });
                    createDialogVisible.value = false;
                    getOutboxList();
                } else {
                    ElMessage({
                        type: "error",
                        message: res.message,
                    });
                }
            });
        } else {
            console.log("error submit!", fields);
        }
    });
};

// 删除
const deleteNotification = (data: Notification) => {
    ElMessageBox.confirm(
        "你要删除这条通知吗？（已发出的通知只会将其在您的发件箱中移除）",
        "警告",
        {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        }
    )
        .then(() => {
            deleteOutbox({ notificationID: data.notificationID }).then(
                (res) => {
                    if (res.success) {
                        ElMessage({
                            type: "success",
                            message: "删除成功",
                        });
                        getOutboxList();
                    } else {
                        ElMessage({
                            type: "error",
                            message: res.message,
                        });
                    }
                }
            );
        })
        .catch(() => {
            ElMessage({
                type: "info",
                message: "已取消删除",
            });
        });
};
const handleCreate = () => {
    createOutboxForm.value = {
        title: "",
        content: "",
        status: 0,
        recipients: "",
    };
    createDialogVisible.value = true;
};
const handleEdit = (row: UpdateOutbox) => {
    updateDialogVisible.value = true;
    editForm.value = row;
};
const handleDelete = (row: Notification) => {
    deleteNotification(row);
};

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

const updateSumit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            editForm.value.status = 1;
            updateOutbox(editForm.value).then((res) => {
                if (res.success) {
                    ElMessage({
                        type: "success",
                        message: "修改成功。",
                    });
                    updateDialogVisible.value = false;
                    getOutboxList();
                } else {
                    ElMessage({
                        type: "error",
                        message: res.message,
                    });
                }
            });
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
