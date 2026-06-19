<template>

  <div class="login-page">

    <div class="login-card">

      <h1>课程作业管理系统</h1>

      <p class="subtitle">
        Welcome Back ☁️
      </p>

      <el-form
          :model="form"
      >

        <el-form-item>

          <el-input
              v-model="form.username"
              placeholder="用户名"
          />

        </el-form-item>

        <el-form-item>

          <el-input
              v-model="form.password"
              type="password"
              placeholder="密码"
          />

        </el-form-item>

        <el-button
            class="login-btn"
            type="primary"
            @click="handleLogin"
        >

          登录

        </el-button>

      </el-form>

    </div>

  </div>

</template>

<script setup>

import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { login } from '../../../src/api/auth'
import { setToken } from '../../../src/utils/auth'

const form = reactive({

  username: '',

  password: ''

})

const handleLogin = async () => {

  try {

    const res = await login(form)

    if (res.data.code === 200) {

      setToken(res.data.data)

      ElMessage.success('登录成功')

    } else {

      ElMessage.error(res.data.message)

    }

  } catch (e) {

    ElMessage.error('登录失败')

  }

}

</script>

<style scoped>

.login-page{

  height:100vh;

  display:flex;

  justify-content:center;

  align-items:center;

  background:#f7f4ef;
}

.login-card{

  width:420px;

  background:white;

  padding:50px;

  border-radius:24px;

  box-shadow:
      0 10px 30px rgba(
          0,
          0,
          0,
          0.05
      );
}

h1{

  text-align:center;

  margin-bottom:10px;

  color:#444;
}

.subtitle{

  text-align:center;

  color:#999;

  margin-bottom:30px;
}

.login-btn{

  width:100%;
}

</style>