<template>

  <div class="layout">

    <div class="sidebar">

      <div class="logo">

        ☁️ Homework

      </div>

      <el-menu
          router
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

      </el-menu>

    </div>

    <div class="main">

      <router-view />

    </div>

  </div>

</template>

<script setup>
</script>

<style scoped>

.layout{

  height:100vh;

  display:flex;

  background:#f7f4ef;
}

.sidebar{

  width:240px;

  background:white;

  margin:20px;

  border-radius:24px;

  box-shadow:
      0 10px 30px rgba(
          0,
          0,
          0,
          0.05
      );
}

.logo{

  height:80px;

  display:flex;

  justify-content:center;

  align-items:center;

  font-size:22px;

  font-weight:600;

  color:#555;
}

.menu{

  border:none;
}

.main{

  flex:1;

  margin:
      20px
      20px
      20px
      0;
}

</style>