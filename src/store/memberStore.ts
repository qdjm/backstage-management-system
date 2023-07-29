import { defineStore } from "pinia";
import { ref } from "vue";

const useMemberStore = defineStore('member', () => {
  // 编辑表单是否显示
  const editFormVisible = ref(false)
  // 编辑表单的填充信息
  const fillInfoData = ref({})

  return {
    editFormVisible,
    fillInfoData
  }
})

export default useMemberStore