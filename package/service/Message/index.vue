<template>
  <transition name="trust-message-top">
    <SafeArea
      class="trust-message"
      :class="`is-${type}`"
      v-if="showToast"
      position="top">
      <i
        class="trust-message-icon"
        :class="font"
      />
      <span class="trust-message-text">
        {{msg}}
      </span>
    </SafeArea>
  </transition>
</template>

<script type="text/ecmascript-6">
  import SafeArea from '../../components/SafeArea/index.vue'

  const TYPE = {
    SUCCESS: 'success',
    ERROR: 'error',
    TOOL: 'tool'
  }
  export default {
    components: { SafeArea },
    computed: {
      font () {
        switch (this.type) {
          case TYPE.SUCCESS:
            return 'trust-icon icon_success_fill'
          case TYPE.ERROR:
            return 'trust-icon icon_roundclose_fill'
          case TYPE.TOOL:
            return 'trust-icon icon_report_fill'
          default:
            return 'trust-icon icon_report_fill'
        }
      }
    },
    data () {
      return {
        showToast: false,
        msg: '',
        type: TYPE.TOOL
      }
    },
    methods: {
      open (msg, type, time = 3000) {
        if (!msg) return
        this.msg = msg
        this.type = type
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => this.showToast = false, time)
        this.showToast = true
      },
      show (msg, type, time) {
        this.open(msg, type, time)
      },
      success (msg, time) {
        this.open(msg, TYPE.SUCCESS, time)
      },
      error (msg, time) {
        this.open(msg, TYPE.ERROR, time)
      },
      tool (msg, time) {
        this.open(msg, TYPE.TOOL, time)
      }
    }
  }
</script>

<style
  lang="stylus"
  type="text/stylus"
  rel="stylesheet/stylus">
  .trust-message
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 44px
    line-height: 44px
    display: flex
    align-items: center
    white-space: nowrap
    z-index: 1000
    font-size: 15px
    background-color: #ffffff
    box-shadow: 1px 0 3px #eee
    transition: transform .2s ease

    &.is-error
      color: #FFFFFF
      background-color: #FF5050

    &.is-success
      color: #FFFFFF
      background-color: #46BAFF

      .trust-message-icon
        color: #FFFFFF

    &.is-tool
      color: #FFFFFF
      background-color: #F5A623

      .trust-message-icon
        color: #FFFFFF

    &-icon
      font-size: 24px
      margin: 0 10px
      height: 44px

    &-text
      flex: 1

    &-opacity
      position: absolute
      top: 0
      left: 0
      right: 0
      height: 22px
      background-color: rgba(0, 0, 0, 0.2)


  .trust-message-top
    &-enter, &-leave-active
      transform: translate3d(0, -100%, 0)
</style>
