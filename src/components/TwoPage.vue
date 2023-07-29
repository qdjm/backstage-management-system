<template>
  <div>
    <h2>卫生事件数量统计</h2>
    <div ref="chartTwo" class="chartTwo"></div>
  </div>
</template>

<script lang="ts" setup>
import _axios from '../utils/_axios';
import apiUrl from '../api/apiUrl';
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts'

let chartTwo = ref(null)

onMounted(() => {
  let chart = echarts.init(chartTwo.value)

  _axios(apiUrl.chartDataTwo).then((res: any) => {
    chart.setOption({
      xAxis: {
        type: 'category',
        data: res.data.day,
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#FFF'
          }
        }
      },
      tooltip: {},
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#FFF'
          }
        }
      },
      grid: {
        left: '1%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      series: [
        {
          type: 'line',
          name: '其他',
          data: res.data.num['其他'],
          stack: 'Total',
          smooth: true,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)'
              }
            ])
          },
          lineStyle: {
            width: 0
          }
        },
        {
          type: 'line',
          name: '石头',
          data: res.data.num['石头'],
          stack: 'Total',
          smooth: true,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(0, 221, 255)'
              },
              {
                offset: 1,
                color: 'rgb(77, 119, 255)'
              }
            ])
          },
          lineStyle: {
            width: 0
          }
        },
        {
          type: 'line',
          name: '菜虫',
          data: res.data.num['菜虫'],
          stack: 'Total',
          smooth: true,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(55, 162, 255)'
              },
              {
                offset: 1,
                color: 'rgb(116, 21, 219)'
              }
            ])
          },
          lineStyle: {
            width: 0
          }
        },
        {
          type: 'line',
          name: '钢丝线',
          data: res.data.num['钢丝线'],
          stack: 'Total',
          smooth: true,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 0, 134)'
              },
              {
                offset: 1,
                color: 'rgb(135, 0, 157)'
              }
            ])
          },
          lineStyle: {
            width: 0
          }
        },
        {
          type: 'line',
          name: '苍蝇',
          data: res.data.num['苍蝇'],
          stack: 'Total',
          smooth: true,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 0, 134)'
              },
              {
                offset: 1,
                color: 'rgb(135, 0, 157)'
              }
            ])
          },
          lineStyle: {
            width: 0
          }
        },
        {
          type: 'line',
          name: '蟑螂',
          data: res.data.num['蟑螂'],
          stack: 'Total',
          smooth: true,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 0, 134)'
              },
              {
                offset: 1,
                color: 'rgb(135, 0, 157)'
              }
            ])
          },
          lineStyle: {
            width: 0
          }
        },
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

.chartTwo {
  height: 4.5rem;
  width: 10rem;
}
</style>