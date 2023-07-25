import md5 from 'js-md5'
import { ref } from 'vue'

export default function (data: string) {
  const mdData = ref(md5(data))
  return mdData
} 