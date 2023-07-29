import md5 from 'js-md5'
import { ref } from 'vue'
// 导出Md5密码加密方法
export default function (data: string) {
  const mdData = ref(md5(data))
  return mdData
} 