<template>
    <div class="pages">
        <el-container style="height: 100%; text-decoration: center">
            <el-header class="bg-lb"><PageHeader></PageHeader></el-header>
            <el-container>
                <el-aside width="200px" class="bg-aq">
                    <SiderBar />
                </el-aside>
                <el-main class="bg-lg"><RouterView></RouterView></el-main>
            </el-container>
            <el-footer class="bg-lb"><PageFooter></PageFooter></el-footer>
        </el-container>
    </div>
</template>
<script lang="ts" setup>
import SiderBar from "../../components/SiderBar.vue";
</script>
<style scoped>
.pages {
    width: 100%;
    height: 100%;
    display: flex;
}
/* 
.bg-aq{
    background-color: aqua
}
.bg-lg{
    background-color: lightgreen
}
.bg-pi{
    background-color: pink
} */
.bg-lb {
    background-color: rgb(236, 245, 255);
}
</style>
