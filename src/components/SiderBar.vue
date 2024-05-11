<template>
    <el-row class="tac">
        <el-col>
            <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                router
            >
                <el-menu-item index="/layout/home">
                    <el-icon><House /></el-icon>
                    <span>主页</span>
                </el-menu-item>

                <el-sub-menu index="2">
                    <template #title>
                        <el-icon><Message /></el-icon>
                        <span>通知管理</span>
                    </template>
                    <el-menu-item
                        v-if="userRole >= 2"
                        index="/layout/notification/outbox"
                        >发件箱</el-menu-item
                    >
                    <el-menu-item index="/layout/notification/inbox"
                        >收件箱</el-menu-item
                    >
                </el-sub-menu>

                <el-menu-item v-if="userRole >= 2" index="/layout/member/info">
                    <el-icon><Place /></el-icon>
                    <span>人员管理</span>
                </el-menu-item>

                <el-sub-menu index="4">
                    <template #title>
                        <el-icon><Refrigerator /></el-icon>
                        <span>物资管理</span>
                    </template>
                    <el-menu-item
                        v-if="userRole >= 2"
                        index="/layout/resource/type"
                        >物资类型</el-menu-item
                    >
                    <el-menu-item
                        v-if="userRole >= 2"
                        index="/layout/resource/list"
                        >物资表</el-menu-item
                    >
                    <el-menu-item index="/layout/resource/myborrow"
                        >我的借用</el-menu-item
                    >
                </el-sub-menu>

                <el-sub-menu index="5" v-if="userRole >= 2">
                    <template #title>
                        <el-icon><CirclePlus /></el-icon>
                        <span>纳新管理</span>
                    </template>
                    <el-menu-item index="/layout/recruitment/list"
                        >纳新列表</el-menu-item
                    >
                    <el-menu-item index="/layout/recruitment/application"
                        >报名列表</el-menu-item
                    >
                </el-sub-menu>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import {
    Refrigerator,
    CirclePlus,
    House,
    Message,
    Place,
} from "@element-plus/icons-vue";
import { getUserInfo } from "../api";
import { ref } from "vue";
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};

const userRole = ref(0);

const fetchMyInfo = () => {
    getUserInfo().then((res) => {
        if (res.success) {
            console.log(res);
            userRole.value = res.data!.userRole;
            console.log(userRole.value);
        }
    });
};
fetchMyInfo();
</script>
