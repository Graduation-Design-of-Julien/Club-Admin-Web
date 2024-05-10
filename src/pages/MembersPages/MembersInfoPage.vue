<template>
    <h2>人员管理</h2>
    <el-card>
        <template #header>
            <div class="card-header">
                <div style="display: flex; flex-direction: row">
                    <el-input
                        style="width: 200px"
                        placeholder="请输入姓名"
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
                    <el-button type="primary">新增成员</el-button>
                </div>
            </div>
        </template>
        <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="uid" label="uid" />
                <el-table-column prop="userName" label="姓名" />

                <el-table-column prop="sex" label="性别"/>

                <el-table-column prop="nativePlace" label="籍贯" />

                <el-table-column prop="phoneNum" label="手机号" />

                <el-table-column prop="departmentName" label="部门" />

                <el-table-column prop="directionName" label="岗位" />

                <el-table-column prop="userRole" label="职位" />

                <el-table-column prop="collegeName" label="所属学院" />

                <el-table-column prop="mojarName" label="就读专业" />

                <el-table-column
                    prop="createTime"
                    label="入社时间"
                    width="180px"
                />

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
</template>

<script lang="ts" setup>
const tableData = [
    {
        uid: "ucs-00001",
        userName: "张三",
        sex: "男",
        nativePlace: "广东省珠海市",
        phoneNum: "13000000000",
        departmentName: "媒体中心",
        directionName: "摄影",
        userRole: "主任",
        collegeName: "计算机学院",
        mojarName: "软件工程",
        createTime: "2024-04-11 16:35:21",
    },
    {
        uid: "ucs-00002",
        userName: "李四",
        sex: "男",
        nativePlace: "广东省珠海市",
        phoneNum: "13000000001",
        departmentName: "媒体中心",
        directionName: "摄影",
        userRole: "副主任",
        collegeName: "计算机学院",
        mojarName: "软件工程",
        createTime: "2024-04-11 16:36:55",
    },
    {
        uid: "ucs-00003",
        userName: "李红",
        sex: "女",
        nativePlace: "广东省珠海市",
        phoneNum: "13000000003",
        departmentName: "媒体中心",
        directionName: "摄影",
        userRole: "助理",
        collegeName: "计算机学院",
        mojarName: "软件工程",
        createTime: "2024-04-11 16:38:21",
    },
];

const handleEdit = (row: any) => {
    console.log(row)
};
const handleDelete = (row: any) => {
    console.log(row)
};
</script>
