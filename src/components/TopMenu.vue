<template>
  <div class="topMenu">
    <el-icon @click="handleShow">
      <CaretRight v-if="store.isLeftMenuShow" />
      <CaretLeft v-else />
    </el-icon>
    <h1>伙管会后台管理系统</h1>
    <el-button type="danger" @click="handleLogout">退出</el-button>
  </div>
</template>

<script lang="ts" setup>
import { CaretRight, CaretLeft } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import useLeftMenuStore from '../store/leftMenuStore'

const router = useRouter()
const store = useLeftMenuStore()
// 显示和隐藏左边导航栏
const handleShow = () => {
  store.$patch({
    isLeftMenuShow: !store.isLeftMenuShow
  })
}
// 删除本地存储的token
const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('id')
  router.push('/login')
  ElMessage({
    message: '退出成功',
    type: 'success',
  })
}
</script>

<style lang="scss">
.el-header {
  line-height: 70px;

  .topMenu {
    .el-icon {
      font-size: 20px;
    }

    h1 {
      font-size: 20px;
      color: #fff;
      display: inline-block;
      margin-left: 43%;
      transform: translateX(-50%);
      transform: translateY(-7%);
    }

    .el-button--danger {
      position: absolute;
      right: 30px;
      top: 15px;
    }
  }

}
</style>