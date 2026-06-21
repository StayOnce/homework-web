<template>

  <div class="layout">

    <aside class="sidebar">

      <div class="logo">
        ☁️ Homework
      </div>

      <el-menu
          router
          :default-active="$route.path"
          class="menu"
      >

        <el-menu-item index="/home">
          首页
        </el-menu-item>

        <el-menu-item index="/course">
          课程管理
        </el-menu-item>

        <el-menu-item index="/homework">
          作业管理
        </el-menu-item>

        <el-menu-item index="/score">
          成绩查询
        </el-menu-item>

        <el-menu-item index="/statistics">
          数据统计
        </el-menu-item>

        <el-menu-item index="/submit">
          提交记录
        </el-menu-item>

      </el-menu>

      <div
          class="logout-box"
          @click="logout"
      >
        退出登录
      </div>

    </aside>

    <main class="main">

      <router-view />

    </main>

  </div>

</template>

<script setup>

import { useRouter } from 'vue-router'
import { removeToken } from '../utils/auth'

const router = useRouter()

const logout = () => {

  removeToken()

  router.push('/login')

}

</script>

<style scoped>

.layout {

  height: 100vh;

  display: flex;

  background: #f8f5f1;
}

.sidebar {

  width: 240px;

  margin: 20px;

  border-radius: 24px;

  background: #ffffff;

  box-shadow:
      0 10px 30px rgba(
          0,
          0,
          0,
          0.05
      );

  display: flex;

  flex-direction: column;
}

.logo {

  height: 80px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 24px;

  font-weight: 600;

  color: #6b6375;
}

.menu {

  flex: 1;

  border-right: none;
}

.logout-box {

  height: 60px;

  display: flex;

  align-items: center;

  justify-content: center;

  cursor: pointer;

  color: #6b6375;

  border-top: 1px solid #f1f1f1;

  transition: all .2s;
}

.logout-box:hover {

  background: #faf8f5;

  color: #aa3bff;
}

.main {

  flex: 1;

  padding: 20px 20px 20px 0;

  overflow-y: auto;
}

</style>