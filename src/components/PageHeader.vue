<template>
    <div
        style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            height: 100%;
        "
    >
        <div class="center">
            <el-image
                :src="SYS_LOGO_URL"
                style="width: 50px; height: 50px"
            ></el-image>
            <h2>社团管理系统</h2>
        </div>

        <div
            class="center"
            style="width: 120px; justify-content: space-between"
        >
            <el-button type="text" @click="handleExit"> 退出登录 </el-button>
            <el-avatar
                :size="50"
                :src="
                    userinfo?.avatarUrl
                        ? userinfo.avatarUrl
                        : DEFAULT_AVATAR_URL
                "
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { DEFAULT_AVATAR_URL, SYS_LOGO_URL } from "../config/config";
import { UserInfo } from "../types/user";
import { getUserInfo } from "../api";
import { redirectToLogin } from "../router";

const userinfo = ref<UserInfo>();

const fetchMyInfo = () => {
    getUserInfo().then((res) => {
        if (res.success) {
            userinfo.value = res.data!;
        }
    });
};
fetchMyInfo();

const logOut = () => {
    ElMessageBox.confirm("确定要退出登录吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            redirectToLogin();
        })
        .catch(() => {
            ElMessage({
                type: "info",
                message: "已取消退出登录。",
            });
        });
};

const handleExit = (row: any) => {
    logOut();
};
</script>

<style>
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
