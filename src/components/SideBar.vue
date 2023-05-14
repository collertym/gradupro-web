<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <el-aside width="180px">
        <el-menu @select="() => { }" >
            <el-sub-menu class="submenu1" index="1">
                <template #title>
                    <div class="title">选项</div>
                </template>
                <el-menu-item index="1-0">
                    <RouterLink to="/upload">上传</RouterLink>
                </el-menu-item>
                <el-menu-item index="1-1">
                    <RouterLink to="/record">提交记录</RouterLink>
                </el-menu-item>
                <el-menu-item index="1-2">
                    <RouterLink to="/result">结果</RouterLink>
                </el-menu-item>
            </el-sub-menu>
            <el-sub-menu class="submenu2" index="2">
                <template #title>
                    <div class="title">其它</div>
                </template>
                <el-menu-item index="2-1">
                    <RouterLink to="/illustration">流程简介</RouterLink>
                </el-menu-item>
                <el-menu-item index="2-2">
                    <RouterLink to="/about">注意事项</RouterLink>
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
    background-color: var(--el-color-info-light-9);
}

.title {
    --height: 40px;
    height: var(--height);
    line-height: var(--height);
    padding-left: 15px;
    color: var(--el-text-color-regular);
}
</style>
