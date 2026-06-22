<template>

  <div class="page-card">

    <div class="header">

      <h2>作业管理</h2>

      <el-button
          v-if="role === 'teacher'"
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
              v-else-if="scope.row.status === '已完成'"
              type="primary"
          >
            已完成
          </el-tag>

          <el-tag
              v-else-if="scope.row.status === '已截止'"
              type="danger"
          >
            已截止
          </el-tag>

          <el-tag
              v-else
              type="info"
          >
            未发布
          </el-tag>

        </template>

      </el-table-column>

      <el-table-column
          label="操作"
          width="160"
          v-if="role !== 'admin'"
      >

        <template #default="scope">

          <el-button
              v-if="role === 'teacher'"
              size="small"
              style="margin-right: 8px;"
              @click="openEditDialog(scope.row)"
          >
            编辑
          </el-button>

          <el-button
              v-if="role === 'teacher'"
              type="danger"
              size="small"
              @click="handleDelete(scope.row.id)"
          >
            删除
          </el-button>

          <el-button
              v-if="role === 'student' && scope.row.status === '进行中'"
              type="primary"
              size="small"
              @click="openSubmitDialog(scope.row)"
          >
            提交
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
              value-format="YYYY-MM-DDTHH:mm:ss"
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
            @click="handleAddHomework"
        >
          确定
        </el-button>

      </template>

    </el-dialog>

    <el-dialog
        v-model="submitDialogVisible"
        title="提交作业"
        width="600px"
    >

      <el-form
          :model="submitForm"
          label-width="100px"
      >

        <el-form-item label="作业标题">

          <el-input
              v-model="submitForm.homeworkTitle"
              disabled
          />

        </el-form-item>

        <el-form-item label="提交内容">

          <el-input
              type="textarea"
              :rows="5"
              v-model="submitForm.submitContent"
              placeholder="请输入作业内容"
          />

        </el-form-item>

      </el-form>

      <template #footer>

        <el-button
            @click="submitDialogVisible = false"
        >
          取消
        </el-button>

        <el-button
            type="primary"
            @click="handleSubmit"
        >
          确定
        </el-button>

      </template>

    </el-dialog>

    <el-dialog
        v-model="editDialogVisible"
        title="编辑作业"
        width="600px"
    >
      <el-form
          :model="editForm"
          label-width="100px"
      >
        <el-form-item label="作业标题">
          <el-input v-model="editForm.title" />
        </el-form-item>
        <el-form-item label="作业内容">
          <el-input
              type="textarea"
              :rows="5"
              v-model="editForm.content"
          />
        </el-form-item>
        <el-form-item label="截止时间">
          <el-date-picker
              v-model="editForm.deadline"
              type="datetime"
              value-format="YYYY-MM-DDTHH:mm:ss"
              style="width:100%"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEditHomework">确定</el-button>
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
  deleteHomework,
  updateHomework
} from '../../api/homework'

import {
  getCourseList
} from '../../api/course'

import {
  submitHomework
} from '../../api/submit'

const homeworkList = ref([])

const courseList = ref([])

const dialogVisible = ref(false)

const submitDialogVisible = ref(false)

const form = ref({

  title: '',

  content: '',

  courseId: '',

  deadline: ''

})

const submitForm = ref({

  homeworkId: null,

  homeworkTitle: '',

  submitContent: ''

})

const editDialogVisible = ref(false)

const editForm = ref({
  id: null,
  title: '',
  content: '',
  deadline: ''
})

const openEditDialog = (row) => {
  editForm.value = {
    id: row.id,
    title: row.title,
    content: row.content,
    deadline: row.deadline
  }
  editDialogVisible.value = true
}

const handleEditHomework = async () => {
  if (!editForm.value.title) {
    ElMessage.warning('请输入作业标题')
    return
  }
  const res = await updateHomework(editForm.value)
  if (res.data.code === 200) {
    ElMessage.success('修改成功')
    editDialogVisible.value = false
    loadHomework()
  } else {
    ElMessage.error(res.data.message)
  }
}

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

const handleAddHomework = async () => {
  if (!form.value.title) {
    ElMessage.warning('请输入作业标题')
    return
  }
  if (!form.value.content) {
    ElMessage.warning('请输入作业内容')
    return
  }
  if (!form.value.courseId) {
    ElMessage.warning('请选择关联课程')
    return
  }

  const data = {
    ...form.value,
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

const openSubmitDialog = (row) => {

  submitForm.value = {

    homeworkId: row.id,

    homeworkTitle: row.title,

    submitContent: ''

  }

  submitDialogVisible.value = true

}

const handleSubmit = async () => {

  if (!submitForm.value.submitContent) {

    ElMessage.warning('请输入提交内容')

    return

  }

  const res =
      await submitHomework({

        homeworkId: submitForm.value.homeworkId,

        submitContent: submitForm.value.submitContent

      })

  if(res.data.code === 200){

    ElMessage.success('提交成功')

    submitDialogVisible.value = false

  }else{

    ElMessage.error(res.data.message)

  }

}

onMounted(() => {

  loadHomework()

  loadCourse()

})

import {
  getRole
} from '../../utils/auth'

const role =
    getRole()

</script>

<style scoped>

.page-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

h2 {
  margin: 0;
  color: #2d2d2d;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.5px;
}

:deep(.el-table) {
  border-radius: 12px;
  overflow: hidden;
}

:deep(.el-table th) {
  background: #f8f6f3;
  color: #5a5a5a;
  font-weight: 500;
  font-size: 13px;
}

:deep(.el-table td) {
  color: #2d2d2d;
  font-size: 14px;
}

:deep(.el-table--border) {
  border: 1px solid #e8e4df;
}

:deep(.el-table--border th) {
  border-color: #e8e4df;
}

:deep(.el-table--border td) {
  border-color: #e8e4df;
}

:deep(.el-button--primary) {
  background: #2d2d2d;
  border-color: #2d2d2d;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;
}

:deep(.el-button--primary:hover) {
  background: #3d3d3d;
  border-color: #3d3d3d;
}

:deep(.el-button--default) {
  border-radius: 8px;
  font-size: 13px;
  border-color: #e8e4df;
  color: #5a5a5a;
}

:deep(.el-button--default:hover) {
  border-color: #d8d4cf;
  color: #2d2d2d;
}

:deep(.el-button--danger) {
  border-radius: 8px;
  font-size: 13px;
  background: #fff;
  border-color: #e8e4df;
  color: #8a8a8a;
}

:deep(.el-button--danger:hover) {
  background: #fef7ed;
  border-color: #fde9d9;
  color: #d97706;
}

:deep(.el-tag--success) {
  background: #f0fdf4;
  border-color: #dcfce7;
  color: #16a34a;
}

:deep(.el-tag--primary) {
  background: #eff6ff;
  border-color: #dbeafe;
  color: #2563eb;
}

:deep(.el-tag--danger) {
  background: #fef2f2;
  border-color: #fee2e2;
  color: #dc2626;
}

:deep(.el-tag--info) {
  background: #f8f6f3;
  border-color: #e8e4df;
  color: #5a5a5a;
}

:deep(.el-dialog) {
  border-radius: 16px;
}

:deep(.el-dialog__header) {
  padding: 20px 24px;
}

:deep(.el-dialog__title) {
  color: #2d2d2d;
  font-weight: 500;
  font-size: 16px;
}

:deep(.el-dialog__body) {
  padding: 24px;
}

:deep(.el-dialog__footer) {
  padding: 16px 24px;
}

:deep(.el-form-item__label) {
  color: #5a5a5a;
  font-size: 13px;
  font-weight: 400;
}

:deep(.el-input__wrapper) {
  border-radius: 8px;
  box-shadow: none;
  border: 1px solid #e8e4df;
  transition: all 0.2s ease;
}

:deep(.el-input__wrapper:hover) {
  border-color: #d8d4cf;
}

:deep(.el-input__wrapper.is-focus) {
  border-color: #2d2d2d;
}

:deep(.el-select .el-input__wrapper) {
  border-radius: 8px;
}

:deep(.el-textarea__inner) {
  border-radius: 8px;
  border: 1px solid #e8e4df;
  transition: all 0.2s ease;
}

:deep(.el-textarea__inner:hover) {
  border-color: #d8d4cf;
}

:deep(.el-textarea__inner:focus) {
  border-color: #2d2d2d;
}

</style>