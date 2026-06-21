<template>

  <div class="page-card">

    ```
    <div class="header">

      <h2>课程管理</h2>

      <el-button
          type="primary"
          @click="openAdd"
      >
        新增课程
      </el-button>

    </div>

    <el-table
        :data="courseList"
        border
        style="width:100%"
        empty-text="暂无课程数据"
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
          label="授课教师"
      />

      <el-table-column
          prop="description"
          label="课程描述"
      />

      <el-table-column
          label="操作"
          width="180"
      >

        <template #default="scope">

          <el-button
              size="small"
              @click="handleEdit(scope.row)"
          >
            编辑
          </el-button>

          <el-button
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
        :title="isEdit ? '编辑课程' : '新增课程'"
        width="500px"
    >

      <el-form
          :model="form"
          label-width="90px"
      >

        <el-form-item label="课程名称">

          <el-input
              v-model="form.courseName"
          />

        </el-form-item>

        <el-form-item label="课程编号">

          <el-input
              v-model="form.courseCode"
          />

        </el-form-item>

        <el-form-item label="授课教师">

          <el-select
              v-model="form.teacherId"
              placeholder="请选择教师"
              style="width:100%"
          >

            <el-option
                v-for="item in teacherList"
                :key="item.id"
                :label="item.realName"
                :value="item.id"
            />

          </el-select>

        </el-form-item>

        <el-form-item label="课程描述">

          <el-input
              type="textarea"
              :rows="4"
              v-model="form.description"
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
    ```

  </div>

</template>

<script setup>

import {
  ref,
  onMounted
} from 'vue'

import {
  getCourseList,
  addCourse,
  updateCourse,
  deleteCourse
} from '../../api/course'

import {
  getTeacherList
} from '../../api/user'

import {
  ElMessage,
  ElMessageBox
} from 'element-plus'

const courseList = ref([])

const teacherList = ref([])

const dialogVisible = ref(false)

const isEdit = ref(false)

const form = ref({

  id: null,

  courseName: '',

  courseCode: '',

  teacherId: '',

  description: ''

})

const loadData = async () => {

  const res =
      await getCourseList()

  if (res.data.code === 200) {

    courseList.value =
        res.data.data

  }

}

const loadTeacherList = async () => {

  const res =
      await getTeacherList()

  if (res.data.code === 200) {

    teacherList.value =
        res.data.data

  }

}

const openAdd = () => {

  isEdit.value = false

  form.value = {

    id: null,

    courseName: '',

    courseCode: '',

    teacherId: '',

    description: ''

  }

  dialogVisible.value = true

}

const handleEdit = (row) => {

  isEdit.value = true

  dialogVisible.value = true

  form.value = {

    id: row.id,

    courseName: row.courseName,

    courseCode: row.courseCode,

    teacherId: row.teacherId,

    description: row.description

  }

}

const submitForm = async () => {

  if (!form.value.courseName) {

    ElMessage.warning('请输入课程名称')

    return

  }

  if (!form.value.courseCode) {

    ElMessage.warning('请输入课程编号')

    return

  }

  if (!form.value.teacherId) {

    ElMessage.warning('请选择授课教师')

    return

  }

  let res

  if (isEdit.value) {

    res =
        await updateCourse(form.value)

  } else {

    res =
        await addCourse(form.value)

  }

  if (res.data.code === 200) {

    ElMessage.success(
        isEdit.value
            ? '修改成功'
            : '新增成功'
    )

    dialogVisible.value = false

    loadData()

  }

}

const handleDelete = async (id) => {

  try {

    await ElMessageBox.confirm(

        '确定删除该课程吗？',

        '提示'

    )

    const res =
        await deleteCourse(id)

    if (res.data.code === 200) {

      ElMessage.success(
          '删除成功'
      )

      loadData()

    }

  } catch (e) {

  }

}

onMounted(() => {

  loadData()

  loadTeacherList()

})

</script>

<style scoped>

.page-card {

  background: white;

  border-radius: 24px;

  padding: 24px;

  box-shadow:
      0 10px 30px rgba(
          0,
          0,
          0,
          0.05
      );

}

.header {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 24px;

}

h2 {

  margin: 0;

  color: #6b6375;

  font-size: 24px;

  font-weight: 600;

}

:deep(.el-table) {

  border-radius: 16px;

  overflow: hidden;

}

:deep(.el-button--primary) {

  background: #cdb4db;

  border-color: #cdb4db;

}

:deep(.el-button--primary:hover) {

  background: #b89ac8;

  border-color: #b89ac8;

}

</style>
