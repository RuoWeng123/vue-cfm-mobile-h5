<template>
  <div class="trust-form">
    <div class="trust-form-wrapper">
      <slot/>
    </div>
    <slot
      v-if="$slots.btn"
      name="btn"
    />
  </div>
</template>

<script type="text/ecmascript-6">
 import { service } from 'trust'
  export default {
    name: 'Form',
    provide () {
      return {
        FormProvider: this
      }
    },
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      model: {
        type: Object,
        default () {
          return {}
        }
      },
      rules: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {
      formatDate (current) {
        let date = new Date(current)
        const y = date.getFullYear()
        let M = date.getMonth() + 1
        M = M < 10 ? '0' + M : M
        let d = date.getDate()
        d = d < 10 ? '0' + d : d
        let h = date.getHours()
        h = h < 10 ? '0' + h : h
        let m = date.getMinutes()
        m = m < 10 ? '0' + m : m
        let s = date.getSeconds()
        s = s < 10 ? '0' + s : s
        return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s
      },
    },
    watch: {
      model (value) {
        if(!value.content) {
          return false
        }
        const date_12 = 12 * 60 * 60 * 1000
        let dateNew = new Date()
        let dateStr = dateNew.getTime()
    
       if(this.model.content){
         if (this.model.content.startTime) {
          let startTime = this.model.content.startTime
          let sStr = new Date(startTime.replace(/-/g,'/')).getTime()
          if (sStr < dateStr - 100000) {
            this.model.content.startTime = this.formatDate(dateStr)
            service.message.error('开始时间不能小于当前时间！')
          }
        }
        if (this.model.content.endTime) {
          let endTime = this.model.content.endTime
          let eStr = new Date(endTime.replace(/-/g,'/')).getTime()
          if (this.model.content.startTime) {
            let startTime = this.model.content.startTime
            let sStr = new Date(startTime.replace(/-/g,'/')).getTime()
            if (sStr > eStr) {
              this.model.content.endTime = this.formatDate(sStr + 60000)
              service.message.error('结束时间不能小于开始时间！')
            }
            if (eStr - sStr > date_12) {
              this.model.content.endTime = this.formatDate(sStr + date_12)
              service.message.error('作业时长不能超过12小时！')
            }
          } else {
            if (eStr < dateStr - 100000) {
              this.model.content.endTime = this.formatDate(dateStr)
              service.message.error('结束时间不能小于当前时间！')
            }
          }
        }
       }
        
        // if (this.startTime && this.endTime) {
        //   console.log(1)
        // } else if(this.startTime) {
        //   console.log(1)
        //   if (this.startTime !== this.model.content.startTime) {
        //     let str = this.model.content.startTime.replace(/-/g,'/')
        //     console.log(new Date(str).getTime())
        //     this.startTime = this.model.content.startTime
        //   }
        // } else {
        //   this.startTime = this.model.content.startTime
        // }
        // this.model.content.startTime = '2020-03-04 13:31'
        // console.log(this.model)
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-form
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    box-sizing: border-box

    &-wrapper
      flex: 1
      background-color: transparent
      overflow-x: hidden
      overflow-y: auto
      -webkit-overflow-scrolling: touch
</style>
