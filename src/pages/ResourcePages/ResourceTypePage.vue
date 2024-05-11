<template>
    <h2>物资类型</h2>
    <el-card>
        <template #header>
            <div class="card-header">
                <div style="display: flex; flex-direction: row">
                    <el-input
                        style="width: 200px"
                        placeholder="请输入物资类型名称"
                    ></el-input>
                    <el-button type="primary">搜索</el-button>
                </div>
                <div
                    style="
                        display: flex;
                        flex-direction: row;
                        margin: 10px 0 10px 0;
                    "
                >
                    <el-button type="primary" @click="handleCreate"
                        >新增物资类型</el-button
                    >
                </div>
            </div>
        </template>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="resourceTypeID" label="ID" width="200" />
            <el-table-column prop="resourceTypeName" label="物资名称" />

            <el-table-column label="操作" width="200">
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
    </el-card>

    <el-dialog
        v-model="createDialogVisible"
        title="添加物资类型"
        width="500"
        destroy-on-close
        center
    >
        <span>
            <el-form
                ref="createFormRef"
                style="min-width: 200px"
                :model="createData"
                :rules="createRule"
                label-width="auto"
                status-icon
            >
                <el-form-item label="类型名称" prop="resourceTypeName">
                    <el-input v-model="createData.resourceTypeName" />
                </el-form-item>

                <div style="display: flex; justify-content: end">
                    <el-form-item>
                        <el-button @click="resetForm(createFormRef)"
                            >重置表单</el-button
                        >
                        <el-button
                            type="primary"
                            @click="submitCreateForm(createFormRef)"
                        >
                            添加
                        </el-button>
                    </el-form-item>
                </div>
            </el-form>
        </span>
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
        title="修改物资类型"
        width="500"
        destroy-on-close
        center
    >
        <el-form
            ref="updateFormRef"
            style="min-width: 200px"
            :model="updateData"
            label-width="auto"
            status-icon
        >
            <el-form-item label="ID" prop="resourceTypeID">
                <el-input disabled v-model="updateData.resourceTypeID" />
            </el-form-item>

            <el-form-item label="类型名称" prop="resourceTypeName">
                <el-input v-model="updateData.resourceTypeName" />
            </el-form-item>

            <div style="display: flex; justify-content: end">
                <el-form-item>
                    <el-button @click="resetForm(updateFormRef)"
                        >重置表单</el-button
                    >
                    <el-button
                        type="primary"
                        @click="submitUpdateForm(updateFormRef)"
                    >
                        修改
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
    CreateResourceType,
    DeleteResourceType,
    ResourceType,
    UpdateResourceType,
} from "../../types/Resource";
import {
    createResourceType,
    deleteResourceType,
    getResourceType,
    updateResourceType,
} from "../../api";
import { FormInstance, FormRules } from "element-plus";

const tableData = ref<ResourceType[]>([]);

const getResType = () => {
    getResourceType().then((res) => {
        if (res.success) {
            tableData.value = res.data!;
        }
    });
};
getResType();

// create
const createFormRef = ref<FormInstance>();
const createDialogVisible = ref(false);
const createData = ref<CreateResourceType>({
    resourceTypeName: "",
});
const createRule = reactive<FormRules<CreateResourceType>>({
    resourceTypeName: [
        {
            required: true,
            message: "类型名称不能为空",
            trigger: "blur",
        },
    ],
});

// update
const updateFormRef = ref<FormInstance>();
const updateDialogVisible = ref(false);
const updateData = ref<UpdateResourceType>({
    resourceTypeID: "",
    resourceTypeName: "",
});

const handleCreate = () => {
    createData.value.resourceTypeName = "";
    createDialogVisible.value = true;
};

const handleEdit = (row: ResourceType) => {
    (updateData.value.resourceTypeID = row.resourceTypeID),
        (updateData.value.resourceTypeName = row.resourceTypeName);
    updateDialogVisible.value = true;
};

const deleteRes = (data: DeleteResourceType) => {
    ElMessageBox.confirm("你要删除这个物资类型吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            deleteResourceType(data).then((res) => {
                if (res.success) {
                    ElMessage({
                        type: "success",
                        message: "删除成功",
                    });
                    getResType();
                } else {
                    ElMessage({
                        type: "error",
                        message: res.message,
                    });
                }
            });
        })
        .catch(() => {
            ElMessage({
                type: "info",
                message: "已取消删除",
            });
        });
};

const handleDelete = (row: ResourceType) => {
    deleteRes({ resourceTypeID: row.resourceTypeID });
};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};

// 确认添加
const submitCreateForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            createResourceType(createData.value).then((res) => {
                if (res.success) {
                    ElMessage({
                        type: "success",
                        message: "创建成功。",
                    });
                    createDialogVisible.value = false;
                    getResType();
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

// 确认修改
const submitUpdateForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            updateResourceType(updateData.value).then((res) => {
                if (res.success) {
                    ElMessage({
                        type: "success",
                        message: "修改成功。",
                    });
                    updateDialogVisible.value = false;
                    getResType();
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
</script>
