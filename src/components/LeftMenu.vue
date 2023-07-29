<template>
  <el-menu v-if="store.isLeftMenuShow" active-text-color="#ffd04b" background-color="#545c64"
    class="el-menu-vertical-demo" :default-active="router.currentRoute.value.fullPath" router text-color="#fff">
    <template v-for="item in menuList" :key="item.path">
      <!-- 可下拉菜单 -->
      <el-sub-menu :index="item.path" v-if="isAdmin ? item.children : item.children && !item.meta.isUser">
        <template #title>
          <!-- 动态组件根据路由元信息动态导入icon组件 -->
          <el-icon><component :is="item.meta.icon" /></el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <el-menu-item-group v-for="data in item.children" :key="data.path">
          <el-menu-item :index="data.path">{{ data.meta.title }}</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <!-- 不可下拉菜单 -->
      <el-menu-item :index="item.path" v-else-if="!item.children">
        <el-icon><component :is="item.meta.icon" /></el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import apiUrl from '../api/apiUrl';
import useLeftMenuStore from '../store/leftMenuStore';
import _axios from '../utils/_axios';

const store = useLeftMenuStore()
const router = useRouter()

let isAdmin = ref(false)
let menuList: any = ref([])

onMounted(async () => {
  const id = localStorage.getItem('id')
  const res = await _axios(apiUrl.userList + '/' + id)
  isAdmin.value = res.data.role.includes('管理员')
  menuList.value = router.options.routes[2].children
})
</script>

<style scoped></style>