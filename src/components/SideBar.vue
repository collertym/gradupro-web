<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <el-aside width="180px">
        <el-menu class="el-menu" @select="() => { }" :default-openeds="['1','2']">
            <el-sub-menu class="submenu1" index="1">
                <template #title>
                    <div class="title">选项</div>
                </template>
                <el-menu-item index="1-0">
                    <RouterLink to="/upload"><el-icon><Upload /></el-icon>上传图片</RouterLink>
                </el-menu-item>
                <el-menu-item index="1-1">
                    <RouterLink to="/record"><el-icon><Clock /></el-icon>提交记录</RouterLink>
                </el-menu-item>
                <el-menu-item index="1-2">
                    <RouterLink to="/result"><el-icon><Download /></el-icon>下载结果</RouterLink>
                </el-menu-item>
            </el-sub-menu>
            <el-sub-menu class="submenu2" index="2">
                <template #title>
                    <div class="title">其它</div>
                </template>
                <el-menu-item index="2-1">
                    <RouterLink to="/illustration"><el-icon><Document /></el-icon>流程简介</RouterLink>
                </el-menu-item>
                <el-menu-item index="2-2">
                    <RouterLink to="/about"><el-icon><Warning /></el-icon>其它问题</RouterLink>
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>

<style scoped>
a {
    width: 100%;
    height: 100%;
}

.el-menu {
    background-color: #e1e0e0;
}

.title {
    --height: 40px;
    height: var(--height);
    line-height: var(--height);
    padding-left: 5px;
    color: #2a2a2a;
    font-family: Arial, Helvetica, sans-serif;
}
</style>
