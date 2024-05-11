<template>
    <h2>我的借用</h2>
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
                    <el-button type="primary" @click="createBow"
                        >创建提单</el-button
                    >
                </div>
            </div>
        </template>
        <el-table :data="tableList" stripe style="width: 100%">
            <el-table-column prop="borrowedID" label="提单ID" width="180" />
            <el-table-column prop="resourceName" label="物资名称" width="180" />
            <el-table-column label="借出时间" width="200">
                <template #default="scope">
                    {{
                        FormatDate(
                            new Date(scope.row.borrowTime),
                            "datetime",
                            true
                        )
                    }}
                </template>
            </el-table-column>

            <el-table-column label="预计归还时间" width="200">
                <template #default="scope">
                    {{
                        FormatDate(
                            new Date(scope.row.returnTime),
                            "datetime",
                            true
                        )
                    }}
                </template>
            </el-table-column>

            <el-table-column label="物资状态" width="200">
                <template #default="scope">
                    <el-tag
                        :type="scope.row.isReturn ? 'primary' : 'warning'"
                        >{{ scope.row.isReturn ? "已归还" : "未归还" }}</el-tag
                    >
                </template>
            </el-table-column>

            <el-table-column label="操作" width="240">
                <template #default="scope">
                    <el-button
                        size="small"
                        v-if="!scope.row.isReturn"
                        @click="handleReturn(scope.row)"
                    >
                        归还
                    </el-button>
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
        title="新建提单"
        width="500"
        destroy-on-close
        center
    >
        <span>
            <el-form
                ref="createFormRef"
                style="min-width: 200px"
                :model="createForm"
                :rules="createRule"
                label-width="auto"
                status-icon
            >
                <el-form-item label="借出物资" prop="resourceID">
                    <el-select
                        v-model="createForm.resourceID"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in resourceList"
                            :key="item.resourceID"
                            :label="item.resourceName"
                            :value="item.resourceID"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item label="归还时间" prop="returnTime">
                    <el-date-picker
                        v-model="createForm.returnTime"
                        type="date"
                        placeholder="选择日期"
                    />
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
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import {
    CreateBorrow,
    DeleteBorrow,
    Resource,
    ResourceBorrow,
    UpdateBorrow,
} from "../../types/Resource";
import {
    createBorrow,
    deleteBorrow,
    getBorrow,
    getResource,
    updateBorrow,
} from "../../api";
import { FormInstance, FormRules } from "element-plus";
import FormatDate from "../../utils/FormatDate";

// list
const resourceList = ref<Resource[]>([]);
const getRes = () => {
    getResource().then((res) => {
        if (res.success) {
            resourceList.value = res.data!;
        } else {
            ElMessage({
                type: "error",
                message: res.message,
            });
        }
    });
};
getRes();

const borrowList = ref<ResourceBorrow[]>([]);
const getBorrowList = () => {
    getBorrow().then((res) => {
        if (res.success) {
            borrowList.value = res.data!;
            getTableList();
        } else {
            ElMessage({
                type: "error",
                message: res.message,
            });
        }
    });
};
getBorrowList();

interface Table {
    borrowedID: string;
    resourceID: string;
    resourceName: string;
    borrowTime: string;
    returnTime: string;
    realReturnTime: string;
    isReturn: boolean;
    createTime: string;
    changeTime: string;
}

const tableList = ref<Table[]>([]);
const getTableList = () => {
    tableList.value = [];
    for (const item of borrowList.value) {
        const resource = resourceList.value.find(
            (i) => i.resourceID == item.resourceID
        );
        const obj: Table = {
            ...item,
            resourceName: resource!.resourceName,
        };
        tableList.value.push(obj);
    }
};

// create
const createFormRef = ref<FormInstance>();
const createDialogVisible = ref(false);
const createForm = ref<CreateBorrow>({
    resourceID: "",
    returnTime: "",
});

const createRule = reactive<FormRules<CreateBorrow>>({
    resourceID: [
        {
            required: true,
            message: "请选择物资",
            trigger: "blur",
        },
    ],
    returnTime: [
        {
            required: true,
            message: "请选择归还时间",
            trigger: "blur",
        },
    ],
});

const createBow = () => {
    (createForm.value.resourceID = ""), (createForm.value.returnTime = "");
    createDialogVisible.value = true;
};

const submitCreateForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            const formatTime = FormatDate(
                new Date(createForm.value.returnTime),
                "datetime",
                true
            );
            createForm.value.returnTime = formatTime;
            console.log(createForm.value);
            createBorrow(createForm.value)
                .then((res) => {
                    if (res.success) {
                        ElMessage({
                            type: "success",
                            message: "添加成功。",
                        });
                        createDialogVisible.value = false;
                        getBorrowList();
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

const returnResource = (data: UpdateBorrow) => {
    ElMessageBox.confirm("你要归还这个物资吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            updateBorrow({ borrowedID: data.borrowedID, isReturn: true }).then(
                (res) => {
                    if (res.success) {
                        ElMessage({
                            type: "success",
                            message: "归还成功",
                        });
                        getBorrowList();
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
                message: "已取消归还",
            });
        });
};

const handleReturn = (row: Table) => {
    returnResource(row);
};

const deleteRes = (data: DeleteBorrow) => {
    ElMessageBox.confirm("你要删除这个提单吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            deleteBorrow(data).then((res) => {
                if (res.success) {
                    ElMessage({
                        type: "success",
                        message: "删除成功",
                    });
                    getBorrowList();
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

const handleDelete = (row: Table) => {
    deleteRes(row);
};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};

const searchInput = ref("");

const search = () => {
    const searchResult = tableList.value?.find(
        (value) => value.resourceName == searchInput.value
    );
    tableList.value = [];
    tableList.value.push(searchResult!);
};

const resetSearch = () => {
    getBorrowList();
    searchInput.value = "";
};
</script>
