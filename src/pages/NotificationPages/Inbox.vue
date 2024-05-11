<template>
    <h2>收件箱</h2>
    <el-table :data="table" stripe style="width: 100%">
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="sender" label="发件人" width="180" />
        <el-table-column label="状态" width="180">
            <template #default="scope">
                <el-tag
                    :type="scope.row.status == '2' ? 'primary' : 'warning'"
                    >{{ scope.row.status == "2" ? "已读" : "未读" }}</el-tag
                >
            </template>
        </el-table-column>
        <el-table-column prop="createTime" label="收件时间" width="200" />
        <el-table-column label="操作" width="300">
            <template #default="scope">
                <el-button size="small" @click="handleOpen(scope.row)"
                    >查看</el-button
                >
                <el-button size="small" @click="handleEdit(scope.row)">{{
                    scope.row.status === "2" ? "标为未读" : "标为已读"
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
import {
    deleteInbox,
    getAllUser,
    getMyInbox,
    getNotificationByID,
    updateInbox,
} from "../../api";
import { Inbox } from "../../types/Notification";
import { ref } from "vue";

// 查看开关
const centerDialogVisible = ref(false);

const myInbox = ref<Inbox[]>([]);

interface Table {
    notificationID: string;
    title: string;
    content: string;
    status: number;
    sender: string;
    createTime: string;
}

const table = ref<Table[]>([]);

const getTable = () => {
    myInbox.value.forEach((item) => {
        getNotificationByID({ notificationID: item.notificationID }).then(
            (res) => {
                console.log(res.data);
                if (res.success) {
                    getAllUser().then((resq) => {
                        const user = resq.data?.find(
                            (info) => info.uid == res.data!.sender
                        );
                        const obj: Table = {
                            notificationID: res.data!.notificationID,
                            title: res.data!.title,
                            content: res.data!.content,
                            status: item.status,
                            sender: user!.userName,
                            createTime: res.data!.createTime.toString(),
                        };
                        table.value?.push(obj);
                    });
                }
            }
        );
        console.log(table.value);
    });
};

const getAllMyInbox = () => {
    getMyInbox().then((res) => {
        if (res.success) {
            myInbox.value = res.data!;
            console.log(myInbox.value);
            getTable();
        } else {
            ElMessage({
                type: "error",
                message: res.message,
            });
        }
    });
};
getAllMyInbox();

const dialogData = ref<Table>({
    notificationID: "",
    title: "",
    content: "",
    status: 0,
    sender: "",
    createTime: "",
});

// 删除
const deleteNotification = (data: Table) => {
    ElMessageBox.confirm("你要删除这条通知吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            deleteInbox({ notificationID: data.notificationID }).then((res) => {
                if (res.success) {
                    ElMessage({
                        type: "success",
                        message: "删除成功",
                    });
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

const handleOpen = (row: Table) => {
    centerDialogVisible.value = true;
    dialogData.value = row;
};
const handleClose = () => {
    centerDialogVisible.value = false;
    if (dialogData.value.status !== 1) {
        dialogData.value.status = 2;
        updateInbox({
            notificationID: dialogData.value.notificationID,
            status: 2,
        }).then((res) => {
            if (res.success) {
                ElMessage({
                    type: "success",
                    message: "已读。",
                });
                getAllMyInbox();
            } else {
                ElMessage({
                    type: "error",
                    message: res.message,
                });
            }
        });
    }
};
const handleEdit = (row: Table) => {
    row.status === 1 ? (row.status = 2) : (row.status = 1);
    updateInbox({
        notificationID: row.notificationID,
        status: row.status,
    }).then((res) => {
        if (res.success) {
            ElMessage({
                type: "success",
                message: "更新成功。",
            });
            getAllMyInbox();
        } else {
            ElMessage({
                type: "error",
                message: res.message,
            });
        }
    });
};
const handleDelete = (row: Table) => {
    deleteNotification(row);
};
</script>
