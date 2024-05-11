<script setup lang="ts">
import { reactive, ref } from "vue";
import { FormRules, FormInstance } from "element-plus";
import { CreateApplication, Recruitment } from "../../types/Recruitment";
import { Department } from "../../types/Department";
import { Direction } from "../../types/Direction";
import { College } from "../../types/College";
import { Mojar } from "../../types/Mojar";
import {
    createApplication,
    getAllCollege,
    getAllDepartment,
    getAllDirection,
    getAllMojar,
    getAllRecruitment,
    getAllRole,
} from "../../api";
import { Role } from "../../types/Role";

// 表单数据
const ruleFormRef = ref<FormInstance>();
const applicationForm = reactive<CreateApplication>({
    studentID: "",
    studentName: "",
    recruitmentID: "",
    sex: "",
    phoneNum: "",
    collegeCode: "",
    mojarCode: "",
    departmentCode: "",
    directionCode: "",
    userRole: "",
    introduction: "",
    obey: false,
});

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

const recruitmentList = ref<Recruitment[]>([]);
const fetchAllRecruitment = () => {
    getAllRecruitment().then((res) => {
        if (res.success) {
            recruitmentList.value = res.data!;
        } else {
            ElMessage({
                type: "error",
                message: "获取纳新信息失败",
            });
        }
    });
};
fetchAllRecruitment();

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

// 将获取到的部门和方向，格式化为级联选择器格式
const formatDepartmentAndDirection = (
    departmentList: Department[],
    directionList: Direction[]
) => {
    const result = [];
    for (const item1 of departmentList) {
        const depart = {
            label: item1.departmentName,
            value: item1.departmentCode,
            children: [] as Array<object>,
        };
        for (const item2 of directionList) {
            if (item2.departmentCode == item1.departmentCode) {
                const direct = {
                    label: item2.directionName,
                    value: item2.directionCode,
                };
                depart.children.push(direct);
            }
        }
        result.push(depart);
    }
    return result;
};

// 将获取到的学院和专业，格式化为级联选择器格式
const formatCollegeAndMojar = (collegeList: College[], mojarList: Mojar[]) => {
    const result = [];
    for (const item1 of collegeList) {
        const depart = {
            label: item1.collegeName,
            value: item1.collegeCode,
            children: [] as Array<object>,
        };
        for (const item2 of mojarList) {
            if (item2.collegeCode == item1.collegeCode) {
                const direct = {
                    label: item2.mojarName,
                    value: item2.mojarCode,
                };
                depart.children.push(direct);
            }
        }
        result.push(depart);
    }
    return result;
};

// 选择部门、岗位后获取选择的内容
const departmentOption = ref();
setTimeout(() => {
    departmentOption.value = formatDepartmentAndDirection(
        departmentList.value,
        directionList.value
    );
}, 500);
const departmentChange = (value: any) => {
    applicationForm.departmentCode = value[0];
    applicationForm.directionCode = value[1];
    formData.department = value;
};

// 选择中心、方向后获取选择的内容
const collegeOption = ref();
setTimeout(() => {
    collegeOption.value = formatCollegeAndMojar(
        collegeList.value,
        mojarList.value
    );
}, 500);
const collegeChange = (value: any) => {
    applicationForm.collegeCode = value[0];
    applicationForm.mojarCode = value[1];
    formData.major = `${value[0]}${
        value[1] == undefined ? "" : "·" + value[1]
    }`;
};

const formData = reactive({
    username: "",
    studentId: "",
    recruitmentID: "",
    major: "",
    phone: "",
    department: "",
    direction: "",
    goal: "默认",
    des: "",
    obey: true,
});

// 表单验证
const rules = reactive<FormRules>({
    // 姓名，必填
    username: [
        {
            type: "string",
            required: true,
            message: "请输入您的姓名！",
            trigger: "blur",
        },
    ],
    // 学号，必填
    // 学号为12位数字
    studentId: [
        {
            type: "string",
            required: true,
            message: "请输入您的学号！",
            trigger: "blur",
        },
    ],
    // 手机号，必填
    // 正则表达式：/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    phone: [
        {
            type: "string",
            required: true,
            message: "请输入您的手机号！",
            trigger: "blur",
        },
        {
            pattern:
                /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: "手机号格式错误",
            trigger: "blur",
        },
    ],
    // 专业学院
    major: [
        {
            required: true,
            message: "请选择您所在的学院及专业",
        },
    ],
    // 入职岗位
    department: [
        {
            required: true,
            message: "请选择您想要入职的部门及岗位",
        },
    ],
    // 入职职位
    goal: [
        {
            required: true,
            message: "请选择您想要入职的职位",
        },
    ],

    // 是否调剂
    obey: [
        {
            required: true,
            message: "请选择您是否接受调剂",
        },
    ],
    recruitmentID: [
        {
            required: true,
            message: "请选择纳新批次",
        },
    ],
});

const onSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            applicationForm.introduction = formData.des;
            applicationForm.obey = formData.obey;
            applicationForm.phoneNum = formData.phone;
            applicationForm.studentID = formData.studentId;
            applicationForm.studentName = formData.username;
            applicationForm.userRole = formData.goal;
            applicationForm.recruitmentID = formData.recruitmentID;
            createApplication(applicationForm).then((res) => {
                if (res.success) {
                    ElMessage({
                        type: "success",
                        message: "报名成功！",
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                } else {
                    ElMessage({
                        type: "error",
                        message: "报名失败。",
                    });
                }
            });
        } else {
            console.log("error submit!", fields);
        }
    });
};
</script>

<template>
    <div style="display: flex; align-items: center; justify-content: center">
        <el-form
            label-position="top"
            label-width="500px"
            :model="formData"
            ref="ruleFormRef"
            :rules="rules"
            style="width: 600px"
        >
            <!-- input：姓名 -->
            <el-form-item label="姓名" prop="username">
                <el-input v-model="formData.username" />
            </el-form-item>

            <!-- input：学号 -->
            <el-form-item label="学号" prop="studentId">
                <el-input v-model="formData.studentId" />
            </el-form-item>

            <!-- input：手机号 -->
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="formData.phone" />
            </el-form-item>

            <el-form-item label="纳新批次" prop="recruitmentID">
                <el-select
                    v-model="formData.recruitmentID"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="index in recruitmentList"
                        :label="index.recruitmentName"
                        :value="index.recruitmentID"
                        :key="index.recruitmentName"
                    />
                </el-select>
            </el-form-item>

            <!-- cascader：所在学院/专业 -->
            <el-form-item label="专业学院" prop="major">
                <el-cascader
                    :options="collegeOption"
                    placeholder="请选择"
                    @change="collegeChange"
                    :style="{ width: '100%' }"
                >
                </el-cascader>
            </el-form-item>

            <!-- cascader：部门及岗位选择 -->
            <el-form-item label="部门及岗位选择" prop="department">
                <el-cascader
                    :options="departmentOption"
                    placeholder="请选择"
                    @change="departmentChange"
                    :style="{ width: '100%' }"
                >
                </el-cascader>
            </el-form-item>

            <el-form-item label="目标职位" prop="goal">
                <el-select v-model="formData.goal" placeholder="请选择">
                    <el-option
                        v-for="index in roleList"
                        :label="index.roleName"
                        :value="index.roleCode"
                        :key="index.roleCode"
                    />
                </el-select>
            </el-form-item>

            <!-- textarea：自我介绍 -->
            <el-form-item label="优势介绍" prop="des">
                <el-input
                    v-model="formData.des"
                    :rows="5"
                    type="textarea"
                    placeholder="如有相应的作品可附上链接或面试时展示哦~"
                    clearable
                    :autosize="{ minRows: 5 }"
                    resize="none"
                />
            </el-form-item>

            <!-- radio：是否调剂 -->
            <el-form-item label="调剂意愿" prop="obey">
                <el-radio-group v-model="formData.obey" class="ml-4">
                    <el-radio :label="true" size="large">接受调剂</el-radio>
                    <el-radio :label="false" size="large">不接受调剂</el-radio>
                </el-radio-group>
            </el-form-item>

            <div style="margin-top: 36px">
                <el-form-item>
                    <el-button type="primary" @click="onSubmit(ruleFormRef)"
                        >提交报名</el-button
                    >
                </el-form-item>
            </div>
        </el-form>
    </div>

    <div>
        <br /><br />
        <el-link href="https://beian.miit.gov.cn/" target="_blank"
            >粤ICP备2022014957号-1</el-link
        >
        <div
            style="display: flex; flex-direction: row; justify-content: center"
        >
            <el-image
                style="width: 20px; height: 20px"
                src="https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png"
            />
            <el-link
                href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44049102496850/"
                target="_blank"
                >粤公网安备 44049102496850号</el-link
            >
        </div>
    </div>
</template>

<style scoped></style>
