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
  {
    label: '类型', modelStr: 'type',
    option: ['其他', '菜虫', '石头', '钢丝线', '苍蝇', '蟑螂']
  },
  { label: '详情', modelStr: 'detail' },
  {
    label: '食堂', modelStr: 'canteen',
    option: ['东区老食堂', '东区一楼食堂', '东区二楼食堂', '西区一楼食堂', '西区二楼食堂', '西区三楼食堂']
  },
  {
    label: '处罚', modelStr: 'punish',
    option: ['警告', '扣1分', '扣2分', '扣3分', '扣4分', '扣5分']
  },
  { label: '时间', modelStr: 'time' },
  { label: '处理人员', modelStr: 'functionary' }
]
// 表单的v-model值
const form: { [prop: string]: any } = reactive({
  id: 0,
  type: '',
  detail: '',
  canteen: '',
  punish: '',
  time: '',
  functionary: ''
})
provide('formPropArr', formPropArr)
provide('form', form)
// 重置表单
const resetForm = () => {
  for (let k in form) {
    form[k] = ''
  }
}
// 添加记录
const handleAdd = async () => {
  await _axios({
    method: 'POST',
    url: apiUrl.emergencyList,
    data: {
      type: form.type,
      detail: form.detail,
      canteen: form.canteen,
      punish: form.punish,
      time: form.time,
      functionary: form.functionary
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