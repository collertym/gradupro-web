<!-- eslint-disable vue/no-deprecated-v-bind-sync -->
<template>
    <el-main>
        <div>
            <el-input class="inputDescription" v-model="textarea" type="textarea" placeholder="数据描述" clearable autosize />
        </div>
        <el-button class="callDiaButton" type="primary" size="large" plain @click="showDialog">上传</el-button>
        <div class="el-upload__tip" slot="tip">只能上传jpg文件，且不超过2GB</div>
        <!-- <el-dialog title="请再次确认" :v-model="dialogVisible" width="30%">
            <span>确定要开始上传图片吗？（上传完毕前请勿关闭网页）</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-upload class="uploadButton" name="images" v-model:file-list="fileList"
                        action="http://10.249.69.159:8080/upload" multiple :limit="2000" show-file-list=true
                        :data="{ time: Date.now(), description: textarea }">
                        <el-button type="primary" size="large" round @click="dialogVisible = false">确认上传</el-button>
                    </el-upload>
                </span>
            </template>
        </el-dialog> -->
        <el-dialog title="选择数据" v-model="dialogVisible" width="40%">
            <el-upload class="upload" drag action="http://10.249.69.159:8080/upload" multiple
                :limit="2000" :show-file-list="true" name="images" :data="{ timeStamp: Date.now(), description: textarea }"
                :on-error="handleError">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg文件，且不超过2GB</div>
            </el-upload>
            <template #footer>
                <span class="dialog-footer">
                    <el-button size="large" round @click="hidDialog">取 消</el-button>
                    <!-- <el-button type="primary" size="large" round @click="hidDialog">确 定</el-button> -->
                </span>
            </template>
        </el-dialog>
    </el-main>
</template>
  
<script setup>
// import axios from 'axios'
// import { ElMessage, ElMessageBox } from 'element-plus'
import { ElMessage } from 'element-plus';
import { ref } from 'vue'
const textarea = ref('');
const dialogVisible = ref(false);
function showDialog() {
    dialogVisible.value = true;
}
function hidDialog() {
    dialogVisible.value = false;
}
function handleError(error) {
    ElMessage.error(error + ',' + "上传失败!")
}
// const handleUpload = () => {
//     ElMessageBox.confirm('确认上传吗？', 'confirm', {
//         confirmButtonText: 'OK',
//         cancelButtonText: 'Cancel',
//         type: 'info',
//     })
//         .then(() => {
            // 发送post请求
            // axios.post('http://10.249.69.159:8080/upload', {
            //     time: Date.now(),
            //     description: textarea
            // })
            //     .then((response) => {
            //         let res = response.data;
            //         console.log(res);
            //     })
            //     .catch(error => console.error(error));
            // if(textarea.value === '') {
            //     ElMessage.error("数据描述不能为空。");
            //     return;
            // }
            // ElMessage({
            //     type: 'success',
            //     message: '开始上传...',
            // })
            // textarea.value = ''
//         })
//         .catch(() => {
//             ElMessage({
//                 type: 'info',
//                 message: 'Upload canceled',
//             })
//         })
// }
</script>

<style scoped>
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

/* .inputFiles {
    margin-top: 40px;
    margin: 10px;
    max-width: 700px;
} */

.callDiaButton {
    margin-left: 40px;
}
</style>