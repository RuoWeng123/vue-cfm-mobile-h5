class SingleDefault {

  constructor (chart, params = {}) {
    this._chart = chart
    this._params = params
  }

  render (source) {
    const option = this.getOptions({ source, ...this._params })
    this._chart.setOption(option)
  }

  getOptions ({ source = [], color, serieName }) {
    const legendData = source.map(v => v.name)
    return {
      color: color,
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        top: '10',
        right: '10',
        align: 'right',
        data: legendData,
        textStyle: {
          color: '#FFFFFF'
        }
      },
      series: [
        {
          name: serieName,
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
              textStyle: {
                fontSize: '22',
                fontWeight: 'bold'
              }
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '22',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: source
        }
      ]
    }
  }
}

export default SingleDefault
