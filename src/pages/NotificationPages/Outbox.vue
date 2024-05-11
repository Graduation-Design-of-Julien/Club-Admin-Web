<template>
    <h2>发件箱</h2>
    <div style="display: flex; flex-direction: row">
        <el-input
            style="width: 200px"
            placeholder="请输入通知标题"
            v-model="searchInput"
        ></el-input>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="primary" @click="resetSearch">重置</el-button>
    </div>
    <div style="display: flex; flex-direction: row; margin: 10px 0 10px 0">
        <el-button type="primary" @click="handleCreate">发布通知</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="createTime" label="发件时间" width="200" />
        <el-table-column prop="updateTime" label="修改时间" width="200" />
        <el-table-column prop="title" label="标题" width="180" />
        <el-table-column prop="content" label="通知内容" />
        <el-table-column label="状态" width="100">
            <template #default="scope">
                <el-tag :type="scope.row.status == '0' ? 'info' : 'success'">{{
                    scope.row.status == "0" ? "草稿" : "已发送"
                }}</el-tag>
            </template>
        </el-table-column>

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
        v-model="createDialogVisible"
        title="发布通知"
        width="500"
        destroy-on-close
        center
    >
        <MessageForm :messageData="createForm" type="create"></MessageForm>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="createDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="createDialogVisible = false">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>

    <el-dialog
        v-model="updateDialogVisible"
        title="修改通知"
        width="500"
        destroy-on-close
        center
    >
        <MessageForm :messageData="editForm" type="update"></MessageForm>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="updateDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="updateDialogVisible = false">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
    CreateOutbox,
    Notification,
    Outbox,
    UpdateOutbox,
} from "../../types/Notification";
import MessageForm from "../../components/MessageForm.vue";
import { deleteOutbox, getMyOutbox } from "../../api";

const tableData = ref<Array<Outbox>>();

const getOutboxList = () => {
    getMyOutbox()
        .then((res) => {
            tableData.value = res.data;
        })
        .catch(() => {
            ElMessage({
                type: "error",
                message: "获取发件箱失败。",
            });
        });
};
getOutboxList();

const searchInput = ref("");

const search = () => {
    const searchResult = tableData.value?.find(
        (value) => value.title == searchInput.value
    );
    tableData.value = [];
    tableData.value.push(searchResult!);
};

const resetSearch = () => {
    getOutboxList(), (searchInput.value = "");
};

// 修改
const editForm = ref<UpdateOutbox>({
    notificationID: "",
    title: "测试标题1",
    content: "测试内容1",
    status: 0,
    recipients: "",
});
const updateDialogVisible = ref(false);

// 发布
const createForm = ref<CreateOutbox>({
    title: "",
    content: "",
    status: 0,
    recipients: "",
});
const createDialogVisible = ref(false);

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
            deleteOutbox({ notificationID: data.notificationID }).then(
                (res) => {
                    if (res.success) {
                        ElMessage({
                            type: "success",
                            message: "删除成功",
                        });
                        getOutboxList();
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
const handleCreate = () => {
    createForm.value = {
        title: "",
        content: "",
        status: 0,
        recipients: "",
    };
    createDialogVisible.value = true;
};
const handleEdit = (row: Notification) => {
    updateDialogVisible.value = true;
    editForm.value = row;
};
const handleDelete = (row: Notification) => {
    deleteNotification(row);
};
</script>
