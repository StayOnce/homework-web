<template>
  <div class="page-card">
    <div class="header">
      <h2>提交记录</h2>
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
      <el-table-column label="提交内容">
        <template #default="scope">
          <el-popover placement="top" width="400" trigger="click">
            <template #reference>
              <el-button type="primary" size="small">查看</el-button>
            </template>
            <div>{{ scope.row.submitContent }}</div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getSubmitList } from '../../api/submit'

const submitList = ref([])

const loadData = async () => {
  const res = await getSubmitList()
  if(res.data.code === 200){
    submitList.value = res.data.data
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
</style>