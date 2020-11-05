class SingleDefault {

  constructor (chart, params = {}) {
    this._chart = chart
    this._params = params
  }

  render (source) {
    const option = this.getOptions({ source, ...this._params })
    this._chart.setOption(option)
  }

  getOptions ({ source = [], color = ['#4267E0'], seriesName }) {
    const xAxisData = source.map(v => v.name)
    const seriesData = source.map(v => v.value)
    return {
      color: color,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: 20,
        left: '12%',
        bottom: 40,
        right: '6%'
      },
      xAxis: [
        {
          type: 'category',
          data: xAxisData,
          axisLine: {
            symbol: ['none', 'arrow'],
            symbolSize: [5, 5],
            symbolOffset: [0, 5]
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            symbol: ['none', 'arrow'],
            symbolSize: [5, 5],
            symbolOffset: [0, 5]
          }
        }
      ],
      series: [
        {
          name: seriesName,
          type: 'bar',
          barWidth: '60%',
          data: seriesData
        }
      ]
    }

  }
}

export default SingleDefault
