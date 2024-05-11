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
                    <el-menu-item index="/layout/notification/outbox"
                        >发件箱</el-menu-item
                    >
                    <el-menu-item index="/layout/notification/inbox"
                        >收件箱</el-menu-item
                    >
                </el-sub-menu>

                <el-menu-item index="/layout/member/info">
                    <el-icon><Place /></el-icon>
                    <span>人员管理</span>
                </el-menu-item>

                <el-sub-menu index="4">
                    <template #title>
                        <el-icon><Refrigerator /></el-icon>
                        <span>物资管理</span>
                    </template>
                    <el-menu-item index="/layout/resource/type"
                        >物资类型</el-menu-item
                    >
                    <el-menu-item index="/layout/resource/list"
                        >物资表</el-menu-item
                    >
                    <el-menu-item index="/layout/resource/myborrow"
                        >我的借用</el-menu-item
                    >
                </el-sub-menu>

                <el-sub-menu index="5">
                    <template #title>
                        <el-icon><CirclePlus /></el-icon>
                        <span>纳新管理</span>
                    </template>
                    <el-menu-item index="/layout/recruitment/list"
                        >纳新列表</el-menu-item
                    >
                    <el-menu-item index="/layout/recruitment/application">报名列表</el-menu-item>
                </el-sub-menu>

                <el-menu-item index="6">
                    <el-icon><User /></el-icon>
                    <span>个人中心</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import {
    Refrigerator,
    CirclePlus,
    House,
    User,
    Message,
    Place,
} from "@element-plus/icons-vue";
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};
</script>
