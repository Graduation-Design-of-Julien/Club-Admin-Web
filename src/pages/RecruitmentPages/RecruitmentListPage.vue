<template>
    <h2>纳新信息</h2>
    <el-card>
        <template #header>
            <div class="card-header">
                <div style="display: flex; flex-direction: row">
                    <el-input
                        style="width: 200px"
                        placeholder="请输入纳新标题"
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
                    <el-button type="primary">新增纳新</el-button>
                </div>
            </div>
        </template>
        <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="recruitmentID" label="纳新编号" />

                <el-table-column prop="recruitmentName" label="纳新标题" width="200px" />

                <el-table-column prop="recruitmentDepaList" label="纳新部门"/>

                <el-table-column prop="recruitmentDirecList" label="纳新岗位" />

                <el-table-column prop="recruitmentRoleList" label="纳新职位" />

                <el-table-column prop="collegeCodeList" label="纳新学院" />

                <el-table-column prop="mojarCodeList" label="纳新专业" />

                <el-table-column prop="recruitmentTime" label="纳新时间" width="400px" />


                <el-table-column label="操作" width="300px">
                    <template #default="scope">
                        <el-button size="small"
                            >查看报名情况</el-button
                        >
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
</template>

<script lang="ts" setup>
const tableData = [
    {
        recruitmentID: "ucs-nx-00001",
        recruitmentName: "2023-2024-1学期纳新",
        recruitmentDepaList: "所有部门",
        recruitmentDirecList: "所有岗位",
        recruitmentRoleList: "所有职位",
        collegeCodeList: "所有学院",
        mojarCodeList: "所有专业",
        recruitmentTime: "2023-10-10 08:30:00 ~ 2023-12-01 24:00:00"
    },
    {
        recruitmentID: "ucs-nx-00002",
        recruitmentName: "2023-2024-2学期纳新",
        recruitmentDepaList: "所有部门",
        recruitmentDirecList: "所有岗位",
        recruitmentRoleList: "所有职位",
        collegeCodeList: "所有学院",
        mojarCodeList: "所有专业",
        recruitmentTime: "2024-04-12 09:20:31 ~ 2024-05-12 24:00:00"
    }
];

const handleEdit = (row: any) => {
    console.log(row)
};
const handleDelete = (row: any) => {
    console.log(row)
};
</script>
