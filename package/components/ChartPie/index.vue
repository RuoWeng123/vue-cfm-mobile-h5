<template>
  <div style="height: 260px;"/>
</template>

<script>
  import echarts from 'echarts'
  import charts from './pie/index.js'

  export default {
    name: 'ChartPie',
    props: {
      source: {},
      options: {}
    },
    computed: {
      currentModel () {
        const { layout = 'SingleDefault' } = this.options || {}
        return charts[layout]
      }
    },
    methods: {
      init () {
        const chart = echarts.init(this.$el)
        this.instance = new this.currentModel(chart, this.options)
        this.instance.render(this.source)
      }
    },
    mounted () {
      this.init()
    },
    watch: {
      source () {
        this.instance && this.instance.render(this.source)
      }
    }
  }
</script>
