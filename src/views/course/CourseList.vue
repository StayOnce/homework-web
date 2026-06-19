<template>

  <div class="page-card">

    <div class="header">

      <h2>课程管理</h2>

      <el-button
          type="primary"
          @click="dialogVisible = true"
      >
        新增课程
      </el-button>

    </div>

    <el-table
        :data="courseList"
        border
    >

      <el-table-column
          prop="courseName"
          label="课程名称"
      />

      <el-table-column
          prop="courseCode"
          label="课程编号"
      />

      <el-table-column
          prop="teacherName"
          label="教师"
      />

      <el-table-column
          prop="description"
          label="课程描述"
      />

    </el-table>

  </div>

</template>

<script setup>

import { onMounted, ref } from 'vue'

const courseList = ref([])

const dialogVisible = ref(false)

import { getCourseList }
  from '../../api/course'

onMounted(async () => {

  const res =
      await getCourseList()

  if(res.data.code === 200){

    courseList.value =
        res.data.data

  }

})

</script>

<style scoped>

.page-card{

  background:white;

  border-radius:24px;

  padding:30px;

  box-shadow:
      0 10px 30px rgba(
          0,
          0,
          0,
          0.05
      );
}

.header{

  display:flex;

  justify-content:space-between;

  margin-bottom:20px;
}

</style>