import { createPinia } from 'pinia'
import { persistedstate } from './plugins/persistedstate'

// 创建pinia并返回pinia实例
const pinia = createPinia()
// 使用自定义持久化插件
pinia.use(persistedstate)

export default pinia