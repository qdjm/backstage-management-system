import { defineStore } from "pinia";
import { ref } from "vue";

const useLeftMenuStore = defineStore('leftMenu', () => {
  // 左侧导航栏是否显示
  const isLeftMenuShow = ref(true)
  // 切换左侧导航栏显示隐藏
  const changeLeftMenuShow = (value: boolean) => {
    isLeftMenuShow.value = value
  }

  return {
    isLeftMenuShow,
    changeLeftMenuShow
  }
})

export default useLeftMenuStore