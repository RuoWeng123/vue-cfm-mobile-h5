<template>
  <ThemeProvider theme="DarkBlue">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="trust-root"/>
      </keep-alive>
    </transition>
  </ThemeProvider>
</template>

<script>
  import { browser } from 'trust'

  export default {
    created () {
      // browser.init()
      // browser.defineBack((payload, callback) => {
      //   if (this.$route.meta.closed) {
      //     callback(false)
      //   } else {
      //     this.$router.back()
      //     callback(true)
      //   }
      //   return true
      // })
    },
    data () {
      return {
        transitionName: 'trust-slider-left'
      }
    },
    watch: {
      $route (to) {
        if (to.meta.name) {
          this.transitionName = to.meta.name
        } else {
          this.transitionName = this.$router.isBack ? 'trust-slider-left' : 'trust-slider-right'
        }
      }
    }
  }
</script>

<!--<style lang="less">-->
<!--  @import "~vux/src/styles/reset.less";-->
<!--</style>-->
<style lang="stylus">
  *
    padding: 0
    margin: 0

  html, body
    width: 100%
    height: 100%

  .trust-root
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    transition: all .3s ease

  .trust-slider-right-enter
    opacity: 0.1
    transform: translate3d(10%, 0, 0)

  .trust-slider-right-leave-active
    transform: translate3d(0%, 0, 0)

  .trust-slider-left-enter
    opacity: 0.1
    transform: translate3d(-10%, 0, 0)

  .trust-slider-left-leave-active
    transform: translate3d(0, 0, 0)


  .inline-block {
    display: inline-block;
  }

  .cGrey {
    color: #aaa !important;
  }

  .cWhite {
    color: #ffffff !important;
  }

  .mt10 {
    margin-top: 10px !important;
  }

  .mt30 {
    margin-top: 30px !important;
  }

  .mt20 {
    margin-top: 20px !important;
  }

  .mt10 {
    margin-top: 10px !important;
  }

  .mt50 {
    margin-top: 50px !important;
  }

  .mt16 {
    margin-top: 16px !important;
  }

  .mt32 {
    margin-top: 32px !important;
  }

  .mt5 {
    margin-top: 5px !important;
  }

  .mb30 {
    margin-bottom: 30px !important;
  }

  .mb16 {
    margin-bottom: 16px !important;
  }

  .mb20 {
    margin-bottom: 20px !important;
  }

  .mb30 {
    margin-bottom: 30px !important;
  }

  .mb32 {
    margin-bottom: 32px !important;
  }

  .mb40 {
    margin-bottom: 40px !important;
  }

  .mb50 {
    margin-bottom: 50px !important;
  }

  .mb24 {
    margin-bottom: 24px !important;
  }

  .mb10 {
    margin-bottom: 10px !important;
  }

  .mb8 {
    margin-bottom: 8px !important;
  }

  .mb5 {
    margin-bottom: 5px !important;
  }
  .ml5 {
    margin-left: 5px !important;
  }

  .ml10 {
    margin-left: 10px !important;
  }

  .ml10 {
    margin-left: 10px !important;
  }

  .ml20 {
    margin-left: 20px !important;
  }

  .ml14 {
    margin-left: 14px !important;
  }

  .ml16 {
    margin-left: 16px !important;
  }

  .ml35 {
    margin-left: 35px !important;
  }

  .ml56 {
    margin-left: 56px !important;
  }

  .ml50 {
    margin-left: 50px !important;
  }

  .mr32 {
    margin-right: 32px !important;
  }

  .mr5 {
    margin-right: 5px !important;
  }

  .mr8 {
    margin-right: 8px !important;
  }

  .mr10 {
    margin-right: 10px !important;
  }

  .mr14 {
    margin-right: 14px !important;
  }

  .mr16 {
    margin-right: 16px !important;
  }

  .mr20 {
    margin-right: 20px !important;
  }

  .mr32 {
    margin-right: 32px !important;
  }

  .mr139 {
    margin-right: 139px !important;
  }

  .mr105 {
    margin-right: 105px !important;
  }

  .mt10 {
    margin-top: 10px !important;
  }

  .mt20 {
    margin-top: 20px !important;
  }

  .pl30 {
    padding-left: 30px !important;
  }

  .pl10 {
    padding-left: 10px !important;
  }

  .pl8 {
    padding-left: 8px !important;
  }


  .pl14 {
    padding-left: 14px !important;
  }

  .pr14 {
    padding-right: 14px !important;
  }

  .pd8 {
    padding: 8px !important;
  }

  .pd16 {
    padding: 16px !important;
  }

  .pd32 {
    padding: 32px !important;
  }

  .pl16 {
    padding-left: 16px !important;
  }

  .pr16 {
    padding-right: 16px !important;
  }

  .pt16 {
    padding-top: 16px !important;
  }

  .pt20 {
    padding-top: 20px !important;
  }

  .pb16 {
    padding-bottom: 16px !important;
  }

  .pt14 {
    padding-top: 14px !important;
  }

  .pt10 {
    padding-top: 10px !important;
  }

  .pb14 {
    padding-bottom: 14px !important;
  }

  .pb10 {
    padding-bottom: 10px !important;
  }

  .pull-right {
    float: right;
  }

  .pull-left {
    float: left;
  }

  .alR {
    text-align: right;
  }

  .alL {
    text-align: left;
  }

  .alC {
    text-align: center;
  }
</style>
