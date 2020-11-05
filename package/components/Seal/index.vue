<template>
  <div
    class="trust-seal"
    :class="`is-${type}`"
    :style="sealStyle">
    <i
      class="trust-seal-icon trust-icon icon_circle"
      :style="iconStyle"
    />
    <span
      class="trust-seal-label"
      :style="labelStyle">
      {{ label }}
    </span>
  </div>
</template>

<script>
export default {
  name: "Seal",
  props: {
    type: {},
    label: {},
    size: {
      default: '90px'
    },
    rotate: {
      default: -30
    }
  },
  computed: {
    sealStyle() {
      return {
        width: this.size,
        height: this.size,
        lineHeight: this.size
      }
    },
    iconStyle() {
      return {
        fontSize: this.size
      }
    },
    labelStyle() {
      return {
        transform: `rotate(${ this.rotate }deg)`
      }
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-seal
    position: relative
    text-align: center

    &.is-green
      color: #0AB877

    &.is-blue
      color: #46BAFF

    &.is-red
      color: #E6394E

    &.is-gray
      color: #D7D7D9

    &.is-yellow
      color: #F5A623

    &-label
      display: inline-block

    &-icon
      position: absolute
      top: 0
      left: 0
</style>
