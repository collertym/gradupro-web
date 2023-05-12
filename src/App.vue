<script setup>
import { RouterView } from 'vue-router'
import SideBar from './components/SideBar.vue'
</script>

<template>
  <el-container class="layout-container">
    <el-header>数据查询</el-header>
    <el-container>
      <SideBar />
      <RouterView />
    </el-container>
  </el-container>
</template>

<style scoped>

.layout-container .el-header {
  text-align: center;
  line-height: 60px;
  position: relative;
  background-color: #6bb5fe;
  /* background-color: var(--el-color-primary-light-7); */
  color: var(--el-text-color-primary);
  align-items: center;
  box-shadow: 0 10px 5px -5px rgb(155, 159, 161);
}

.layout-container .el-container {
  height: calc(100% - 60px);
}

.layout-container .el-aside {
  background: var(--el-color-info-light-7);
}

.layout-container .el-menu {
  border-right: none;
}

.layout-container .el-main {
  padding: 0;
  flex: 1;
}

.layout-container .toolbar {
  /* display: inline-flex; */
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 0px;
}

.layout-container {
  /* top: 0;
  margin-left: 0%;
  margin-right: 0%;
  margin-bottom: 0%; */
  height: 100%;
  display: flex;
}
</style>
