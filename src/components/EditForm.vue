<template>
  <el-dialog v-model="store.editFormVisible" :title="props.title">
    <!-- 二次封装element-plus表单组件 -->
    <twice-el-form></twice-el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleHide">取消</el-button>
        <el-button type="primary" @click="handleSubmit">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import useMemberStore from '../store/memberStore'
import _axios from '../utils/_axios';
import TwiceElForm from './TwiceElForm.vue';

const props = defineProps(['title'])
const store = useMemberStore()
const emit = defineEmits(['submit', 'cancel'])
const form: any = inject('form')

store.$subscribe((_mutation, state: { [prop: string]: any }) => {
  // 将state信息赋值给form表单，方便用户编辑
  for (let k in form) {
    form[k] = state.fillInfoData[k]
  }
})
// 触发提交回调
const handleSubmit = async () => {
  emit('submit', form)
}
// 触发取消回调
const handleHide = () => {
  emit('cancel')
}
</script>

<style lang="scss">
.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}</style>