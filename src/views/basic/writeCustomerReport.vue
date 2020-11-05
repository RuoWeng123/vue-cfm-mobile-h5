<template>
  <Page
    title="客户管理"
    :back="true">
    <div class="container">
      <div class="header"></div>
      <div class="content-container"></div>
      <div class="footer"></div>
    </div>

  </Page>
</template>

<script>
import axios from 'axios'

export default {
  name: 'writeCustomerReport',
  data () {
    return {
      overviewList:[
        {value: 30, label:"客户总数"},
        {value: 30, label:"今日新增"},
        {value: 30, label:"今日流失"}
      ],
      chartData: [
        {
          name: '新增客户',
          type: 'line',
          smooth: true,
          data: [
            {date:'08/10', value:20},
            {date:'08/11', value:30},
            {date:'08/12', value:40},
            {date:'08/13', value:55},
            {date:'08/14', value:30},
            {date:'08/15', value:70},
            {date:'08/16', value:80}
          ]
        }
      ]
    }
  },
  methods: {
    onPreview () {
      this.$router.push({
        path: '/basic/menu'
      })
    },
    getChartData () {
      let start_time = new Date().getTime() - 86400000
      let end_time = new Date().getTime()
      /*axios({
        url: `/interface/alarm/historyQuery/list?field=type&start_time=${ start_time }&end_time=${ end_time }`
      }).then(({ data }) => {
        if (data.msg === 'success') {
          this.chartData = data.data
        } else {
          this.chartData =  [
            {
              name: '新增客户',
              type: 'line',
              color: 'green',
              smooth: true,
              data: [10, 13, 11, 34, 90, 20, 100]
            },
            {
              name: '流失客户',
              type: 'line',
              color: 'red',
              smooth: true,
              data: [0, 2, 1, 4, 0, 30, 10]
            },
            {
              name: '暂存客户',
              type: 'line',
              color: 'blue',
              smooth: true,
              data: [15, 23, 41, 94, 120, 130, 210]
            }
          ]
        }
      })*/
    }
  },
  activated () {
    this.getChartData()
  }
}
</script>

<style lang="less" scoped>
.container{
  padding: 10px;
}
.chart-container {
  width: calc(100% - 30px);
}

.flex-wrp {
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: stretch;
  align-content: flex-start;
  background: #f2f6f9;
  border-image: linear-gradient(126deg, rgba(127, 127, 127, 1), rgba(230, 231, 233, 1)) 20 20;
  margin-bottom: 10px;
}

.flex-item {
  width: 30vw;
  height: 80px;
  font-size: 16px;
  padding-top: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 22px;
  text-align: center;
}

.mb10{
  margin-bottom: 10px;
}
.mb16{
  margin-bottom: 16px;
}

</style>
