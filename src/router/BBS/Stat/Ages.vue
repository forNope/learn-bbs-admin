<template>
  <div class="container"/>
</template>

<script>
import api from '@/api'
import echarts from 'echarts/lib/echarts'

const chartOptions = {
  title: {
    text: '用户年龄统计',
    x: 'center'
  },
  xAxis: {
    name: '年龄',
    data: []
  },
  yAxis: {
    name: '人数'
  },
  series: [
    {
      name: '年龄',
      type: 'bar',
      data: [],
      label: { show: true }
    }
  ]
}

export default {
  mounted() {
    const charts = echarts.init(this.$el)
    api.getStat({ type: 'ages' }).ok(data => {
      let total = 0
      chartOptions.xAxis.data = data.map(val => val.ages)
      chartOptions.series[0].data = data.map(val => {
        total += val.num
        return val.num
      })
      chartOptions.title.text = `用户年龄统计 总人数: ${total}`
      charts.setOption(chartOptions)
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 90%;
}
</style>

