import axios from "axios";
import { ElMessage, ElLoading } from 'element-plus'

let axiosUrl: string | undefined = ''
axiosUrl = import.meta.env.VITE_APP_BASE_URL

// 实例 axios
const _axios = axios.create({
  baseURL: axiosUrl
});
// 加载loading框
let loading: any
// 添加请求拦截器
_axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 开启loading框
  loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  return config;
}, function (error) {
  // 对请求错误做些什么
  ElMessage.error('请求错误请稍后再试！！！')
  return Promise.reject(error);
});

// 添加响应拦截器
_axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  // 关闭loading框
  loading.close()
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  loading.close()
  switch (error.response.status) {
    case 404:
      ElMessage.error('当前路径有误！, 请重新填写')
      break;
    case 500: 
      ElMessage.error('服务器连接失败请稍后再试！！！')
      break;
    default: 
      ElMessage.error('未知错误请稍后再试！！！')
      break;
  }
  return Promise.reject(error);
});

export default _axios