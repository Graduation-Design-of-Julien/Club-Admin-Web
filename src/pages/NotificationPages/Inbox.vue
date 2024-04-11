<template>
    <h2>收件箱</h2>
    <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="title" label="标题" width="180" />
        <el-table-column label="状态" width="180">
            <template #default="scope">
                <el-tag>{{ scope.row.status }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="changeTime" label="修改时间" width="180" />
        <el-table-column label="操作">
            <template #default="scope">
                <el-button size="small" @click="handleOpen(scope.row)"
                    >查看</el-button
                >
                <el-button size="small" @click="handleEdit(scope.row)">{{
                    scope.row.status === "已读" ? "标为未读" : "标为已读"
                }}</el-button>
                <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.row)"
                    >删除</el-button
                >
            </template>
        </el-table-column>
    </el-table>

    <el-dialog
        v-model="centerDialogVisible"
        :title="dialogData.title"
        width="500"
        align-center
        center
    >
        <span>
            {{ dialogData.content }}
        </span>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="handleClose">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { Outbox } from "../../types/Notification";
import { ref } from "vue";

const centerDialogVisible = ref(false);

const tableData: Array<Outbox> = [
    {
        notificationID: "",
        title: "测试标题1",
        content: "测试内容1",
        sender: "",
        status: "未读",
        changeTime: new Date().toTimeString(),
    },
];

const dialogData = ref<Outbox>({
    notificationID: "",
    title: "",
    content: "",
    sender: "",
    status: "",
    changeTime: "",
});

// 删除
const deleteNotification = (data: Outbox) => {
    ElMessageBox.confirm("你要删除这条通知吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            // TODO: 完成删除
            console.log(data);
            ElMessage({
                type: "success",
                message: "删除成功",
            });
        })
        .catch(() => {
            ElMessage({
                type: "info",
                message: "已取消删除",
            });
        });
};

const handleOpen = (row: Outbox) => {
    centerDialogVisible.value = true;
    dialogData.value = row;
};
const handleClose = () => {
    centerDialogVisible.value = false;
    if(dialogData.value.status !== "已读"){
        dialogData.value.status = "已读"
        // TODO: 向服务器变更数据
    }
}
const handleEdit = (row: Outbox) => {
    row.status === "已读" ? (row.status = "未读") : (row.status = "已读");
    ElMessage({
        type: "success",
        message: `通知已标为${row.status}`,
    });
};
const handleDelete = (row: Outbox) => {
    deleteNotification(row);
};
</script>
