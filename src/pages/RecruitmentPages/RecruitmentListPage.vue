<template>
    <h2>纳新信息</h2>
    <el-card>
        <template #header>
            <div class="card-header">
                <div style="display: flex; flex-direction: row">
                    <el-input
                        style="width: 200px"
                        placeholder="请输入纳新标题"
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
                    <el-button type="primary" @click="handleCreate"
                        >新增纳新</el-button
                    >
                </div>
            </div>
        </template>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column
                prop="recruitmentID"
                label="纳新编号"
                width="100"
            />

            <el-table-column prop="recruitmentName" label="纳新标题" />

            <el-table-column
                prop="recruitmentTime"
                label="纳新截止时间"
                width="400px"
            />

            <el-table-column label="纳新状态" width="200">
                <template #default="scope">
                    <el-tag
                        :type="scope.row.status == 0 ? 'primary' : 'warning'"
                        >{{
                            scope.row.status == 0 ? "录取中" : "已结束"
                        }}</el-tag
                    >
                </template>
            </el-table-column>

            <el-table-column label="操作" width="300px">
                <template #default="scope">
                    <el-button
                        v-if="scope.row.status == 0"
                        size="small"
                        @click="handleCloseNx(scope.row)"
                        >结束报名</el-button
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
        title="新增纳新"
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
                <el-form-item label="纳新标题" prop="recruitmentName">
                    <el-input v-model="createForm.recruitmentName" />
                </el-form-item>

                <el-form-item label="纳新截止时间" prop="recruitmentTime">
                    <el-date-picker
                        v-model="createForm.recruitmentTime"
                        type="datetime"
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
    CreateRecruitment,
    DeleteRecruitment,
    Recruitment,
    UpdateRecruitment,
} from "../../types/Recruitment";
import {
    createRecruitment,
    deleteRecruitment,
    getAllRecruitment,
    updateRecruitment,
} from "../../api";
import { FormInstance, FormRules } from "element-plus";

const tableData = ref<Recruitment[]>([]);
const getTableData = () => {
    getAllRecruitment().then((res) => {
        if (res.success) {
            tableData.value = res.data!;
        } else {
            ElMessage({
                type: "error",
                message: "获取纳新列表失败",
            });
        }
    });
};
getTableData();

// create
const createFormRef = ref<FormInstance>();
const createDialogVisible = ref(false);
const createForm = ref<CreateRecruitment>({
    recruitmentName: "",
    recruitmentTime: "",
    recruitmentDepaList: "",
    recruitmentDirecList: "",
    recruitmentRoleList: "",
    collegeCodeList: "",
    mojarCodeList: "",
});

const createRule = reactive<FormRules<CreateRecruitment>>({
    recruitmentName: [
        {
            required: true,
            message: "请输入纳新标题",
            trigger: "blur",
        },
    ],
    recruitmentTime: [
        {
            required: true,
            message: "请选择纳新截止时间",
            trigger: "blur",
        },
    ],
    recruitmentDepaList: [
        {
            required: true,
            message: "请选择纳新部门",
            trigger: "blur",
        },
    ],
    recruitmentDirecList: [
        {
            required: true,
            message: "选择纳新岗位",
            trigger: "blur",
        },
    ],
    recruitmentRoleList: [
        {
            required: true,
            message: "请选择纳新职位",
            trigger: "blur",
        },
    ],
    collegeCodeList: [
        {
            required: true,
            message: "请选择学院",
            trigger: "blur",
        },
    ],
    mojarCodeList: [
        {
            required: true,
            message: "请选择",
            trigger: "blur",
        },
    ],
});

const handleCreate = () => {
    createForm.value = {
        recruitmentName: "",
        recruitmentTime: "",
        recruitmentDepaList: "",
        recruitmentDirecList: "",
        recruitmentRoleList: "",
        collegeCodeList: "",
        mojarCodeList: "",
    };
    createDialogVisible.value = true;
};

const submitCreateForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            createRecruitment(createForm.value)
                .then((res) => {
                    if (res.success) {
                        ElMessage({
                            type: "success",
                            message: "创建纳新成功。",
                        });
                        createDialogVisible.value = false;
                        getTableData();
                    } else {
                        ElMessage({
                            type: "error",
                            message: "创建纳新失败。",
                        });
                    }
                })
                .catch((err) => {
                    ElMessage({
                        type: "success",
                        message: err,
                    });
                });
        } else {
            console.log("error submit!", fields);
        }
    });
};

const closeNx = (data: UpdateRecruitment) => {
    ElMessageBox.confirm("你要结束本次纳新吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            updateRecruitment({
                recruitmentID: data.recruitmentID,
                status: 1,
            }).then((res) => {
                if (res.success) {
                    ElMessage({
                        type: "success",
                        message: "结束纳新成功。",
                    });
                    getTableData();
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
const handleCloseNx = (row: any) => {
    closeNx(row);
};

const deleteRecru = (data: DeleteRecruitment) => {
    ElMessageBox.confirm("你要删除这个纳新吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            deleteRecruitment({ recruitmentID: data.recruitmentID }).then(
                (res) => {
                    if (res.success) {
                        ElMessage({
                            type: "success",
                            message: "删除成功",
                        });
                        getTableData();
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

const handleDelete = (row: any) => {
    deleteRecru(row);
};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};

const searchInput = ref("");

const search = () => {
    const searchResult = tableData.value?.find(
        (value) => value.recruitmentName == searchInput.value
    );
    tableData.value = [];
    tableData.value.push(searchResult!);
};

const resetSearch = () => {
    getTableData();
    searchInput.value = "";
};
</script>
