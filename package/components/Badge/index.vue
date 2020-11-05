<template>
  <sup
    class="trust-badge"
    :class="{ 'is-dot': isDot }"
    :style="currentStyle"
    v-if="currentValue || isDot">
    {{currentValue}}
  </sup>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Badge',
    props: {
      value: {
        type: [String, Number]
      },
      isDot: {
        type: Boolean,
        default: false
      },
      max: {
        type: Number,
        default: 99
      },
      color: {}
    },
    computed: {
      currentStyle() {
        return { backgroundColor: this.color }
      },
      currentValue() {
        if (typeof this.value === 'string') {
          return this.value
        } else if (typeof this.value === 'number') {
          return this.value > this.max ? this.max + '+' : this.value
        }
        return ''
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-badge
    position: absolute
    top: 0
    left: 100%
    display: inline-block
    vertical-align: super
    text-align: center
    white-space: nowrap
    font-weight: normal
    line-height: 18px

    min-height 6px;
    min-width : 0px
    font-size: 12px
    border-radius: 10px
    padding: 0px 3px
    transform: translateX(-50%) translateY(-50%)
    color: #ffffff
    background-color: red

    &.is-dot
      padding: 0
      border: 0
      top: 0
      left: 100%
      width: 8px
      height: 8px
      border-radius: 50%
      font-size: 0
</style>
