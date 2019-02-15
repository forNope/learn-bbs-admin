<template>
  <div class="container"/>
</template>

<script>
import api from '@/api'
import echarts from 'echarts/lib/echarts'

const chartOptions = {
  title: {
    text: '用户省份分布图',
    x: 'center'
  },
  tooltip: {
    show: true
  },
  visualMap: {
    min: 0,
    max: 0,
    left: 'left',
    top: 'bottom',
    text: ['高', '低'],
    calculable: true
  },
  series: [
    {
      name: '省份',
      type: 'map',
      mapType: 'china',
      roam: false,
      label: {
        emphasis: {
          show: true
        }
      },
      data: []
    }
  ]
}

export default {
  mounted() {
    const charts = echarts.init(this.$el)
    api.getStat({ type: 'provinces' }).ok(data => {
      let total = 0
      data.sort((a, b) => a.num - b.num)
      data = data.map(({ province, num }) => {
        total += num
        return {
          name: province,
          value: num
        }
      })

      chartOptions.title.text = `用户省份分布图 总人数: ${total}`
      chartOptions.visualMap.min = data[0].value
      chartOptions.visualMap.max = data[data.length - 1].value
      chartOptions.series[0].data = data

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

