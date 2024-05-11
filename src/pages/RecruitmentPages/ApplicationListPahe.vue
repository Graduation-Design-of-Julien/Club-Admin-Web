<template>
    <h2>纳新报名列表</h2>
    <el-card>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="studentName" label="姓名" />

            <el-table-column prop="recruitmentID" label="纳新批次" />

            <el-table-column prop="phoneNum" label="手机号" />

            <el-table-column prop="departmentCode" label="部门" />

            <el-table-column prop="directionCode" label="岗位" />

            <el-table-column prop="userRole" label="职位" />

            <el-table-column prop="collegeCode" label="所属学院" />

            <el-table-column prop="mojarCode" label="就读专业" />

            <el-table-column prop="introduction" label="介绍" />

            <el-table-column prop="obey" label="是否调剂" />

            <el-table-column prop="createTime" label="入社时间" />
        </el-table>
    </el-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ApplicationTable } from "../../types/Recruitment";
import { getAllApplication } from "../../api";

const tableData = ref<ApplicationTable[]>([]);
const fetchApplication = () => {
    getAllApplication().then((res) => {
        if (res.success) {
            tableData.value = res.data!;
        } else {
            ElMessage({
                type: "success",
                message: "获取报名列表失败",
            });
        }
    });
};
fetchApplication();
</script>
