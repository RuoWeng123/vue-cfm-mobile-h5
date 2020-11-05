<template>
<div id="weatherChart" style="height: 200px;width:100%" />
</template>

<script>
import echarts from 'echarts'
// import charts from './line/index.js'
let default_color = {
  tc: "#999999",
};
export default {
  name: 'FhpChartLine',
  props: {
    data: {}
  },
  methods: {
    chartFuZai(color, id, data) {
      let chartOptionStartUp = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            crossStyle: {
              color: color.tc
            },
            color: color.tc
          },
          formatter: (value) => {
            let formatterText = ""
            let time = value[0].axisValue
            value.forEach(element => {
              let value = "";
              if (element.data) {
                value = element.data;
              } else {
                value = "——";
              }
              formatterText +=
                "<br/>" +
                element.seriesName + '温度' +
                " : " +
                value + "℃"
            });
            return time + formatterText;
          }
        },
        legend: {
          data: ['调度楼', '121皮带机头', '一号线筒仓'],
          x: "center",
          y: "3%",
          textStyle: {
            color: color.tc,
            fontSize: '12px'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          show: false,
          data: data.time,
          boundaryGap: true,
          axisLabel: {
            inside: false,
            textStyle: {
              color: color.tc
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: ["#efefef"],
              width: 1,
              type: "solid"
            }
          },
          axisLabel: {
            textStyle: {
              color: color.tc
            },
          },
          axisLine: {
            lineStyle: {
              color: '#efefef', 
            }
          }
        },
        series: data.series
      };
      let chartStartUp = echarts.init(document.getElementById(id));
      chartStartUp.setOption(chartOptionStartUp);
    },
  },
  mounted() {
    console.log(this.data)
    //this.init()
    //this.chartFuZai(default_color, 'weatherChart')
    this.chartFuZai(default_color, 'weatherChart', this.data)
  },
  computed: {
    chartData() {
      this.chartFuZai(default_color, 'weatherChart')
      return this.data
    }
  },
  watch: {
    data() {
      console.log(this.data)
      this.chartFuZai(default_color, 'weatherChart')
      this.instance && this.instance.render(this.data)
    }
  }
}
</script>
