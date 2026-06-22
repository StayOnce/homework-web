<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="logo">
        <el-icon class="logo-icon"><Notebook /></el-icon>
        Homework
      </div>

      <el-menu router :default-active="$route.path" class="menu">
        <el-menu-item index="/dashboard" v-if="role === 'admin' || role === 'teacher' || role === 'student'">首页</el-menu-item>
        <el-menu-item index="/course" v-if="role === 'admin'">课程管理</el-menu-item>
        <el-menu-item index="/user" v-if="role === 'admin'">用户管理</el-menu-item>
        <el-menu-item index="/homework" v-if="role === 'teacher' || role === 'admin' || role === 'student'">作业管理</el-menu-item>
        <el-menu-item index="/submit" v-if="role === 'student' || role === 'admin'">提交记录</el-menu-item>
        <el-menu-item index="/grade" v-if="role === 'teacher'">批改作业</el-menu-item>
      </el-menu>

      <div class="logout-box" @click="logout">退出登录</div>
    </aside>

    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { removeToken } from '../utils/auth'
import { Notebook } from '@element-plus/icons-vue'

const router = useRouter()

const logout = () => {
  removeToken()
  router.push('/login')
}

import { getRole } from '../utils/auth'

const role = getRole()
</script>

<style scoped>
.layout {
  height: 100vh;
  display: flex;
  background: #f5f3f0;
}

.sidebar {
  width: 220px;
  margin: 24px;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
}

.logo {
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 500;
  color: #2d2d2d;
  letter-spacing: -0.5px;
}

.logo-icon {
  font-size: 24px;
}

.menu {
  flex: 1;
  border-right: none;
  background: transparent;
}

.menu :deep(.el-menu-item) {
  height: 48px;
  line-height: 48px;
  margin: 4px 12px;
  border-radius: 12px;
  color: #5a5a5a;
  font-size: 14px;
  font-weight: 400;
  background: transparent;
  transition: all 0.2s ease;
}

.menu :deep(.el-menu-item:hover) {
  background: #f8f6f3;
  color: #2d2d2d;
}

.menu :deep(.el-menu-item.is-active) {
  background: #e8e4df;
  color: #2d2d2d;
  font-weight: 500;
}

.logout-box {
  height: 56px;
  margin: 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #8a8a8a;
  font-size: 14px;
  transition: all 0.2s ease;
}

.logout-box:hover {
  background: #f8f6f3;
  color: #5a5a5a;
}

.main {
  flex: 1;
  padding: 24px 24px 24px 0;
  overflow-y: auto;
}
</style>