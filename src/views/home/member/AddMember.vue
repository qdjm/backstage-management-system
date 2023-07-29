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
import _axios from '../../../utils/_axios';

// 表单显示信息
const formPropArr = [
  { label: '学号', modelStr: 'studentNumber' },
  { label: '姓名', modelStr: 'name' },
  { label: '部门', modelStr: 'department',
    option: ['督察部', '组织部', '宣传部', '秘书部'] },
  { label: '届数', modelStr: 'periodNumber',
    option: ['第八届', '第九届', '第十届', '第十一届', '第十二届'] },
  { label: '校区', modelStr: 'campus',
    option: ['东区', '西区'] },
  { label: '电话号码', modelStr: 'phoneNumber' }
]
// 表单的v-model值
const form: { [ prop: string ]: any } = reactive({
  id: 0,
  studentNumber: '',
  name: '',
  department: '',
  periodNumber: '',
  campus: '',
  phoneNumber: ''
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
    url: apiUrl.memberlist,
    data: {
      studentNumber: form.studentNumber,
      name: form.name,
      department: form.department,
      periodNumber: form.periodNumber,
      campus: form.campus,
      phoneNumber: form.phoneNumber
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