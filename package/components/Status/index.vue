<template>
  <span
    class="trust-status"
    :class="label ? '' : `is-${type}`" v-html="label">
    <slot/>
  </span>
</template>

<script>
export default {
  name: 'Status',
  props: {
    label: {},
    type: {}
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-status
    font-family: PingFangSC-Regular
    font-size: 14px
    color: #666666
    margin-left : 20px;
    &.is-transparent
      &::before
        background: transparent

    &.is-green
      &::before
        background: #0AB877

    &.is-blue
      &::before
        background: #46BAFF

    &.is-red
      &::before
        background: #E6394E

    &.is-gray
      &::before
        background: #D7D7D9

    &.is-yellow
      &::before
        background: #F5A623

    &.is-one
      &::before
        background: #F5A623

    &.is-two
      &::before
        background: #ff8c00

    &.is-therr
      &::before
        background: #ed4c38

    &::before
      content: " "
      display: inline-block
      width: 10px
      height: 10px
      margin-right : 5px
      border-radius: 50%
</style>
