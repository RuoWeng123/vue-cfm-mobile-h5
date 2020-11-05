<template>
  <transition name="trust-view-fade">
    <div
      class="trust-view-ripple"
      :style="styles"/>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { merge } from '../../utils/merge.js'

  export default {
    props: {
      mergeStyle: {
        type: Object,
        default () {
          return {}
        }
      },
      color: {
        type: String,
        default: ''
      },
      opacity: {
        type: Number
      }
    },
    computed: {
      styles () {
        return merge({}, { color: this.color, opacity: this.opacity }, this.mergeStyle)
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-view
    &-ripple
      position: absolute
      width: 100%
      height: 100%
      left: 0
      top: 0
      pointer-events: none
      user-select: none
      border-radius: 50%
      background-color: rgba(0, 0, 0, 0.75)
      background-clip: padding-box
      opacity: 0.1
      transition: opacity .8s ease, transform .3s ease

  .trust-view-fade
    &-enter
      transform: scale(0)

    &-leave-active
      opacity: 0 !important
</style>
