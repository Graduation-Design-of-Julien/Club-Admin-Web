<template>
    <h2>发送通知</h2>
    <div style="display: flex; justify-content: center; align-items: center;">
        <el-card style="width: 80%" >
            <MessageForm :messageData="NotificationForm"></MessageForm>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { Notification } from "../../types/Notification";
import MessageForm from "../../components/MessageForm.vue"

const NotificationForm = reactive<Notification>({
    notificationID: "",
    title: "",
    content: "",
    sender: "",
    createTime: new Date(),
    status: "string",
    changeTime: new Date(),
    recipients: [],
});

</script>
