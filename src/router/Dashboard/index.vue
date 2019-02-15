<template>
  <div class="wrapper">
    <div class="infos">
      <div class="info">
        <svg-icon class="icon" icon-class="user-cyan"/>
        <div>
          <p class="info-title">用户数量</p>
          <p class="info-text">{{ userNum }}</p>
        </div>
      </div>
      <div class="info">
        <svg-icon class="icon" icon-class="comment"/>
        <div>
          <p class="info-title">烦恼数量</p>
          <p class="info-text">{{ postNum }}</p>
        </div>
      </div>
      <div class="info">
        <svg-icon class="icon" icon-class="post"/>
        <div>
          <p class="info-title">吐槽数量</p>
          <p class="info-text">{{ teasingNum }}</p>
        </div>
      </div>
    </div>
    <div ref="chart" class="charts"/>
  </div>
</template>

<script>
import api from '@/api'
import echarts from 'echarts/lib/echarts'

const chartOptions = {
  title: {
    text: '今周用户活跃度',
    top: '10px',
    x: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  backgroundColor: 'white',
  xAxis: {
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    splitLine: {
      show: true
    }
  },
  series: {
    name: '活跃度',
    type: 'line',
    data: []
  }
}

export default {
  data: () => ({
    userNum: '加载中',
    postNum: '加载中',
    teasingNum: '加载中'
  }),
  mounted() {
    api.getStat({ type: 'users' }).ok(({ userNum, postNum, teasingNum }) => {
      this.userNum = userNum
      this.postNum = postNum
      this.teasingNum = teasingNum
    })

    api.getStat({ type: 'actives' }).ok(data => {
      const chart = echarts.init(this.$refs.chart)
      chartOptions.series.data = data
      chartOptions.title.text = `今周用户活跃度 总活跃度: ${data.reduce(
        (a, b) => a + b
      )}`
      chart.setOption(chartOptions)
    })
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  flex-direction: column;
  padding: 30px;
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
}

.infos {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex: 1;
  padding: 20px;
  font-size: 28px;
  font-weight: bold;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  background-color: white;
  color: #666;
  overflow: hidden;
}

.info:nth-child(2) {
  margin: 0 40px;
}

.info-title,
.info-text {
  text-align: center;
}

.info-title {
  margin-bottom: 10px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.45);
}

.info-text {
  margin: 0;
  font-weight: bold;
  font-size: 20px;
}

.icon {
  width: 100px;
  height: 100px;
}

.charts {
  margin-top: 40px;
  flex: 1;
  min-height: 0;
}
</style>

