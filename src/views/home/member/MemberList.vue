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
  <EditForm @submit="handleSubmit" @cancel="handleCancel" title="编辑委员信息" />
</template>

<script lang="ts" setup>
import _axios from '../../../utils/_axios';
import apiUrl from '../../../api/apiUrl';
import { computed, onMounted, provide, reactive, ref, watch } from 'vue'
import useMemberStore from '../../../store/memberStore'
import EditForm from '../../../components/EditForm.vue';
import TwiceElTable from '../../../components/TwiceElTable.vue';

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
  { prop: 'studentNumber', label: '学号' },
  { prop: 'name', label: '姓名' },
  { prop: 'department', label: '部门' },
  { prop: 'periodNumber', label: '学号' },
  { prop: 'studentNumber', label: '届数' },
  { prop: 'campus', label: '校区' },
  { prop: 'phoneNumber', label: '电话号码' }
]
// 编辑表单显示信息
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
// 编辑表单的v-model值
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

// 组件挂载完成后调用请求数据方法
onMounted(() => {
  getTableData()
})

// 请求委员列表数据
const getTableData = async () => {
  const res = await _axios.get(apiUrl.memberlist)
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
    (data: { [prop: string]: string }) => !search.value || data.name.includes(newValue) || data.studentNumber.includes(newValue) || data.department.includes(newValue) || data.periodNumber.includes(newValue) || data.campus.includes(newValue) || data.phoneNumber.includes(newValue)
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
  await _axios.delete(`${apiUrl.memberlist}/${item.id}`)
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
    url: `${apiUrl.memberlist}/${form.id}`,
    data: {
      studentNumber: form.studentNumber,
      name: form.name,
      department: form.department,
      periodNumber: form.periodNumber,
      campus: form.campus,
      phoneNumber: form.phoneNumber
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