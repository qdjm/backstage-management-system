<template>
  <!-- 二次封装element-plus表格组件 -->
  <twice-el-table 
  :data="pagingTableData" :prop-arr="tablePropArr"
  @edit="handleEdit" @confirm-delete="handleDelete" 
  >
    <el-input v-model="search" size="small" placeholder="请输入搜索内容" />
  </twice-el-table>
  <!-- 底部分页按钮 -->
  <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 15, 20, 25, 30]"
    layout="total, sizes, prev, pager, next, jumper" :total="tableData.dataList.length" @size-change="handleSizeChange"
    @current-change="handleCurrentChange" />
  <!-- 编辑信息表单组件 -->
  <EditForm @submit="handleSubmit" @cancel="handleCancel" title="编辑用户信息" />
</template>

<script lang="ts" setup>
import _axios from '../../../utils/_axios';
import apiUrl from '../../../api/apiUrl';
import { computed, onMounted, provide, reactive, ref, watch } from 'vue'
import useMemberStore from '../../../store/memberStore'
import EditForm from '../../../components/EditForm.vue';
import TwiceElTable from '../../../components/TwiceElTable.vue';
import useMd5 from '../../../hooks/useMd5';

const store = useMemberStore()

const search = ref('')
const currentPage = ref(1)
const pageSize = ref(15)
let tableData = reactive({
  dataList: [],
  backupsDataList: []
})

// 表格显示信息
const tablePropArr = [
  { prop: 'username', label: '账号' },
  { prop: 'pwd', label: '密码' },
  { prop: 'role', label: '角色' }
]
// 编辑表单显示信息
const formPropArr = [
  { label: '账号', modelStr: 'username' },
  { label: '密码', modelStr: 'pwd' },
  {
    label: '角色', modelStr: 'role',
    option: ['编辑', '管理员']
  }
]
// 编辑表单的v-model值
const form: { [ prop: string ]: any } = reactive({
  id: 0,
  username: '',
  pwd: '',
  role: '编辑'
})
provide('formPropArr', formPropArr)
provide('form', form)

// 组件挂载完成后调用请求数据方法
onMounted(() => {
  getTableData()
})

// 请求委员列表数据
const getTableData = async () => {
  const res = await _axios.get(apiUrl.userList)
  tableData.dataList = res.data
  tableData.backupsDataList = res.data
  search.value = ''
}
// 对表格数据进行分页
const pagingTableData = computed(() =>
  tableData.dataList.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value)
)
// 侦听搜索框文本，筛选表格数据
watch(search, (newValue) => {
  tableData.dataList = tableData.backupsDataList.filter(
    (data: { [prop: string]: string }) => !search.value || data.username.includes(newValue) || data.role.includes(newValue)
  )
})
// 改变分页的数量
const handleSizeChange = (val: number) => {
  pageSize.value = val
}
// 改变当前所在页数
const handleCurrentChange = (val: number) => {
  currentPage.value = val
}
// 删除的回调函数
const handleDelete = async (item: { id: number; }) => {
  await _axios.delete(`${apiUrl.userList}/${item.id}`)
  await getTableData()
}
// 点击编辑按钮的回调函数
const handleEdit = (item: object) => {
  store.$patch({
    fillInfoData: item,
    editFormVisible: true
  })
}
// 编辑框提交按钮的回调函数
const handleSubmit = async (form: { [prop: string]: any; }) => {
  await _axios({
    method: 'PUT',
    url: `${apiUrl.userList}/${form.id}`,
    data: {
      username: form.username,
      pwd: useMd5(form.pwd).value,
      role: form.role
    }
  })
  await getTableData()
  store.$patch({
    editFormVisible: false
  })
}
// 编辑框取消按钮回调
const handleCancel = () => {
  store.$patch({
    editFormVisible: false
  })
}
</script>

<style lang="scss">
// 使得底部分页导航栏显得水平垂直居中
.el-pagination {
  margin-left: 54%;
  margin-top: 15px;
  transform: translateX(-50%);
}
.el-pagination__sizes {
  width: 130px;
}
</style>