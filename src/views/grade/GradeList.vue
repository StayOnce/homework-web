<template>
  <div class="page-card">
    <div class="header">
      <h2>批改作业</h2>
    </div>

    <el-table :data="submitList" border style="width:100%">
      <el-table-column prop="studentName" label="学生" width="120" />
      <el-table-column prop="courseName" label="课程" />
      <el-table-column prop="homeworkTitle" label="作业" />
      <el-table-column prop="submitTime" label="提交时间" width="180" />
      <el-table-column label="批改状态" width="120">
        <template #default="scope">
          <el-tag v-if="scope.row.gradeStatus === 'GRADED'" type="success">已批改</el-tag>
          <el-tag v-else type="warning">待批改</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="score" label="成绩" width="100" />
      <el-table-column label="操作" width="140">
        <template #default="scope">
          <el-button type="primary" size="small" @click="openGradeDialog(scope.row)">{{ scope.row.gradeStatus === 'GRADED' ? '修改成绩' : '批改' }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="gradeDialogVisible" title="批改作业" width="600px">
      <el-form :model="gradeForm" label-width="100px">
        <el-form-item label="学生">
          <el-input v-model="gradeForm.studentName" disabled />
        </el-form-item>
        <el-form-item label="作业标题">
          <el-input v-model="gradeForm.homeworkTitle" disabled />
        </el-form-item>
        <el-form-item label="提交内容">
          <el-input type="textarea" :rows="5" v-model="gradeForm.submitContent" disabled />
        </el-form-item>
        <el-form-item label="成绩">
          <el-input-number v-model="gradeForm.score" :min="0" :max="100" />
        </el-form-item>
        <el-form-item label="评语">
          <el-input type="textarea" :rows="3" v-model="gradeForm.comment" placeholder="请输入评语" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="gradeDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleGrade">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getSubmitList } from '../../api/submit'
import { gradeSubmit } from '../../api/score'

const submitList = ref([])
const gradeDialogVisible = ref(false)
const gradeForm = ref({
  id: null,
  studentName: '',
  homeworkTitle: '',
  submitContent: '',
  score: null,
  comment: ''
})

const loadData = async () => {
  const res = await getSubmitList()
  if(res.data.code === 200){
    submitList.value = res.data.data
    console.log('第一条数据:', res.data.data[0])
  }
}

const openGradeDialog = (row) => {
  console.log('row.id =', row.id)
  gradeForm.value = {
    id: row.id,
    studentName: row.studentName,
    homeworkTitle: row.homeworkTitle,
    submitContent: row.submitContent,
    score: row.score ?? null,
    comment: row.comment ?? ''
  }
  gradeDialogVisible.value = true
}

const handleGrade = async () => {
  if(gradeForm.value.score === null || gradeForm.value.score === undefined){
    ElMessage.warning('请输入成绩')
    return
  }

  const res = await gradeSubmit({
    submitId: gradeForm.value.id,
    score: gradeForm.value.score,
    comment: gradeForm.value.comment
  })

  if(res.data.code === 200){
    ElMessage.success('批改成功')
    gradeDialogVisible.value = false
    loadData()
  }else{
    ElMessage.error(res.data.message)
  }
}

onMounted(() => {
  loadData()
})
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

:deep(.el-tag--success) {
  background: #f0fdf4;
  border-color: #dcfce7;
  color: #16a34a;
}

:deep(.el-tag--warning) {
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

:deep(.el-input-number) {
  width: 100%;
}

:deep(.el-input-number .el-input__wrapper) {
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