<template>
    <h2>物资管理</h2>
    <el-card>
        <template #header>
            <div class="card-header">
                <div style="display: flex; flex-direction: row">
                    <el-input
                        style="width: 200px"
                        placeholder="请输入物资名称"
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
                    <el-button type="primary">新增物资</el-button>
                    <el-button type="primary">借出申请</el-button>
                    <el-button type="primary">归还申请</el-button>
                </div>
            </div>
        </template>
        <el-table :data="tableData" stripe style="width: 100%">
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
                        :type="
                            scope.row.status == '在库中' ? 'primary' : 'warning'
                        "
                        >{{ scope.row.status }}</el-tag
                    >
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="180" />
            <el-table-column prop="changeTime" label="修改时间" width="180" />

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
        resourceID: "ucs-wz-00001",
        resourceName: "手电筒",
        resourceTypeName: "电器类",
        status: "在库中",
        createTime: "2024-04-11 22:05:25",
        changeTime: "2024-04-11 22:05:25",
    },
    {
        resourceID: "ucs-wz-00002",
        resourceName: "相机",
        resourceTypeName: "数码类",
        status: "已出借",
        createTime: "2024-04-11 22:05:25",
        changeTime: "2024-04-11 22:05:25",
    },
];

const handleEdit = (row: any) => {
    console.log(row);
};
const handleDelete = (row: any) => {
    console.log(row);
};
</script>
