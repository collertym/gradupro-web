<!-- eslint-disable vue/no-deprecated-v-bind-sync -->
<template>
    <el-container class="layout-container">
        <el-header>
            <span>上传数据</span>
            <span class="toolbar">
                <el-dropdown class="el-dropdown" @command="handleCommand">
                    <span class="el-dropdown-link">
                        账户设置<el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item :command="{ operation: 'logout' }">
                                <el-icon>
                                    <CircleClose />
                                </el-icon>退出登陆
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </span>
        </el-header>
        <el-container>
            <SideBar />
            <el-main>
                <div>
                    <el-input class="inputDescription" v-model="textarea" type="textarea" placeholder="数据描述" clearable
                        autosize />
                </div>
                <el-button class="callDiaButton" type="primary" size="large" plain @click="showDialog">上传图片</el-button>
                <div class="el-upload__tip" slot="tip">只能上传jpg文件，且不超过2GB</div>
                <el-dialog title="选择数据" v-model="dialogVisible" width="40%">
                    <el-upload class="upload" drag action="http://10.249.69.159:8080/upload" multiple :limit="2000"
                        :show-file-list="true" name="images" :data="{ timeStamp: Date.now(), description: textarea }"
                        :on-error="handleError" :headers="{ Authorization: token }">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg文件，且不超过2GB</div>
                    </el-upload>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button size="large" round @click="hidDialog">关 闭</el-button>
                            <!-- <el-button type="primary" size="large" round @click="hidDialog">确 定</el-button> -->
                        </span>
                    </template>
                </el-dialog>
            </el-main>
        </el-container>
    </el-container>
</template>
  
<script setup>
// import axios from 'axios'
// import { ElMessage, ElMessageBox } from 'element-plus'
import { ElMessage } from 'element-plus';
import { ref } from 'vue'
import SideBar from '../components/SideBar.vue'
import router from '../router';
const textarea = ref('');
const dialogVisible = ref(false);
const token = window.sessionStorage.getItem("token");
function showDialog() {
    dialogVisible.value = true;
}
function hidDialog() {
    dialogVisible.value = false;
}
function handleError(error) {
    ElMessage.error(error + ',' + "上传失败!")
}
function handleCommand(obj) {
    if (obj.operation === 'logout') {
        window.sessionStorage.clear();
        router.push('/');
    }
}
</script>

<style scoped>
.el-header {
    text-align: center;
    line-height: 60px;
    position: relative;
    background-color: #74baff;
    color: var(--el-text-color-primary);
    align-items: center;
    box-shadow: 0 10px 5px -5px rgb(155, 159, 161);
}

.el-container {
    height: calc(100% - 60px);
}

.el-aside {
    background: var(--el-color-info-light-8);
}

.el-menu {
    border-right: none;
}

.el-main {
    padding: 0;
    flex: 1;
}

.toolbar {
    /* display: inline-flex; */
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 50px;
}

.layout-container {
    /* top: 0;
  margin-left: 0%;
  margin-right: 0%;
  margin-bottom: 0%; */
    height: 100%;
    display: flex;
}

.inputDescription {
    /* margin-top: 40px; */
    margin-top: 40px;
    margin-left: 40px;
    margin-bottom: 10px;
    max-width: 900px;
    min-width: 600px;
    /* min-height: 300px; */
}

.el-dialog__header {
    background: #EBEEF5;
    border-bottom: 1px solid#EBEEF5;
}

.el-upload__tip {
    margin-left: 40px;
    margin-top: 10px;
    /* width: 200px; */
    /* background-color: rgb(211, 211, 211); */
    /* border-radius: 5%; */
}

.callDiaButton {
    margin-left: 40px;
}

.el-dropdown-link {
    font-size: medium;
    color: rgb(32, 32, 32);
}

.el-dropdown {
    float: right;
    line-height: 60px;
}
</style>