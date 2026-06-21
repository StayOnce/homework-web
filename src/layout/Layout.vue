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

        <!-- 管理员：课程管理 -->
        <el-menu-item
            index="/course"
            v-if="role === 'admin'"
        >
          课程管理
        </el-menu-item>

        <!-- 管理员：用户管理 -->
        <el-menu-item
            index="/user"
            v-if="role === 'admin'"
        >
          用户管理
        </el-menu-item>

        <!-- 教师/管理员：作业管理 -->
        <el-menu-item
            index="/homework"
            v-if="role === 'teacher' || role === 'admin'"
        >
          作业管理
        </el-menu-item>

        <!-- 学生：查看作业 -->
        <el-menu-item
            index="/homework"
            v-if="role === 'student'"
        >
          查看作业
        </el-menu-item>

        <!-- 教师：批改作业 -->
        <el-menu-item
            index="/grade"
            v-if="role === 'teacher'"
        >
          批改作业
        </el-menu-item>

        <!-- 学生：提交作业 -->
        <el-menu-item
            index="/submit"
            v-if="role === 'student'"
        >
          提交作业
        </el-menu-item>

        <!-- 所有人：成绩查询（学生） -->
        <el-menu-item
            index="/score"
            v-if="role === 'student'"
        >
          成绩查询
        </el-menu-item>

        <!-- 管理员/教师：数据统计 -->
        <el-menu-item
            index="/statistics"
            v-if="role === 'admin' || role === 'teacher'"
        >
          数据统计
        </el-menu-item>

        <!-- 管理员：查看所有提交记录 -->
        <el-menu-item
            index="/submit"
            v-if="role === 'admin'"
        >
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

import {
  getRole
} from '../utils/auth'

const role =
    getRole()

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