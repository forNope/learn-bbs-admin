<template>
  <div class="container"/>
</template>

<script>
import api from '@/api'
import echarts from 'echarts/lib/echarts'

const chartOptions = {
  title: {
    text: '用户性别统计',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{c}人'
  },
  series: [
    {
      name: '性别',
      type: 'pie',
      data: [],
      radius: '55%',
      center: ['50%', '60%']
    }
  ]
}

export default {
  mounted() {
    const charts = echarts.init(this.$el)
    api.getStat({ type: 'sex' }).ok(data => {
      let total = 0
      data = data.filter(({ sex, num }) => num > 0)
      chartOptions.series[0].data = data.map(({ sex, num }) => {
        total += num
        sex = +sex

        return {
          name: sex === 0 ? '未知' : sex === 1 ? '男性' : '女性',
          value: num
        }
      })
      chartOptions.title.text = `用户性别统计 总人数: ${total}`
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

