<template>
    <el-container class="layout-container">
        <el-header>
            <span>流程简介</span>
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
                <el-scrollbar>
                    <div class="illustration">
                        <el-collapse v-model="activeNames">
                            <el-collapse-item title="上传图片" name="1">
                                <el-text size="large">
                                    选择侧栏中的上传图片 >> 在输入框中输入数据的相关描述 >> 点击提交数据并选择要提交的图片 >> 上传成功<br />
                                    上传成功的图片文件名将在上传框中显示。如下图所示。<br />
                                </el-text>
                                <el-image :src="img_uploadDialog" :initial-index="0" fit="contain"
                                    style="width: 85%; height: 50%" :preview-src-list="[img_uploadDialog]" />
                            </el-collapse-item>
                            <el-collapse-item title="提交记录" name="2">
                                <el-text size="large">
                                    选择侧栏中的提交记录 >> 选择要进行检测的数据 >> 点击检测按钮<br />
                                    如下图所示。<br />
                                </el-text>
                                <el-image :src="img_detect" :initial-index="0" fit="contain"
                                    style="width: 85%; height: 50%" :preview-src-list="[img_detect]" />
                            </el-collapse-item>
                            <el-collapse-item title="下载结果" name="3">
                                <el-text size="large">
                                    选择侧栏中的下载结果 >> 找到需要下载的结果（标签或数据） >> 点击下载按钮<br />
                                    如下图所示。<br />
                                </el-text>
                                <el-image :src="img_downloadRes" :initial-index="0" fit="contain"
                                    style="width: 85%; height: 50%" :preview-src-list="[img_downloadRes]" />
                            </el-collapse-item>
                            <el-collapse-item title="整体流程" name="4">
                                <el-text size="large">
                                    运行流程如下图所示；对于每个操作的结果，网页中心上方总会弹出消息提醒作为反馈信息。<br />
                                </el-text>
                                <el-image :src="img_process" :initial-index="0" fit="contain"
                                    style="width: 85%; height: 50%" :preview-src-list="[img_process]" />
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </el-scrollbar>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import SideBar from '../components/SideBar.vue';
import router from '../router';
import img_process from '@/assets/process.png';
import img_uploadDialog from '@/assets/uploadDialog.png';
import img_detect from '@/assets/detectRequest.png';
import img_downloadRes from '@/assets/downloadRes.png';
import { ref } from 'vue'

const activeNames = ref(['4']);
function handleCommand(obj) {
    if (obj.operation === 'logout') {
        window.sessionStorage.clear();
        router.push('/');
    }
}
</script>

<style>
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
    background: var(--el-color-info-light-7);
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

.el-dropdown-link {
    font-size: medium;
    color: rgb(32, 32, 32);
}

.el-dropdown {
    float: right;
    line-height: 60px;
}

.illustration {
    margin-top: 4vh;
    margin-left: 4vh;
}
</style>