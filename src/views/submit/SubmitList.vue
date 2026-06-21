<template>

  <div class="page-card">

    <div class="header">

      <h2>提交记录</h2>

    </div>

    <el-table
        :data="submitList"
        border
        style="width:100%"
    >

      <el-table-column
          prop="studentName"
          label="学生"
          width="120"
      />

      <el-table-column
          prop="courseName"
          label="课程"
      />

      <el-table-column
          prop="homeworkTitle"
          label="作业"
      />

      <el-table-column
          prop="submitTime"
          label="提交时间"
          width="180"
      />

      <el-table-column
          label="批改状态"
          width="120"
      >

        <template #default="scope">

          <el-tag
              v-if="scope.row.gradeStatus === 'GRADED'"
              type="success"
          >
            已批改
          </el-tag>

          <el-tag
              v-else
              type="warning"
          >
            待批改
          </el-tag>

        </template>

      </el-table-column>

      <el-table-column
          prop="score"
          label="成绩"
          width="100"
      />

      <el-table-column
          label="提交内容"
      >

        <template #default="scope">

          <el-popover
              placement="top"
              width="400"
              trigger="click"
          >

            <template #reference>

              <el-button
                  type="primary"
                  size="small"
              >
                查看
              </el-button>

            </template>

            <div>

              {{ scope.row.submitContent }}

            </div>

          </el-popover>

        </template>

      </el-table-column>

    </el-table>

  </div>

</template>

<script setup>

import {
  ref,
  onMounted
} from 'vue'

import {
  getSubmitList
} from '../../api/submit'

const submitList = ref([])

const loadData = async () => {

  const res =
      await getSubmitList()

  if(res.data.code === 200){

    submitList.value =
        res.data.data

  }

}

onMounted(() => {

  loadData()

})

</script>

<style scoped>

.page-card{

  background:white;

  border-radius:24px;

  padding:24px;

  box-shadow:
      0 10px 30px rgba(
          0,
          0,
          0,
          0.05
      );

}

.header{

  margin-bottom:24px;

}

h2{

  margin:0;

  color:#6b6375;

}

</style>