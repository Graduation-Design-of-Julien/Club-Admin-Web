<template>
    <h2>发件箱</h2>
    <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="createTime" label="发件时间" width="180" />
        <el-table-column prop="changeTime" label="修改时间" width="180" />
        <el-table-column prop="title" label="标题" width="180" />
        <el-table-column prop="content" label="通知内容" />
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

    <el-dialog
        v-model="centerDialogVisible"
        title="修改通知"
        width="500"
        destroy-on-close
        center
    >
        <MessageForm :messageData="editForm"></MessageForm>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Notification } from "../../types/Notification";
import MessageForm from "../../components/MessageForm.vue";

const tableData: Array<Notification> = [
    {
        notificationID: "",
        title: "测试标题1",
        content: "测试内容1",
        sender: "",
        createTime: new Date().toTimeString(),
        status: "已发送",
        changeTime: new Date().toTimeString(),
        recipients: [],
    },
];

// 修改
const editForm = ref<Notification>({
    notificationID: "",
    title: "测试标题1",
    content: "测试内容1",
    sender: "",
    createTime: new Date().toTimeString(),
    status: "已发送",
    changeTime: new Date().toTimeString(),
    recipients: [],
});
const centerDialogVisible = ref(false);

// 删除
const deleteNotification = (data: Notification) => {
    ElMessageBox.confirm(
        "你要删除这条通知吗？（已发出的通知只会将其在您的发件箱中移除）",
        "警告",
        {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        }
    )
        .then(() => {
            // TODO: 完成删除
            console.log(data)
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


const handleEdit = (row: Notification) => {
    centerDialogVisible.value = true;
    editForm.value = row;
};
const handleDelete = (row: Notification) => {
    deleteNotification(row)
};
</script>
