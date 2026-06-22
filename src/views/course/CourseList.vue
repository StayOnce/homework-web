<template>
  <div class="page-card">
    <div class="header">
      <h2>课程管理</h2>
      <el-button v-if="role === 'admin'" type="primary" @click="openAdd">新增课程</el-button>
    </div>

    <el-table :data="courseList" border style="width:100%" empty-text="暂无课程数据">
      <el-table-column prop="courseName" label="课程名称" />
      <el-table-column prop="courseCode" label="课程编号" />
      <el-table-column prop="teacherName" label="授课教师" />
      <el-table-column prop="description" label="课程描述" />
      <el-table-column label="操作" width="240" v-if="role === 'admin'">
        <template #default="scope">
          <el-button type="primary" size="small" style="margin-right: 8px;" @click="openStudentDialog(scope.row)">管理学生</el-button>
          <el-button size="small" style="margin-right: 8px;" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑课程' : '新增课程'" width="500px">
      <el-form :model="form" label-width="90px">
        <el-form-item label="课程名称">
          <el-input v-model="form.courseName" />
        </el-form-item>
        <el-form-item label="课程编号">
          <el-input v-model="form.courseCode" />
        </el-form-item>
        <el-form-item label="授课教师">
          <el-select v-model="form.teacherId" placeholder="请选择教师" style="width:100%">
            <el-option v-for="item in teacherList" :key="item.id" :label="item.realName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="课程描述">
          <el-input type="textarea" :rows="4" v-model="form.description" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="studentDialogVisible" title="管理学生" width="800px">
      <div class="student-dialog">
        <div class="student-section">
          <h4>已选学生</h4>
          <div class="student-list">
            <div v-for="student in courseStudents" :key="student.id" class="student-item">
              <div class="student-info">
                <span class="student-name">{{ student.realName }}</span>
                <span class="student-username">{{ student.username }}</span>
              </div>
              <el-button type="danger" size="small" @click="removeStudent(student.id)">移除</el-button>
            </div>
            <div v-if="courseStudents.length === 0" class="empty">暂无已选学生</div>
          </div>
        </div>
        <div class="student-divider"></div>
        <div class="student-section">
          <h4>可添加学生</h4>
          <div class="student-search">
            <el-input v-model="studentSearch" placeholder="搜索学生" clearable />
          </div>
          <div class="student-list">
            <div v-for="student in filteredUnassignedStudents" :key="student.id" class="student-item">
              <div class="student-info">
                <span class="student-name">{{ student.realName }}</span>
                <span class="student-username">{{ student.username }}</span>
              </div>
              <el-button type="primary" size="small" @click="addStudent(student.id)">添加</el-button>
            </div>
            <div v-if="filteredUnassignedStudents.length === 0" class="empty">暂无可添加学生</div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getCourseList, addCourse, updateCourse, deleteCourse, getCourseStudents, addCourseStudent, removeCourseStudent, getUnassignedStudents } from '../../api/course'
import { getTeacherList } from '../../api/user'
import { ElMessage, ElMessageBox } from 'element-plus'

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
  const res = await getCourseList()
  if (res.data.code === 200) {
    courseList.value = res.data.data
  }
}

const loadTeacherList = async () => {
  const res = await getTeacherList()
  if (res.data.code === 200) {
    teacherList.value = res.data.data
  }
}

const studentDialogVisible = ref(false)
const currentCourseId = ref(null)
const unassignedStudents = ref([])
const courseStudents = ref([])
const studentSearch = ref('')

const filteredUnassignedStudents = computed(() => {
  if (!studentSearch.value) return unassignedStudents.value
  return unassignedStudents.value.filter(s =>
    s.realName.includes(studentSearch.value) ||
    s.username.includes(studentSearch.value)
  )
})

const openStudentDialog = async (row) => {
  currentCourseId.value = row.id
  studentDialogVisible.value = true
  studentSearch.value = ''
  await loadCourseStudents()
  await loadUnassignedStudents()
}

const loadCourseStudents = async () => {
  const res = await getCourseStudents(currentCourseId.value)
  if (res.data.code === 200) {
    courseStudents.value = res.data.data
  }
}

const loadUnassignedStudents = async () => {
  const res = await getUnassignedStudents(currentCourseId.value)
  if (res.data.code === 200) {
    unassignedStudents.value = res.data.data
  }
}

const addStudent = async (studentId) => {
  const res = await addCourseStudent(currentCourseId.value, studentId)
  if (res.data.code === 200) {
    ElMessage.success('添加成功')
    await loadCourseStudents()
    await loadUnassignedStudents()
  } else {
    ElMessage.error(res.data.message)
  }
}

const removeStudent = async (studentId) => {
  try {
    await ElMessageBox.confirm('确定移除该学生吗？', '提示')
    const res = await removeCourseStudent(currentCourseId.value, studentId)
    if (res.data.code === 200) {
      ElMessage.success('移除成功')
      await loadCourseStudents()
      await loadUnassignedStudents()
    }
  } catch (e) {
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
    res = await updateCourse(form.value)
  } else {
    res = await addCourse(form.value)
  }

  if (res.data.code === 200) {
    ElMessage.success(isEdit.value ? '修改成功' : '新增成功')
    dialogVisible.value = false
    loadData()
  }
}

const handleDelete = async (id) => {
  try {
    await ElMessageBox.confirm('确定删除该课程吗？', '提示')
    const res = await deleteCourse(id)
    if (res.data.code === 200) {
      ElMessage.success('删除成功')
      loadData()
    }
  } catch (e) {
  }
}

onMounted(() => {
  loadData()
  loadTeacherList()
})

import { getRole } from '../../utils/auth'

const role = getRole()
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

.student-dialog {
  display: flex;
  gap: 24px;
  align-items: stretch;
}

.student-section {
  flex: 1;
}

.student-divider {
  width: 1px;
  background: #e8e4df;
  margin: 8px 0;
}

.student-section h4 {
  margin: 0 0 12px 0;
  color: #2d2d2d;
  font-size: 14px;
  font-weight: 500;
}

.student-search {
  margin-bottom: 12px;
}

.student-list {
  max-height: 350px;
  overflow-y: auto;
}

.student-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  margin-bottom: 8px;
  background: #faf9f7;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.student-item:hover {
  background: #f5f3f0;
}

.student-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.student-name {
  font-size: 14px;
  color: #2d2d2d;
  font-weight: 500;
}

.student-username {
  font-size: 12px;
  color: #8a8a8a;
}

.empty {
  text-align: center;
  color: #8a8a8a;
  padding: 40px 0;
  font-size: 14px;
}
</style>