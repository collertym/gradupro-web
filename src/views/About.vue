<template>
    <el-container class="layout-container">
        <el-header>
            <span>其它问题</span>
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
                    <div class="attention">
                        <el-collapse v-model="activeNames">
                            <el-collapse-item title="标签含义？" name="1">
                                <el-text size="large">
                                    标签为txt文件，每个文件对应一个图片，标签文件名与图片文件名相同，只是格式不同。<br />
                                    每个标签文件中，每一行数据表示一个故障/检测框，格式为[故障种类,x,y,width,height,置信度]<br />
                                    其中，x、y、width、height含义如下图所示（单位均为像素点，小数是模型计算结果，可直接四舍五入或取整处理）。<br />
                                    故障种类用拼音表示，置信度表示检测框中包含此类故障的可能性，位于区间[0,1]，越接近1表示可能性越大。<br />
                                </el-text>
                                <el-image :src="img_xywh" :initial-index="0" fit="contain" style="width: 40%; height: 40%"
                                    :preview-src-list="[img_xywh]" />
                            </el-collapse-item>
                            <el-collapse-item title="结果图片中检测框的颜色？" name="2">
                                <el-text size="large">
                                    由于部分故障类型的实例分布可能比较密集，在检测框上标注故障类型可能会导致文本遮挡了故障。<br />
                                    所以不再标注故障类型，而是用不同颜色的检测框表示不同类型的故障，按此规则在图像上画出。<br />
                                    六种故障与六种颜色的对应关系如下<br />
                                    0.reban（热斑） ------ <el-image :src="img_rebanColor" :initial-index="0" fit="none"
                                    style="width: 20px; height: 20px" :preview-src-list="[img_rebanColor]" /><br />
                                    1.kailu（开路） ------ <el-image :src="img_kailuColor" :initial-index="0" fit="none"
                                    style="width: 20px; height: 20px" :preview-src-list="[img_kailuColor]" /><br />
                                    2.duanlu（短路） ------ <el-image :src="img_duanluColor" :initial-index="0" fit="none"
                                    style="width: 20px; height: 20px" :preview-src-list="[img_duanluColor]" /><br />
                                    3.erjiguan（二极管故障或虚焊） ------ <el-image :src="img_erjiguanColor" :initial-index="0" fit="none"
                                    style="width: 20px; height: 20px" :preview-src-list="[img_erjiguanColor]" /><br />
                                    4.zhedang（遮挡） ------ <el-image :src="img_zhedangColor" :initial-index="0" fit="none"
                                    style="width: 20px; height: 20px" :preview-src-list="[img_zhedangColor]" /><br />
                                    5.diaoluo（掉落） ------ <el-image :src="img_diaoluoColor" :initial-index="0" fit="none"
                                    style="width: 20px; height: 20px" :preview-src-list="[img_diaoluoColor]" /><br />
                                </el-text>
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
import { ref } from 'vue'
import img_xywh from '@/assets/kxywhc.png';
import img_rebanColor from '@/assets/rebanColor.png';
import img_kailuColor from '@/assets/kailuColor.png';
import img_duanluColor from '@/assets/duanluColor.png';
import img_erjiguanColor from '@/assets/erjiguanColor.png';
import img_zhedangColor from '@/assets/zhedangColor.png';
import img_diaoluoColor from '@/assets/diaoluoColor.png';

// let rebanColor = ref('#000000');
// let kailuColor = ref('#FF0000');
// let duanluColor = ref('#FF1493');
// let erjiguanColor = ref('#0000FF');
// let zhedangColor = ref('#00FF00');
// let diaoluoColor = ref('#E6E6E6');

const activeNames = ref(['1', '2']);
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

.attention {
    margin-top: 4vh;
    margin-left: 4vh;
}
</style>