<template>
  <div class="trust-popup">
    <transition name="trust-popup-fade">
      <div
        :class="maskClass"
        v-if="currentValue && mask"
        @click="currentValue = false"/>
    </transition>
    <transition :name="transitionName">
      <div
        v-if="currentValue"
        class="trust-popup-body"
        :class="bodyClass"
        :style="bodyStyle">
        <slot/>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import browser from '../../browser.js'

  export default {
    name: 'Popup',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      pos: {
        type: String,
        default: 'bottom'
      },
      fixed: {
        type: Boolean,
        default: false
      },
      mask: {
        type: Boolean,
        default: true
      },
      width: {
        type: String,
        default: '70%'
      },
      height: {
        type: String,
        default: null
      },
      scroll: {
        type: Boolean,
        default: false
      },
      appendToBody: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      maskClass() {
        return [
          'trust-popup-mask',
          { 'is-fixed': this.fixed }
        ]
      },
      bodyClass() {
        return [
          `is-${ this.pos }`,
          { 'is-fixed': this.fixed },
          { 'is-scroll': this.scroll }
        ]
      },
      bodyStyle() {
        return {
          width: (this.pos === 'left' || this.pos === 'right') ? this.width : null,
          height: (this.pos === 'top' || this.pos === 'bottom') ? this.height : null
        }
      },
      currentValue: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value)
        }
      },
      transitionName() {
        return `trust-popup-${ this.pos }`
      }
    },
    mounted() {
      if (this.appendToBody) {
        document.body.appendChild(this.$el)
      }
    },
    destroyed() {
      if (this.appendToBody && this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
    },
    watch: {
      currentValue: {
        immediate: true,
        handler(val) {
          if (val) {
            this.$backInstance = browser.defineBack((payload, callback) => {
              this.currentValue = false
              callback(true)
              return true
            })
          } else {
            this.$backInstance && this.$backInstance()
          }
        }
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-popup
    &-mask
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      /* overflow: hidden */
      z-index: 1000
      background: rgba(0, 0, 0, 0.75)
      transition: all .3s cubic-bezier(.645, .045, .355, 1)

      &.is-fixed
        position: fixed

    &-body
      position: absolute
      overflow: hidden
      z-index: 1000
      background: #ffffff
      transition: all .3s cubic-bezier(.645, .045, .355, 1)
      box-shadow: 0 1px 20px rgba(0, 0, 0, 0.2)

      &.is-fixed
        position: fixed

      &.is-scroll
        overflow: auto
        -webkit-overflow-scrolling: touch

        &::-webkit-scrollbar
          display: none

      &.is-bottom
        left: 0
        right: 0
        bottom: 0

      &.is-top
        left: 0
        right: 0
        top: 0

      &.is-right
        top: 0
        bottom: 0
        right: 0
        width: 70%

      &.is-left
        top: 0
        bottom: 0
        left: 0
        width: 70%

      &.is-center
        left: 50%
        top: 50%
        width: 84%
        border-radius: 8px
        transform: translate3d(-50%, -50%, 0)

  .trust-popup
    &-fade
      &-enter, &-leave-active
        opacity: 0

    &-bottom
      &-enter, &-leave-active
        transform: translate3d(0, 100%, 0)

    &-right
      &-enter, &-leave-active
        transform: translate3d(100%, 0, 0)

    &-top
      &-enter, &-leave-active
        transform: translate3d(0, -100%, 0)

    &-left
      &-enter, &-leave-active
        transform: translate3d(-100%, 0, 0)

    &-center
      &-enter
        opacity: 0
        transform: translate3d(-50%, -50%, 0) scale(1.185) !important

      &-leave-active
        opacity: 0
        transform: translate3d(-50%, -50%, 0) !important

    &-scale
      &-enter, &-leave-active
        opacity: 0
        transform: scale(0)
</style>
