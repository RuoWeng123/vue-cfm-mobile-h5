<template>
  <div class="chart"/>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'lineChart',
  props: ['series'],
  methods: {
    drawChart () {
      !this.chart && (this.chart = echarts.init(this.$el))
      let option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '0%',
          right: '0%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.series[0].data.map(v =>v.date),
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: this.series
        // series: [
        //   {
        //     name: this.config.title,
        //     type: 'line',
        //     barWidth: '60%',
        //     smooth:true,
        //     areaStyle:{
        //       color:{
        //         type:'linear',
        //         x: 0,
        //         y: 1,
        //         x2: 0,
        //         y2: 0,
        //         colorStops: [{
        //           offset: 0, color: '#d3e2ef' // 0% 处的颜色
        //         }, {
        //           offset: 1, color: '#10a3a2' // 100% 处的颜色
        //         }]
        //       }
        //     },
        //     data: this.series
        //   }
        // ]
      }
      this.chart.setOption(option)
    }
  },
  watch: {
    series: {
      immediate: true,
      handler () {
        this.$nextTick(this.drawChart.bind(this))
      }
    }
  }
}
</script>

<style scoped>
.chart {
  height: 280px;
}
</style>
