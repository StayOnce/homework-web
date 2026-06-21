<template>

  <div class="page-card">

    <div class="header">

      <h2>作业管理</h2>

      <el-button
          type="primary"
          @click="dialogVisible = true"
      >
        新增作业
      </el-button>

    </div>

    <el-table
        :data="homeworkList"
        border
        style="width:100%"
    >

      <el-table-column
          prop="title"
          label="作业标题"
      />

      <el-table-column
          prop="courseName"
          label="所属课程"
      />

      <el-table-column
          prop="teacherName"
          label="发布教师"
      />

      <el-table-column
          prop="deadline"
          label="截止时间"
      />

      <el-table-column
          prop="status"
          label="状态"
      >

        <template #default="scope">

          <el-tag
              v-if="scope.row.status === '进行中'"
              type="success"
          >
            进行中
          </el-tag>

          <el-tag
              v-else
              type="info"
          >
            已结束
          </el-tag>

        </template>

      </el-table-column>

      <el-table-column
          label="操作"
          width="120"
      >

        <template #default="scope">

          <el-button
              type="danger"
              size="small"
              @click="handleDelete(scope.row.id)"
          >
            删除
          </el-button>

        </template>

      </el-table-column>

    </el-table>

    <el-dialog
        v-model="dialogVisible"
        title="新增作业"
        width="600px"
    >

      <el-form
          :model="form"
          label-width="100px"
      >

        <el-form-item label="作业标题">

          <el-input
              v-model="form.title"
          />

        </el-form-item>

        <el-form-item label="所属课程">

          <el-select
              v-model="form.courseId"
              style="width:100%"
          >

            <el-option
                v-for="item in courseList"
                :key="item.id"
                :label="item.courseName"
                :value="item.id"
            />

          </el-select>

        </el-form-item>

        <el-form-item label="作业内容">

          <el-input
              type="textarea"
              :rows="5"
              v-model="form.content"
          />

        </el-form-item>

        <el-form-item label="截止时间">

          <el-date-picker
              v-model="form.deadline"
              type="datetime"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width:100%"
          />

        </el-form-item>

      </el-form>

      <template #footer>

        <el-button
            @click="dialogVisible = false"
        >
          取消
        </el-button>

        <el-button
            type="primary"
            @click="submitForm"
        >
          确定
        </el-button>

      </template>

    </el-dialog>

  </div>

</template>

<script setup>

import {
  ref,
  onMounted
} from 'vue'

import {
  ElMessage
} from 'element-plus'

import {
  getHomeworkList,
  addHomework,
  deleteHomework
} from '../../api/homework'

import {
  getCourseList
} from '../../api/course'

const homeworkList = ref([])

const courseList = ref([])

const dialogVisible = ref(false)

const form = ref({

  title: '',

  content: '',

  courseId: '',

  deadline: ''

})

const loadHomework = async () => {

  const res =
      await getHomeworkList()

  if(res.data.code === 200){

    homeworkList.value =
        res.data.data

  }

}

const loadCourse = async () => {

  const res =
      await getCourseList()

  if(res.data.code === 200){

    courseList.value =
        res.data.data

  }

}

const submitForm = async () => {

  const data = {

    ...form.value,

    publishTime:
        new Date()
            .toISOString()
            .slice(0,19)
            .replace('T',' '),

    status:'进行中'

  }

  const res =
      await addHomework(data)

  if(res.data.code === 200){

    ElMessage.success(
        '新增成功'
    )

    dialogVisible.value = false

    loadHomework()

  }

}

const handleDelete = async (id) => {

  const res =
      await deleteHomework(id)

  if(res.data.code === 200){

    ElMessage.success(
        '删除成功'
    )

    loadHomework()

  }else{

    ElMessage.error(
        res.data.message
    )

  }

}

onMounted(() => {

  loadHomework()

  loadCourse()

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

  display:flex;

  justify-content:space-between;

  align-items:center;

  margin-bottom:24px;

}

h2{

  margin:0;

  color:#6b6375;

}

:deep(.el-button--primary){

  background:#cdb4db;

  border-color:#cdb4db;

}

</style>