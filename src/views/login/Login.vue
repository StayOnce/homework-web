<template>
  <div class="login-page">
    <div class="login-card">
      <h1>课程作业管理系统</h1>
      <p class="subtitle">Welcome Back</p>

      <el-form :model="form">
        <el-form-item>
          <el-input v-model="form.username" placeholder="请输入用户名" size="large" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" type="password" placeholder="请输入密码" size="large" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { onMounted } from 'vue'

import { login, getUserInfo } from '../../api/auth'
import { setToken, setRole } from '../../utils/auth'
import { getToken } from '../../utils/auth'

const router = useRouter()

const form = reactive({
  username: '',
  password: ''
})

const handleLogin = async () => {
  if (!form.username) {
    ElMessage.warning('请输入用户名')
    return
  }

  if (!form.password) {
    ElMessage.warning('请输入密码')
    return
  }

  try {
    const res = await login(form)

    if (res.data.code === 200) {
      setToken(res.data.data)

      const infoRes = await getUserInfo()

      if(infoRes.data.code === 200){
        setRole(infoRes.data.data.role)
      }

      ElMessage.success('登录成功')

      router.push('/dashboard')
    }
  } catch (e) {
    ElMessage.error('登录失败')
  }
}
</script>

<style scoped>
.login-page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f3f0;
}

.login-card {
  width: 380px;
  background: #ffffff;
  padding: 48px 40px;
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

h1 {
  text-align: center;
  color: #2d2d2d;
  margin-bottom: 12px;
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -0.5px;
}

.subtitle {
  text-align: center;
  color: #8a8a8a;
  margin-bottom: 32px;
  font-size: 14px;
}

.login-btn {
  width: 100%;
  height: 48px;
  border-radius: 12px;
  background: #2d2d2d;
  border: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.login-btn:hover {
  background: #3d3d3d;
}

.login-btn:active {
  background: #1d1d1d;
}

.login-card :deep(.el-input__wrapper) {
  border-radius: 12px;
  box-shadow: none;
  border: 1px solid #e8e4df;
  padding: 12px 16px;
  transition: all 0.2s ease;
}

.login-card :deep(.el-input__wrapper:hover) {
  border-color: #d8d4cf;
}

.login-card :deep(.el-input__wrapper.is-focus) {
  border-color: #2d2d2d;
}

.login-card :deep(.el-input__inner) {
  color: #2d2d2d;
  font-size: 14px;
}

.login-card :deep(.el-input__inner::placeholder) {
  color: #8a8a8a;
}
</style>