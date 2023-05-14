<template>
    <el-container class="layout-container">
        <el-header>上传记录</el-header>
        <el-container>
            <SideBar />
            <el-main>
                <el-scrollbar>
                    <el-table :data="tableData" stripe style="width: 100%" highlight-current-row>
                        <el-table-column type="index" width="80" />
                        <el-table-column property="time" label="提交时间" width=200 />
                        <el-table-column property="message" label="描述" width=600 />
                        <el-table-column property="state" label="状态" width=200 />
                        <el-table-column label="操作" width=150>
                            <template #default="scope">
                                <el-button type="primary" size="small" round
                                    @click="handleDetect(scope.row)">进行检测</el-button>
                                <el-button type="danger" size="small" round @click="handleDelete(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-scrollbar>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'
import { long2Time, time2Long } from '../utils/transTime'
import SideBar from '../components/SideBar.vue'
const tableData = ref([]);
// const isDisabled = ref(true);
axios.get('http://10.249.69.159:8080/record', { headers: { 'Authorization': window.sessionStorage.getItem('token') } })
    .then((response) => {
        const res = response.data;
        if (res.code <= 0) {
            ElMessage.error('Oops, this is a error, trying to reload');
        }
        if (res.data)
        for (let i = 0; i < res.data.length; i++) {
            let transfered = long2Time(res.data[i].timeStamp);
            // TypeError: Cannot read properties of undefined (reading 'timeStamp')
            tableData.value.push({ time: transfered, message: res.data[i].description, state: res.data[i].state });
        }
    })
    .catch(e => {
        ElMessage.error('' + e);
    });
// for (let i = 1; i <= 20; i++) {
//     tableData.value.push({ time: i, message: `init : User ${i}`, state: "init" });
// }

function handleDetect(row) {
    // console.log(time2Long(row.time));
    let token = window.sessionStorage.getItem('token');
    ElMessageBox.confirm('确认进行检测吗？', '提示', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'info',
    })
        .then(() => {
            // 提交预测请求，添加记录请求
            // let data = { timeStamp: time2Long(row.time) };
            // let formData = new FormData();
            // formData.append(data);
            // let data1 = time2Long(row.time);
            axios.put('http://10.249.69.159:8080/detect', time2Long(row.time), { headers: { 'Content-Type': 'application/json', 'Authorization': token} })
                .then((response) => {
                    const res = response.data;
                    console.log(res);
                    // if (res.code <= 0)
                    //     ElMessage.error('Oops, this is a error, trying to reload');
                    // tableData.value = res.data;
                })
                .catch(e => {
                    ElMessage.error(e);
                })
            ElMessage({
                type: 'success',
                message: 'Detect request submitted',
            })
            // row.state = '已提交';
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Detect canceled',
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
            axios.delete(`http://10.249.69.159:8080/deleteUpload/${timeStamp}`, { headers: { 'Authorization': window.sessionStorage.getItem('token') } })
                .then((response) => {// 刷新
                    let res = response.data;
                    if (res.code < 1 || res.code > 1) {
                        ElMessage.error('删除请求异常！');
                        return;
                    }
                    ElMessage.success(`成功删除记录（记录时间：${row.time}）`);
                    axios.get('http://10.249.69.159:8080/record', { headers: { 'Authorization': window.sessionStorage.getItem('token') } })
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
.el-header {
    text-align: center;
    line-height: 60px;
    position: relative;
    background-color: #6bb5fe;
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

.el-table {
    padding: 0;
    flex: 1;
    position: relative;
    overflow-x: auto;
    overflow-y: auto;
}
</style>