import { PiniaPluginContext } from "pinia";
// 插件方法，有几个store模块执行几次
export function persistedstate (context: PiniaPluginContext) {
  // console.log('初始化的时候执行')
  // 根据模块名模块名拿到对应的localStorage
  const currentState = JSON.parse(localStorage.getItem(context.store.$id) || '{}')

  // 把我们的state对象（包含该模块的所有state）放在pinia对应的模块里面
  context.store.$patch(currentState)

  // 每次state发生变化的时候，都要把它保存在localStorage里面
  // 两个参数
  // 第一个是当前修改store的上下文
  // 第二个是修改后的状态
  // 用$subscribe方法侦听store里面state的变化，state改变时存到localStorage里面
  context.store.$subscribe((_store, state) => {
    // console.log(_store, state)
    // 把state对象（包含该模块的所有state）存到localStorage里面
    // 第一个是store的名字
    localStorage.setItem(_store.storeId, JSON.stringify(state))
  }, {
    // 组件卸载依赖还在
    detached: true
  })
}