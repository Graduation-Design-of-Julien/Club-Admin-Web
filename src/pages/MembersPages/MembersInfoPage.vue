<template>
    <h2>人员管理</h2>
    <el-card>
        <template #header>
            <div class="card-header">
                <div style="display: flex; flex-direction: row">
                    <el-input
                        style="width: 200px"
                        placeholder="请输入姓名"
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
                        >新增成员</el-button
                    >
                </div>
            </div>
        </template>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="uid" label="uid" />
            <el-table-column prop="userName" label="姓名" />

            <el-table-column prop="sex" label="性别" />

            <el-table-column prop="phoneNum" label="手机号" />

            <el-table-column prop="departmentCode" label="部门" />

            <el-table-column prop="directionCode" label="岗位" />

            <el-table-column prop="userRole" label="职位" />

            <el-table-column prop="collegeCode" label="所属学院" />

            <el-table-column prop="mojarCode" label="就读专业" />

            <el-table-column prop="createTime" label="入社时间" width="180px" />

            <el-table-column label="操作" width="180">
                <template #default="scope">
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
                <el-form-item label="姓名" prop="userName">
                    <el-input v-model="createForm.userName" />
                </el-form-item>

                <el-form-item label="性别" prop="sex">
                    <el-select
                        v-model="createForm.sex"
                        placeholder="Select"
                        style="width: 240px"
                    >
                        <el-option
                            v-for="item in sexOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item label="手机号" prop="phoneNum">
                    <el-input v-model="createForm.phoneNum" />
                </el-form-item>
                <el-form-item label="部门" prop="departmentCode">
                    <el-select
                        v-model="createForm.departmentCode"
                        placeholder="Select"
                        style="width: 240px"
                    >
                        <el-option
                            v-for="item in departmentList"
                            :key="item.departmentCode"
                            :label="item.departmentName"
                            :value="item.departmentCode"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="岗位" prop="directionCode">
                    <el-select
                        v-model="createForm.directionCode"
                        placeholder="Select"
                        style="width: 240px"
                    >
                        <el-option
                            v-for="item in directionList"
                            :key="item.directionCode"
                            :label="item.directionName"
                            :value="item.directionCode"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="职位" prop="userRole">
                    <el-select
                        v-model="createForm.userRole"
                        placeholder="Select"
                        style="width: 240px"
                    >
                        <el-option
                            v-for="item in roleList"
                            :key="item.roleCode"
                            :label="item.roleName"
                            :value="item.roleCode"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="所属学院" prop="collegeCode">
                    <el-select
                        v-model="createForm.collegeCode"
                        placeholder="Select"
                        style="width: 240px"
                    >
                        <el-option
                            v-for="item in collegeList"
                            :key="item.collegeCode"
                            :label="item.collegeName"
                            :value="item.collegeCode"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="就读专业" prop="mojarCode">
                    <el-select
                        v-model="createForm.mojarCode"
                        placeholder="Select"
                        style="width: 240px"
                    >
                        <el-option
                            v-for="item in mojarList"
                            :key="item.mojarCode"
                            :label="item.mojarName"
                            :value="item.mojarCode"
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
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { CreateUser, DeleteUser, UserInfo } from "../../types/user";
import {
    createUser,
    deleteUser,
    getAllCollege,
    getAllDepartment,
    getAllDirection,
    getAllMojar,
    getAllRole,
    getAllUser,
} from "../../api";
import { Department } from "../../types/Department";
import { Direction } from "../../types/Direction";
import { College } from "../../types/College";
import { Mojar } from "../../types/Mojar";
import { Role } from "../../types/Role";
import { FormInstance, FormRules } from "element-plus";

const tableData = ref<UserInfo[]>([]);
const fetchAllUser = () => {
    getAllUser().then((res) => {
        if (res.success) {
            tableData.value = res.data!;
        } else {
            ElMessage({
                type: "error",
                message: "获取人员列表失败",
            });
        }
    });
};
fetchAllUser();

const departmentList = ref<Department[]>([]);
const fetchAllDepartment = () => {
    getAllDepartment().then((res) => {
        if (res.success) {
            departmentList.value = res.data!;
        } else {
            ElMessage({
                type: "error",
                message: "获取部门列表失败",
            });
        }
    });
};
fetchAllDepartment();

const directionList = ref<Direction[]>([]);
const fetchAllDirection = () => {
    getAllDirection().then((res) => {
        if (res.success) {
            directionList.value = res.data!;
        } else {
            ElMessage({
                type: "error",
                message: "获取岗位列表失败",
            });
        }
    });
};
fetchAllDirection();

const collegeList = ref<College[]>([]);
const fetchAllCollege = () => {
    getAllCollege().then((res) => {
        if (res.success) {
            collegeList.value = res.data!;
        } else {
            ElMessage({
                type: "error",
                message: "获取学院列表失败",
            });
        }
    });
};
fetchAllCollege();

const mojarList = ref<Mojar[]>([]);
const fetchAllMojar = () => {
    getAllMojar().then((res) => {
        if (res.success) {
            mojarList.value = res.data!;
        } else {
            ElMessage({
                type: "error",
                message: "获取专业列表失败",
            });
        }
    });
};
fetchAllMojar();

const roleList = ref<Role[]>([]);
const fetchAllRole = () => {
    getAllRole().then((res) => {
        if (res.success) {
            roleList.value = res.data!;
        } else {
            ElMessage({
                type: "error",
                message: "获取职位列表失败",
            });
        }
    });
};
fetchAllRole();

const sexOption = [
    {
        label: "男",
        value: "男",
    },
    {
        label: "女",
        value: "女",
    },
    {
        label: "其他",
        value: "其他",
    },
];

// create
const createFormRef = ref<FormInstance>();
const createDialogVisible = ref(false);
const createForm = ref<CreateUser>({
    userName: "",
    sex: "",
    nativePlace: "",
    phoneNum: "",
    email: "",
    cardNum: "",
    avatarUrl: "",
    introduction: "",
    departmentCode: 0,
    directionCode: 0,
    userRole: 0,
    collegeCode: 0,
    mojarCode: 0,
});

const createRule = reactive<FormRules<CreateUser>>({
    userName: [
        {
            required: true,
            message: "姓名不能为空",
            trigger: "blur",
        },
    ],
    phoneNum: [
        {
            required: true,
            message: "手机号不能为空",
            trigger: "blur",
        },
    ],
    departmentCode: [
        {
            required: true,
            message: "部门不能为空",
            trigger: "blur",
        },
    ],
    directionCode: [
        {
            required: true,
            message: "岗位不能为空",
            trigger: "blur",
        },
    ],
    collegeCode: [
        {
            required: true,
            message: "学院不能为空",
            trigger: "blur",
        },
    ],
    mojarCode: [
        {
            required: true,
            message: "专业不能为空",
            trigger: "blur",
        },
    ],
    userRole: [
        {
            required: true,
            message: "职位不能为空",
            trigger: "blur",
        },
    ],
});

const handleCreate = () => {
    createForm.value = {
        userName: "",
        sex: "",
        nativePlace: "",
        phoneNum: "",
        email: "",
        cardNum: "",
        avatarUrl: "",
        introduction: "",
        departmentCode: 0,
        directionCode: 0,
        userRole: 0,
        collegeCode: 0,
        mojarCode: 0,
    };
    createDialogVisible.value = true;
};

const submitCreateForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            createUser(createForm.value)
                .then((res) => {
                    if (res.success) {
                        ElMessage({
                            type: "success",
                            message: "创建成员成功。",
                        });
                        createDialogVisible.value = false;
                        fetchAllUser();
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

const deleteOneUser = (data: DeleteUser) => {
    ElMessageBox.confirm("你要删除这个用户吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            deleteUser({ uid: data.uid }).then((res) => {
                if (res.success) {
                    ElMessage({
                        type: "success",
                        message: "删除成功",
                    });
                    fetchAllUser();
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

const handleDelete = (row: any) => {
    deleteOneUser(row);
};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};

const searchInput = ref("");

const search = () => {
    const searchResult = tableData.value?.find(
        (value) => value.userName == searchInput.value
    );
    tableData.value = [];
    tableData.value.push(searchResult!);
};

const resetSearch = () => {
    fetchAllUser();
    searchInput.value = "";
};
</script>
