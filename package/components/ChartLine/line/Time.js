import echarts from 'echarts'

class Time {

  constructor (chart, params = {}) {
    this._chart = chart
    this._params = params
  }

  render (source) {
    const option = this.getOptions({ source, ...this._params })
    this._chart.setOption(option)
  }

  getOptions ({ source, formatter, maxName = '报警值', xAxisType = 'category', maxValue, color = '#708DE8', gradientColor = ['rgba(112, 141, 232, 1)', 'rgba(61, 84, 205, 0)'] }) {
    const markLine = maxValue ? {
      data: [{
        name: maxName,
        yAxis: maxValue,
        lineStyle: {
          normal: {
            color: '#F91948'
          }
        }
      }]
    } : {}

    return {
      tooltip: {
        trigger: 'axis',
        formatter,
        position: function (pt) {
          return [pt[0], '10%']
        }
      },
      grid: {
        top: 20,
        left: '12%',
        bottom: 40,
        right: '5%'
      },
      dataZoom: [{
        type: 'inside',
        realtime: true,
        start: 90,
        end: 100,
        minValueSpan: 200,
        filterMode: 'none'
      }],
      xAxis: {
        type: xAxisType,
        boundaryGap: false,
        axisLine: {
          symbol: ['none', 'arrow'],
          symbolSize: [5, 5],
          symbolOffset: [0, 5]
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        axisLine: {
          symbol: ['none', 'arrow'],
          symbolSize: [5, 5],
          symbolOffset: [0, 5]
        }
      },
      series: [
        {
          type: 'line',
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          itemStyle: {
            color: color
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: gradientColor[0]
            }, {
              offset: 1,
              color: gradientColor[1]
            }])
          },
          data: source,
          markLine: markLine
        }
      ]
    }
  }
}

export default Time
