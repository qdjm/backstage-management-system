<template>
  <div>
    <h2>部门人数统计</h2>
    <div ref="chartFour" class="chartFour"></div>
  </div>
</template>

<script lang="ts" setup>
import _axios from '../utils/_axios';
import apiUrl from '../api/apiUrl';
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts'

let chartFour = ref(null)

onMounted(() => {
  let chart = echarts.init(chartFour.value)

  _axios(apiUrl.chartDataFour).then((res: any) => {
    chart.setOption({
      xAxis: {
        type: 'category',
        data: res.data.day,
        axisLine: {
          lineStyle: {
            color: '#FFF'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#FFF'
          }
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: '3%',
        left: '1%',
        bottom: '3%',
        right: '6%',
        containLabel: true
      },
      series: [
        {
          type: 'bar',
          data: res.data.num['督察部'],
          stack: 'total'
        },
        {
          type: 'bar',
          data: res.data.num['组织部'],
          stack: 'total'
        },
        {
          type: 'bar',
          data: res.data.num['宣传部'],
          stack: 'total'
        },
        {
          type: 'bar',
          data: res.data.num['秘书部'],
          stack: 'total'
        }
      ]
    })
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

.chartFour {
  height: 4.5rem;
  width: 10rem;
}
</style>