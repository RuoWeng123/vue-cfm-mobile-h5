<template>
  <Popup :value="visiable"
         @input="onCancel"
         appendToBody>
    <van-datetime-picker
      v-model="currentDate"
      type="datetime"
      :min-date="minDate"
      :max-date="maxDate"
      :formatter="formatter"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </Popup>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import { DatetimePicker } from 'vant'
  import moment from 'moment'
  import Popup from '../Popup/index.vue'
  import '../../../node_modules/vant/lib/picker/index.css'
  import '../../../node_modules/vant/lib/datetime-picker/style/index'

  Vue.use(DatetimePicker)
  export default {
    name: 'Picker',
    components: {
      Popup,
    },
    props: {
      value: {},
      format: {},
      showTemplate: {},
      title: {},
      minDate: {},//date类型
      maxDate: {}
    },
    computed: {},
    data () {
      return {
        visiable: false,
        currentDate: new Date(),
      }
    },

    methods: {

      formatter (type, val) {

        if (type === 'year') {
          return `${val}年`
        } else if (type === 'month') {
          return `${val}月`
        } else if (type === 'day') {
          return `${val}日`
        } else if (type === 'hour') {
          return `${val}时`
        } else if (type === 'minute') {
          return `${val}分`
        }
        return val
      },
      show () {
        this.visiable = true
        this.initDate(this.value)
      },
      initDate (current) {
        let date = {}
        if (current) {
          let arr = current.split(/[- : \\/]/)
          date = moment(new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4]))
        } else {
          date = moment(new Date())
        }
        // console.log(this.TEMPLATE)
        // // const date = moment(current ? Date.parse(current) : new Date())
        // this.curYear = date.year() + this.TEMPLATE.year
        // this.curMonth = date.month() + 1 + this.TEMPLATE.month
        // this.curDay = date.date() + this.TEMPLATE.day
        // this.curHour = date.hour() + this.TEMPLATE.hour
        // this.curMinute = date.minute() + this.TEMPLATE.minute
      },
      onCancel () {
        this.visiable = false
      },
      onConfirm (val) {
        let time = moment(val).format(this.format)
        this.$emit('input', time)
        this.visiable = false
      }
    }
  }
</script>

<style lang="stylus"
       rel="stylesheet/stylus"
       type="text/stylus">
  .trust-picker
    &-header
      position: relative
      text-align: center
      line-height: 42px
      font-size: 14px
      color: #333333
      border-bottom: 1px solid #e9e9e9

    &-btn
      position: absolute
      right: 10px
      top: 50%
      transform: translate3d(0, -50%, 0)
      font-weight: bold

    &-wrapper
      display: flex

    &-select
      &-item
        position: relative
        width: 100%
        height: 220px
        text-align: center
        background-color: #fff
        overflow: hidden

      &-ul
        position: relative

      &-line, &-list, &-wheel
        position: absolute
        left: 0
        right: 0
        top: 93px

      &-line
        z-index: 3

      &-list
        z-index: 2
        background: #fff

      &-wheel
        z-index: 1

      &-line
        &:after, &:before
          position: absolute
          top: 0
          content: ''
          display: table
          background: #cccccc
          width: 100%
          height: 2px
          -webkit-transform: scaleY(0.5)
          transform: scaleY(0.5)
          -webkit-transform-origin: 0 0
          transform-origin: 0 0

        &:before
          bottom: -1px
          top: auto


      &-line, &-list
        height: 34px
        transform: translate3d(0px, 0px, 110px)

      &-list
        overflow: hidden

      &-list-item
        color: #333333
        text-shadow: 0 1px 1px rgba(102, 102, 102, 0.6)

      &-list-item, &-wheel-item
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
        line-height: 34px
        font-size: 18px

        &.hidden
          visibility: hidden
          opacity: 0

      &-wheel
        transform-style: preserve-3d
        height: 34px

      &-wheel-item
        backface-visibility: hidden
        position: absolute
        top: 0
        width: 100%
        color: #a8a8a8
</style>
