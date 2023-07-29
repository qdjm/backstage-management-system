<template>
  <el-table :data="props.data" max-height="615" style="width: 100%">
    <!-- 普通数据展示列部分 -->
    <el-table-column v-for="item in props.propArr" :key="item.prop" :prop="item.prop" :label="item.label" />
    <!-- 操作列部分 -->
    <el-table-column label="操作" width="100">
      <template #default="scope">
        <el-button circle :icon="Edit" type="primary" @click="handleEdit(scope.row)"></el-button>
        <el-popconfirm title="你确定要删除吗?" confirmButtonText="确定" cancelButtonText="取消" @confirm="handleDelete(scope.row)">
          <template #reference>
            <el-button circle :icon="Delete" type="danger"></el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
    <!-- 搜索列部分 -->
    <el-table-column>
      <template #header>
        <slot></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { Edit, Delete } from '@element-plus/icons-vue'

const props = defineProps(['data', 'propArr'])
const emit = defineEmits(['edit', 'confirmDelete'])

// 触发删除回调
const handleDelete = (item: object) => {
  emit('confirmDelete', item)
}
// 触发编辑回调
const handleEdit = (item: object) => {
  emit('edit', item)
}
</script>

<style lang="scss" scoped></style>