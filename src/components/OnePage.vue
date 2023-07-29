<template>
  <div>
    <h2>食堂得分统计</h2>
    <div ref="chartOne" class="chartOne"></div>
  </div>
</template>

<script lang="ts" setup>
import _axios from '../utils/_axios';
import apiUrl from '../api/apiUrl';
import { onMounted, reactive, ref } from 'vue';
import * as echarts from 'echarts'
import _ from 'lodash'

interface ChartData {
  xData: Array<number>
  yData: Array<string>
}

let chartOne = ref(null)
let chartData: ChartData = reactive({
  xData: [],
  yData: []
})

onMounted(async () => {
  // 请求卫生检查记录列表
  const res = await _axios(apiUrl.recordList)
  // 对数据根据食堂名称进行分类
  const dataObj = _.groupBy(res.data, 'canteenName')
  for (let k in dataObj) {
    chartData.xData.push(_.sumBy(dataObj[k], 'grade'))
    chartData.yData.push(k)
  }

  // 初始化echarts对象
  let chart = echarts.init(chartOne.value)
  chart.setOption({
    xAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#FFF'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: chartData.yData,
      axisLine: {
        lineStyle: {
          color: '#FFF'
        }
      }
    },
    grid: {
      top: '3%',
      left: '1%',
      bottom: '3%',
      right: '6%',
      containLabel: true
    },
    tooltip: {},
    series: [
      {
        type: 'bar',
        data: chartData.xData,
        itemStyle: {
          borderRadius: [0, 20, 20, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: '#005EAA'
            },
            {
              offset: 0.5,
              color: '#339CA8'
            },
            {
              offset: 1,
              color: '#CDA819'
            }
          ])
        }
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

.chartOne {
  height: 4.5rem;
  width: 10rem;
}
</style>