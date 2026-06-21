<template>

  <div class="login-page">

    <div class="login-card">

      <h1>
        课程作业管理系统
      </h1>

      <p class="subtitle">
        Welcome Back ☁️
      </p>

      <el-form
          :model="form"
      >

        <el-form-item>

          <el-input
              v-model="form.username"
              placeholder="请输入用户名"
              size="large"
          />

        </el-form-item>

        <el-form-item>

          <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              size="large"
              show-password
          />

        </el-form-item>

        <el-form-item>

          <el-button
              type="primary"
              class="login-btn"
              @click="handleLogin"
          >

            登录

          </el-button>

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

      setToken(
          res.data.data
      )

      const infoRes =
          await getUserInfo()

      if(infoRes.data.code === 200){

        setRole(
            infoRes.data.data.role
        )

      }

      ElMessage.success(
          '登录成功'
      )

      router.push('/home')

    }

  } catch (e) {

    ElMessage.error(
        '登录失败'
    )

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

  background: #f7f4ef;

}

.login-card {

  width: 420px;

  background: white;

  padding: 50px;

  border-radius: 24px;

  box-shadow:
      0 10px 30px rgba(
          0,
          0,
          0,
          0.05
      );

}

h1 {

  text-align: center;

  color: #444;

  margin-bottom: 12px;

}

.subtitle {

  text-align: center;

  color: #999;

  margin-bottom: 30px;

}

.login-btn {

  width: 100%;

}

</style>