<template>
    <el-main>
        <el-scrollbar>
            <el-table :data="tableData" stripe style="width: 100%" highlight-current-row>
                <el-table-column type="index" width="80" />
                <el-table-column property="time" label="提交时间" width=200 />
                <el-table-column property="message" label="描述" width=600 />
                <el-table-column property="state" label="状态" width=200 />
                <el-table-column label="操作" width=150>
                    <template #default="scope">
                        <el-button type="primary" size="small" round @click="handleDownload(scope.row)">下载结果</el-button>
                        <el-button type="danger" size="small" round @click="handleDelete(scope.row)">删除</el-button>
                        <!-- <el-button link type="primary" size="small">Edit</el-button> -->
                    </template>
                </el-table-column>>
            </el-table>
        </el-scrollbar>
    </el-main>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'
import { long2Time, time2Long } from '../utils/transTime'
const tableData = ref([]);
axios.get('http://10.249.69.159:8080/result')
    .then((response) => {
        const res = response.data;
        if (res.code <= 0)
            ElMessage.error('Oops, this is a error, trying to reload');
        // ElMessage.info(res.data[0].description);
        for (let i = 0; i < res.data.length; i++) {
            let transfered = long2Time(res.data[i].timeStamp);
            // TypeError: Cannot read properties of undefined (reading 'timeStamp')
            tableData.value.push({ time: transfered, message: res.data[i].description, state: res.data[i].state });
        }
    }).catch((e) => {
        console.log(e)
    })

// for (let i = 1; i <= 20; i++) {
//     tableData.value.push({ time: i, message: `res : User ${i}`, state: "res" });
// }

function handleDownload(row) {
    ElMessageBox.confirm('确认下载结果吗？', '确认', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'info',
    })
        .then(() => {
            // 下载
            ElMessage({
                type: 'success',
                message: 'Downloading ...',
            })
            let timeStamp = time2Long(row.time);
            axios.get(`http://10.249.69.159:8080/downloadResults/${timeStamp}`, { headers: { 'Content-Type': 'application/json' }, responseType: 'blob' })
                .then((response) => {
                    const fileName = response.headers['content-disposition'].match(/filename="(.+)"/)[1];
                    if (response.data.code <= 0)
                        ElMessage.error('Oops, this is a error, please retry');

                    // 创建下载链接
                    const url = URL.createObjectURL(response.data);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;

                    // 模拟点击下载链接
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);

                    // 释放 Blob 对象
                    URL.revokeObjectURL(url);
                });
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Download canceled',
            })
        })
}

function handleDelete(row) {
    ElMessageBox.confirm('确认删除这条记录吗？', '警告', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
    })
        .then(() => {
            // 删除并刷新
            const timeStamp = time2Long(row.time);
            axios.delete(`http://10.249.69.159:8080/deleteResult/${timeStamp}`)
                .then((response) => { // 刷新
                    let res = response.data;
                    if (res.code < 1 || res.code > 1) {
                        ElMessage('删除请求异常！');
                        return;
                    }
                    ElMessage.success(`成功删除记录（记录时间：${row.time}）`);
                    axios.get('http://10.249.69.159:8080/result')
                        .then((response) => {
                            const res = response.data;
                            if (res.code <= 0)
                                ElMessage.error('重新加载失败，请重试！');
                            for (let i = 1; i <= res.data.length; i++) {
                                let transfered = long2Time(res.data[i].timeStamp);
                                tableData.value.push({ time: transfered, message: res.data[i].description, state: res.data[i].state });
                            }
                        })
                        .catch(e => {
                            ElMessage.error(e);
                        })
                })
                .catch(() => {
                    ElMessage.error('网络错误！');
                })
        })
}
</script>

<style scoped>
.el-table {
    padding: 0;
    flex: 1;
    position: relative;
    overflow-x: auto;
}
</style>