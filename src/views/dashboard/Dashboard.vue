<template>
  <div class="dashboard-container">
    <div class="welcome-section">
      <h2 class="welcome-title">欢迎回来，{{ dashboard.userName || '用户' }}</h2>
      <p class="welcome-subtitle">
        <el-tag v-if="dashboard.userRole === 'admin'" type="danger">管理员</el-tag>
        <el-tag v-else-if="dashboard.userRole === 'teacher'" type="success">教师</el-tag>
        <el-tag v-else type="primary">学生</el-tag>
      </p>
    </div>

    <h2 class="page-title">数据概览</h2>

    <div class="stats-grid">
      <div class="stat-card" v-if="role === 'admin'">
        <div class="stat-icon courses">
          <el-icon><Reading /></el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ dashboard.totalCourses || 0 }}</div>
          <div class="stat-label">课程总数</div>
        </div>
      </div>

      <div class="stat-card" v-if="role === 'admin'">
        <div class="stat-icon students">
          <el-icon><User /></el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ dashboard.totalStudents || 0 }}</div>
          <div class="stat-label">学生总数</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon homeworks">
          <el-icon><Document /></el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ dashboard.totalHomeworks || 0 }}</div>
          <div class="stat-label">作业总数</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon submits">
          <el-icon><CircleCheck /></el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ dashboard.totalSubmits || 0 }}</div>
          <div class="stat-label">提交总数</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon score">
          <el-icon><DataLine /></el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ (dashboard.averageScore || 0).toFixed(2) }}</div>
          <div class="stat-label">平均成绩</div>
        </div>
      </div>

      <div class="stat-card warning" v-if="role === 'teacher' && dashboard.pendingGrades">
        <div class="stat-icon pending">
          <el-icon><Clock /></el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ dashboard.pendingGrades }}</div>
          <div class="stat-label">待批改作业</div>
        </div>
      </div>

      <div class="stat-card warning" v-if="role === 'student' && dashboard.pendingSubmits">
        <div class="stat-icon pending">
          <el-icon><Clock /></el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ dashboard.pendingSubmits }}</div>
          <div class="stat-label">待提交作业</div>
        </div>
      </div>
    </div>

    <div class="section" v-if="role === 'admin' || role === 'teacher'">
      <h3>课程统计</h3>
      <el-table :data="dashboard.courseStatistics || []" border>
        <el-table-column prop="courseName" label="课程名称" />
        <el-table-column prop="studentCount" label="学生数" width="100" />
        <el-table-column prop="submitCount" label="提交数" width="100" />
        <el-table-column prop="unSubmitCount" label="未提交数" width="100" />
        <el-table-column prop="averageScore" label="平均分" width="100">
          <template #default="scope">
            {{ scope.row.averageScore || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="completeRate" label="完成率" width="100">
          <template #default="scope">
            {{ scope.row.completeRate ? scope.row.completeRate + '%' : '-' }}
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="section" v-if="role === 'student'">
      <h3>欢迎回来！</h3>
      <p>你当前选修了 {{ dashboard.totalCourses || 0 }} 门课程，共收到 {{ dashboard.totalHomeworks || 0 }} 个作业。</p>
      <p>你的平均成绩为 {{ (dashboard.averageScore || 0).toFixed(2) }} 分。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getRole } from '../../utils/auth'
import { getDashboard } from '../../api/dashboard'
import { Reading, User, Document, CircleCheck, DataLine, Clock } from '@element-plus/icons-vue'

const role = getRole()
console.log('role:', role)

const dashboard = ref({})

const loadDashboard = async () => {
  const res = await getDashboard()
  if (res.data.code === 200) {
    dashboard.value = res.data.data
  }
}

onMounted(() => {
  loadDashboard()
})
</script>

<style scoped>
.dashboard-container {
  padding: 24px;
}

.welcome-section {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.welcome-title {
  margin: 0 0 8px 0;
  color: #6b6375;
  font-size: 24px;
}

.welcome-subtitle {
  margin: 0;
}

.page-title {
  margin: 0 0 24px 0;
  color: #2d2d2d;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.5px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
}

.stat-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}

.stat-card.warning {
  background: linear-gradient(135deg, #fef7ed 0%, #fde9d9 100%);
}

.stat-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #f8f6f3;
}

.stat-icon .el-icon {
  font-size: 24px;
  color: #5a5a5a;
}

.stat-icon.courses .el-icon {
  color: #3b82f6;
}

.stat-icon.students .el-icon {
  color: #8b5cf6;
}

.stat-icon.homeworks .el-icon {
  color: #f59e0b;
}

.stat-icon.submits .el-icon {
  color: #10b981;
}

.stat-icon.score .el-icon {
  color: #ec4899;
}

.stat-icon.pending .el-icon {
  color: #d97706;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: #2d2d2d;
  margin-bottom: 4px;
  letter-spacing: -1px;
}

.stat-label {
  font-size: 13px;
  color: #8a8a8a;
  font-weight: 400;
}

.section {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.section h3 {
  margin: 0 0 20px 0;
  color: #2d2d2d;
  font-size: 16px;
  font-weight: 500;
}

.section p {
  color: #5a5a5a;
  line-height: 1.8;
  font-size: 14px;
}

.section :deep(.el-table) {
  border-radius: 12px;
}

.section :deep(.el-table th) {
  background: #f8f6f3;
  color: #5a5a5a;
  font-weight: 500;
  font-size: 13px;
}

.section :deep(.el-table td) {
  color: #2d2d2d;
  font-size: 14px;
}

.section :deep(.el-table--border) {
  border: 1px solid #e8e4df;
}

.section :deep(.el-table--border th) {
  border-color: #e8e4df;
}

.section :deep(.el-table--border td) {
  border-color: #e8e4df;
}
</style>