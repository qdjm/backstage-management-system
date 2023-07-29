<template>
  <el-form :model="form">
    <template v-for="item in propArr" :key="item.modelStr">
      <!-- 下拉框 -->
      <el-form-item v-if="item.option" :label="item.label" :label-width="formLabelWidth">
        <el-select v-model="form[item.modelStr]" :placeholder="item.option[0]">
          <el-option v-for="data in item.option" :label="data" :value="data" />
        </el-select>
      </el-form-item>
      <!-- 非下拉框 -->
      <el-form-item v-else :label="item.label" :label-width="formLabelWidth">
        <el-input v-model="form[item.modelStr]" autocomplete="off" />
      </el-form-item>
    </template>
  </el-form>
</template>

<script lang="ts" setup>
import { inject } from 'vue';

const formLabelWidth = '140px'
const form: any = inject('form')
const propArr: any = inject('formPropArr') 
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
}
</style>