<template>
    <el-row class="tac">
        <el-col>
            <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
            >
                <el-menu-item index="1">
                    <el-icon><House /></el-icon>
                    <span>主页</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <el-icon><CirclePlus /></el-icon>
                    <span>纳新管理</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <el-icon><Refrigerator /></el-icon>
                    <span>物资管理</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <el-icon><Place /></el-icon>
                    <span>人员管理</span>
                </el-menu-item>
                <el-menu-item index="5">
                    <el-icon><Message /></el-icon>
                    <span>通知管理</span>
                </el-menu-item>
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