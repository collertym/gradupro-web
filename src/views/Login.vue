<template>
  <div :xl="6" :lg="7" class="bg-login">
    <!--logo-->
    <!-- <el-image :src="require('@/assets/logo.png')" class="logo" /> -->
    <!--标题-->
    <el-row type="flex" class="row-bg row-two" justify="center" align="middle">
      <el-col :span="6"></el-col>
      <el-col :span="6">
        <!--标题-->
        <h1 class="title">光伏板故障检测系统登陆</h1>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
    <!--form表单-->
    <el-row type="flex" class="row-bg card" justify="center" align="bottom">
      <el-col :span="7" class="login-card">
        <!--loginForm-->
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="21%" class="loginForm">
          <el-form-item label="账户" prop="username" style="width: 100%">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="width: 100%">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item class="btn-ground">
            <el-button type="primary" @click="submitForm('loginForm')">立即登陆</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
            <el-button type="primary" @click="handinForm('loginForm')">注册</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
  
<script>
import { ElMessage } from 'element-plus';
import router from "../router";
import axios from 'axios';

export default {
  name: "Login",
  data() {
    return {
      // 表单信息
      loginForm: {
        // 账户数据
        username: '',
        // 密码数据
        password: '',
        // 验证码的key，因为前后端分离，这里验证码不能由后台存入session，所以交给vue状态管理
        // codeToken: ''
      },
      // 表单验证
      rules: {
        // 设置账户效验规则
        username: [
          { required: true, message: '请输入账户', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符的账户', trigger: 'blur' }
        ],
        // 设置密码效验规则
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符的密码', trigger: 'blur' }
        ]
      },
    };
  },
  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 表单验证成功
          axios.post('http://10.249.69.159:8080/login', this.loginForm).then(response => {
            // 拿到结果
            let res = response.data;
            let message = res.msg;
            // res.data就是服务器返回的token
            let token = res.data;
            // 判断结果
            if (res.code === 1) {
              // 登陆成功
              ElMessage.success("登陆成功");
              // 保存token，跳转页面
              window.sessionStorage.setItem('token', token);
              router.push('/record');
            } else {
              /*打印错误信息*/
              ElMessage.error(message);
            }
          }).catch(() => {
            ElMessage.error("网络错误，登陆失败");
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 提交表单
    handinForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 表单验证成功
          axios.post('http://10.249.69.159:8080/register', this.loginForm).then(response => {
            // 拿到结果
            let res = response.data;
            let message = res.msg;
            // res.data就是服务器返回的token
            let token = res.data;
            // 判断结果
            if (res.code === 1) {
              // 登陆成功
              ElMessage.success(message);
              // 保存token，跳转页面
              window.sessionStorage.setItem('token', token);
              router.push('/record');
            } else {
              /*打印错误信息*/
              ElMessage.error(message);
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 获取验证码方法
    // getVerifyCodeImg() {
    //   /*获取验证码*/
    //   this.$axios.get('/getVerifyCode').then(res => {
    //     // 获取验证码key
    //     this.loginForm.codeToken = res.data.data.codeToken;
    //     // 获取验证码图片
    //     this.codeImg = res.data.data.codeImg;
    //   })
    // }
  },
  // created() {
  //   // 页面渲染完成后执行获取验证码方法
  //   this.getVerifyCodeImg();
  // }
}
</script>
  
<style scoped>
.codeImg {
  /*让验证码图片飘在右边*/
  float: right;
  /*设置一些圆角边框*/
  border-radius: 3px;
  /*设置宽度*/
  width: 26%;
}

.bg-login {
  height: 100%;
  background-image: url("../assets/login-background.jpg");
  background-size: 120%;
}

.btn-ground {
  text-align: center;
}

/* .logo {
    margin: 30px;
    height: 70px;
    width: 70px;
    position: fixed;
} */

.title {
  text-shadow: -2px 2px 1px #5f565e;
  text-align: center;
  margin-top: 60%;
  color: #59b0d3;
  font-size: 25px;
}

.login-card {
  background-color: #ffffff;
  opacity: 0.9;
  box-shadow: 0 0 10px #ffffff;
  border-radius: 10px;
  padding: 40px 40px 30px 15px;
  width: auto;
}
</style>