<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
const imageUrl = ref('')
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
