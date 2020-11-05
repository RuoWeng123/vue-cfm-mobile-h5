<template>
  <Popup
    :value="visiable"
    @input="onCancel"
    appendToBody>
    <SafeArea position="bottom">
      <div class="trust-picker-header">
        {{title}}
        <Btn
          size="small"
          class="trust-picker-btn"
          @click="onConfirm">
          确认
        </Btn>
      </div>
      <div class="trust-picker-wrapper">
        <PickerColumn
          v-if="GetVisible('YYYY')"
          v-model="curYear"
          name="year"
          :listData="GetListFromSection(years, TEMPLATE.year)"
          type="circle"
        />
        <PickerColumn
          v-if="GetVisible('MM')"
          v-model="curMonth"
          name="month"
          :listData="GetListFromSection(months, TEMPLATE.month)"
          type="circle"
        />
        <PickerColumn
          v-if="GetVisible('DD')"
          v-model="curDay"
          name="day"
          :listData="GetListFromSection(days, TEMPLATE.day)"
          type="circle"
        />
        <PickerColumn
          v-if="GetVisible('HH')"
          v-model="curHour"
          name="hour"
          :listData="GetListFromSection(hours, TEMPLATE.hour)"
          type="circle"
        />
        <PickerColumn
          v-if="GetVisible('mm')"
          v-model="curMinute"
          name="minute"
          :listData="GetListFromSection(minutes, TEMPLATE.minute)"
          type="circle"
        />
      </div>
    </SafeArea>
  </Popup>
</template>

<script type="text/ecmascript-6">
  import Btn from '../Btn/index.vue'
  import Popup from '../Popup/index.vue'
  import SafeArea from '../SafeArea/index.vue'
  import PickerColumn from './picker.vue'
  import moment from 'moment'

  export default {
    name: 'Picker',
    components: {
      Btn,
      SafeArea,
      Popup,
      PickerColumn
    },
    props: {
      value: {},
      format: {},
      showTemplate: {},
      title: {}
    },
    computed: {
      TEMPLATE() {
        return this.showTemplate ?
          {
            year: '年',
            month: '月',
            day: '日',
            hour: '时',
            minute: '分'
          } :
          {
            year: '',
            month: '',
            day: '',
            hour: '',
            minute: ''
          }
      },
      days() {
        let section = [1, 31]
        let isR = (this.curYear % 4 === 0 && this.curYear % 100 !== 0) || (this.curYear % 400 === 0)
        let c1 = [1, 3, 5, 7, 8, 10, 12].join().indexOf(this.curMonth)
        if (this.curMonth === 2) {
          if (isR) {
            section = [1, 29]
          } else {
            section = [1, 28]
          }
        } else if (c1 < 0) {
          section = [1, 30]
        } else {
          section = [1, 31]
        }
        return section
      }
    },
    data() {
      return {
        visiable: false,
        curYear: null,
        curMonth: null,
        curDay: null,
        curHour: null,
        curMinute: null,
        years: [2000, 2050],
        months: [1, 12],
        hours: [0, 23],
        minutes: [0, 59]
      }
    },
    methods: {
      GetVisible(key) {
        if (this.format.indexOf(key) < 0) return false
        return true
      },
      GetListFromSection(section, key) {
        return Array.from({ length: section[1] - section[0] + 1 }, (value, index) => section[0] + index + key)
      },
      show() {
        this.visiable = true
        this.initDate(this.value)
      },
      initDate(current) {
        let date = {}
        if (current) {
          let arr = current.split(/[- : \/]/)
          date = moment(new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4]))
        } else {
          date =  moment(new Date())
        }
        // const date = moment(current ? Date.parse(current) : new Date())
        this.curYear = date.year() + this.TEMPLATE.year
        this.curMonth = date.month() + 1 + this.TEMPLATE.month
        this.curDay = date.date() + this.TEMPLATE.day
        this.curHour = date.hour() + this.TEMPLATE.hour
        this.curMinute = date.minute() + this.TEMPLATE.minute
      },
      onCancel() {
        this.visiable = false
      },
      onConfirm() {
        const fn = (val) => {
          val = ('00' + val)
          return val.substring(val.length - 3, val.length - 1)
        }
        let time = `${ this.curYear }-${ fn(this.curMonth) }-${ fn(this.curDay) } ${ fn(this.curHour) }:${ fn(this.curMinute) }`
        time = Object.values(this.TEMPLATE).reduce((result, v) => {
          result = result.replace(v, '')
          return result
        }, time)
        time = moment(time).format(this.format)
        this.$emit('input', time)
        this.visiable = false
      }
    }
  }
</script>

<style
  lang="stylus"
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
