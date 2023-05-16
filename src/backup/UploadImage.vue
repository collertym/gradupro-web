<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
const imageUrl = ref('')
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

<template>
    <el-main>
        <div style="display: flex; justify-content: center; align-items: center;" >
            <el-upload class="avatar-uploader" action="" :show-file-list="false" >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>
        </div>
    </el-main>
</template>
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
<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.avatar-uploader>>>.el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    background-color: var(--el-color-info-light-9);
}

.avatar-uploader>>>.el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
