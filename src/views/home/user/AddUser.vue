<template>
  <div class="addBox">
    <!-- 二次封装element-plus表单组件 -->
    <twice-el-form></twice-el-form>
    <!-- 底部按钮区域 -->
    <div class="dialog-footer">
      <el-button type="primary" @click="resetForm">重置</el-button>
      <el-button type="success" @click="handleAdd">
        添加
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { provide, reactive } from 'vue';
import apiUrl from '../../../api/apiUrl';
import TwiceElForm from '../../../components/TwiceElForm.vue';
import useMd5 from '../../../hooks/useMd5';
import _axios from '../../../utils/_axios';

// 表单显示信息
const formPropArr = [
  { label: '账号', modelStr: 'username' },
  { label: '密码', modelStr: 'pwd' },
  {
    label: '角色', modelStr: 'role',
    option: ['编辑', '管理员']
  }
]
// 表单的v-model值
const form: { [prop: string]: any } = reactive({
  id: 0,
  username: '',
  pwd: '',
  role: '编辑'
})
provide('formPropArr', formPropArr)
provide('form', form)
// 重置表单
const resetForm = () => {
  for (let k in form) {
    form[k] = ''
  }
}
// 添加委员
const handleAdd = async () => {
  await _axios({
    method: 'POST',
    url: apiUrl.userList,
    data: {
      username: form.username,
      pwd: useMd5(form.pwd).value,
      role: form.role
    }
  })
  resetForm()
  ElMessage({
    message: '添加成功',
    type: 'success',
  })
}
</script>

<style lang="scss">
.addBox {
  margin-top: 150px;
  margin-left: 52%;
  transform: translateX(-50%);
}

.el-button--text {
  margin-right: 15px;
}

.dialog-footer {
  margin-left: 55%;
  transform: translateX(-50%);
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>