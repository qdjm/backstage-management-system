<template>
  <div>
    <h2>卫生事件类型统计</h2>
    <div ref="chartThree" class="chartThree"></div>
  </div>
</template>

<script lang="ts" setup>
import _axios from '../utils/_axios';
import apiUrl from '../api/apiUrl';
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts'
import _ from 'lodash'

// 获取图表的DOM
let chartThree = ref(null)

onMounted(async () => {
  // 请求突发事件记录列表
  const res = await _axios(apiUrl.emergencyList)
  const dataArr: { value: number; name: string; }[] = []
  // 对数据按照类型进行分组
  const dataObj = _.groupBy(res.data, 'type')
  // 遍历对象，把数据添加到 dataArr 中成为合适的数据格式
  for (let k in dataObj) {
    dataArr.push({
      value: dataObj[k].length,
      name: k
    })
  }
  // 初始化echarts对象
  let chart = echarts.init(chartThree.value)
  chart.setOption({
    legend: {
      top: 'bottom'
    },
    tooltip: {},
    series: [
      {
        type: 'pie',
        data: dataArr,
        radius: [10, 100],
        center: ['50%', '45%'],
        roseType: 'area'
      }
    ]
  })
})
</script>

<style scoped>
h2 {
  height: 0.6rem;
  line-height: 0.6rem;
  color: white;
  text-align: center;
  font-size: 0.25rem;
}

.chartThree {
  height: 4.5rem;
  width: 10rem;
}
</style>