<template>
  <div class="page-card">
    <div class="header">
      <h2>用户管理</h2>
      <el-button type="primary" @click="openAdd">新增用户</el-button>
    </div>

    <el-table :data="userList" border style="width:100%">
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="realName" label="姓名" />
      <el-table-column prop="role" label="角色">
        <template #default="scope">
          <el-tag v-if="scope.row.role === 'admin'" type="danger">管理员</el-tag>
          <el-tag v-else-if="scope.row.role === 'teacher'" type="primary">教师</el-tag>
          <el-tag v-else type="success">学生</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作" width="160">
        <template #default="scope">
          <el-button size="small" style="margin-right: 8px;" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑用户' : '新增用户'" width="500px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" :disabled="isEdit" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.realName" />
        </el-form-item>
        <el-form-item label="密码" v-if="!isEdit">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.role" style="width:100%">
            <el-option label="管理员" value="admin" />
            <el-option label="教师" value="teacher" />
            <el-option label="学生" value="student" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getUserList, addUser, updateUser, deleteUser } from '../../api/user'

const userList = ref([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const form = ref({
  id: null,
  username: '',
  realName: '',
  password: '',
  role: ''
})

const loadData = async () => {
  const res = await getUserList()
  if (res.data.code === 200) {
    userList.value = res.data.data
  }
}

const openAdd = () => {
  isEdit.value = false
  form.value = {
    id: null,
    username: '',
    realName: '',
    password: '',
    role: ''
  }
  dialogVisible.value = true
}

const handleEdit = (row) => {
  isEdit.value = true
  form.value = {
    id: row.id,
    username: row.username,
    realName: row.realName,
    password: '',
    role: row.role
  }
  dialogVisible.value = true
}

const submitForm = async () => {
  if (!form.value.username) {
    ElMessage.warning('请输入用户名')
    return
  }
  if (!form.value.realName) {
    ElMessage.warning('请输入姓名')
    return
  }
  if (!isEdit.value && !form.value.password) {
    ElMessage.warning('请输入密码')
    return
  }
  if (!form.value.role) {
    ElMessage.warning('请选择角色')
    return
  }

  let res
  if (isEdit.value) {
    res = await updateUser(form.value)
  } else {
    res = await addUser(form.value)
  }

  if (res.data.code === 200) {
    ElMessage.success(isEdit.value ? '修改成功' : '新增成功')
    dialogVisible.value = false
    loadData()
  } else {
    ElMessage.error(res.data.message)
  }
}

const handleDelete = async (id) => {
  try {
    await ElMessageBox.confirm('确定删除该用户吗？', '提示')
    const res = await deleteUser(id)
    if (res.data.code === 200) {
      ElMessage.success('删除成功')
      loadData()
    }
  } catch (e) {
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
</style>