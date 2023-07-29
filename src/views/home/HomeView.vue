<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <!-- 左边导航组件 -->
        <LeftMenu />
      </el-aside>
      <el-container>
        <el-header>
          <!-- 顶部导航组件 -->
          <TopMenu />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import LeftMenu from '../../components/LeftMenu.vue'
import TopMenu from '../../components/TopMenu.vue'
</script>

<style lang="scss">
.el-aside {
  background-color: #545c64;

  .el-menu {
  border: 0 !important;
}
}

.el-header {
  background-color: #545c6495;
}

.el-main {
  background-color: #ccc;
  padding: 5px;
}

.el-aside,
.el-container,
.common-layout,
#app,
body,
html {
  height: 100%;
}
</style>

