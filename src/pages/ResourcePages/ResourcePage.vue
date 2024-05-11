<template>
    <h2>物资管理</h2>
    <el-card>
        <template #header>
            <div class="card-header">
                <div style="display: flex; flex-direction: row">
                    <el-input
                        style="width: 200px"
                        placeholder="请输入物资名称"
                        v-model="searchInput"
                    ></el-input>
                    <el-button type="primary" @click="search">搜索</el-button>
                    <el-button type="primary" @click="resetSearch"
                        >重置</el-button
                    >
                </div>
                <div
                    style="
                        display: flex;
                        flex-direction: row;
                        margin: 10px 0 10px 0;
                    "
                >
                    <el-button type="primary" @click="createRes"
                        >新增物资</el-button
                    >
                </div>
            </div>
        </template>
        <el-table :data="listData" stripe style="width: 100%">
            <el-table-column prop="resourceID" label="ID" width="180" />
            <el-table-column prop="resourceName" label="物资名称" width="180" />
            <el-table-column
                prop="resourceTypeName"
                label="物资类型"
                width="180"
            />
            <el-table-column prop="content" label="物资状态">
                <template #default="scope">
                    <el-tag
                        :type="scope.row.status == '0' ? 'primary' : 'warning'"
                        >{{
                            scope.row.status == "0" ? "在库中" : "离库"
                        }}</el-tag
                    >
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="240" />
            <el-table-column prop="changeTime" label="修改时间" width="240" />

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
    </el-card>

    <el-dialog
        v-model="createDialogVisible"
        title="添加物资"
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
                <el-form-item label="物资名称" prop="resourceName">
                    <el-input v-model="createData.resourceName" />
                </el-form-item>

                <el-form-item label="物资类型" prop="resourceTypeID">
                    <el-select
                        v-model="createData.resourceTypeID"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in resTypeOptition"
                            :key="item.resourceTypeID"
                            :label="item.resourceTypeName"
                            :value="item.resourceTypeID"
                        />
                    </el-select>
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
        title="修改物资"
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
                <el-input disabled v-model="updateData.resourceID" />
            </el-form-item>

            <el-form-item label="类型名称" prop="resourceName">
                <el-input v-model="updateData.resourceName" />
            </el-form-item>

            <el-form-item label="物资类型" prop="resourceTypeID">
                <el-select
                    v-model="updateData.resourceTypeID"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="item in resTypeOptition"
                        :key="item.resourceTypeID"
                        :label="item.resourceTypeName"
                        :value="item.resourceTypeID"
                    />
                </el-select>
            </el-form-item>

            <el-form-item label="类型状态" prop="status">
                <el-radio-group v-model="updateData.status">
                    <el-radio :value="0" size="large">在库中</el-radio>
                    <el-radio :value="1" size="large">离库</el-radio>
                </el-radio-group>
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
    createResource,
    deleteResource,
    getResource,
    getResourceType,
    getResourceTypeByID,
    updateResource,
} from "../../api";
import {
    CreateResource,
    DeleteResource,
    Resource,
    ResourceType,
    UpdateResource,
} from "../../types/Resource";
import { FormInstance, FormRules } from "element-plus";

const tableData = ref<Resource[]>([]);

interface Table {
    resourceID: string;
    resourceTypeID: string;
    resourceTypeName: string;
    resourceName: string;
    status: number;
    createTime: string;
    changeTime: string;
}

const listData = ref<Table[]>([]);

const getList = () => {
    listData.value = [];
    for (const item of tableData.value) {
        getResourceTypeByID({ resourceTypeID: item.resourceTypeID })
            .then((res) => {
                if (res.success) {
                    const obj: Table = {
                        resourceTypeName: res.data!.resourceTypeName,
                        ...item,
                    };
                    listData.value.push(obj);
                } else {
                    ElMessage({
                        type: "error",
                        message: res.message,
                    });
                }
            })
            .catch((err) => {
                ElMessage({
                    type: "error",
                    message: err.message,
                });
            });
    }
};

const getRes = () => {
    getResource().then((res) => {
        if (res.success) {
            tableData.value = res.data!;
            getList();
        }
    });
};
getRes();

const resTypeOptition = ref<ResourceType[]>([]);

const getResType = () => {
    getResourceType().then((res) => {
        resTypeOptition.value = res.data!;
    });
};
getResType();

// create
const createFormRef = ref<FormInstance>();
const createDialogVisible = ref(false);
const createData = ref<CreateResource>({
    resourceTypeID: "",
    resourceName: "",
});
const createRule = reactive<FormRules<CreateResource>>({
    resourceTypeID: [
        {
            required: true,
            message: "物资类型不能为空",
            trigger: "blur",
        },
    ],
    resourceName: [
        {
            required: true,
            message: "物资名称不能为空",
            trigger: "blur",
        },
    ],
});

const createRes = () => {
    (createData.value.resourceTypeID = ""),
        (createData.value.resourceName = "");
    createDialogVisible.value = true;
};

const submitCreateForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            createResource(createData.value)
                .then((res) => {
                    if (res.success) {
                        ElMessage({
                            type: "success",
                            message: "添加成功。",
                        });
                        createDialogVisible.value = false;
                        getRes();
                    } else {
                        ElMessage({
                            type: "error",
                            message: res.message,
                        });
                    }
                })
                .catch((err) => {
                    ElMessage({
                        type: "error",
                        message: err.message,
                    });
                });
        } else {
            console.log("error submit!", fields);
        }
    });
};

// update
const updateFormRef = ref<FormInstance>();
const updateDialogVisible = ref(false);
const updateData = ref<UpdateResource>({
    resourceID: "",
    resourceTypeID: "",
    resourceName: "",
    status: 0,
});

const submitUpdateForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            updateResource(updateData.value)
                .then((res) => {
                    if (res.success) {
                        ElMessage({
                            type: "success",
                            message: "添加成功。",
                        });
                        updateDialogVisible.value = false;
                        getRes();
                    } else {
                        ElMessage({
                            type: "error",
                            message: res.message,
                        });
                    }
                })
                .catch((err) => {
                    ElMessage({
                        type: "error",
                        message: err.message,
                    });
                });
        } else {
            console.log("error submit!", fields);
        }
    });
};

const handleEdit = (row: Resource) => {
    updateData.value.resourceID = row.resourceID;
    updateData.value.resourceName = row.resourceName;
    updateData.value.resourceTypeID = row.resourceTypeID;
    updateData.value.status = row.status;
    updateDialogVisible.value = true;
};

const deleteRes = (data: DeleteResource) => {
    ElMessageBox.confirm("你要删除这个物资吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            deleteResource(data).then((res) => {
                if (res.success) {
                    ElMessage({
                        type: "success",
                        message: "删除成功",
                    });
                    getRes();
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

const handleDelete = (row: Resource) => {
    deleteRes(row);
};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};

const searchInput = ref("");

const search = () => {
    const searchResult = listData.value?.find(
        (value) => value.resourceName == searchInput.value
    );
    listData.value = [];
    listData.value.push(searchResult!);
};

const resetSearch = () => {
    getRes()
    searchInput.value = "";
};
</script>
