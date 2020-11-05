<template>
  <div
    class="trust-span"
    :class="currentClass">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'Span',
    props: {
      size: {
        type: String,
        default: 'small'
      },
      bold: {
        type: Boolean,
        default: false
      },
      block: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      currentClass () {
        return [
          `is-${ this.size || 'small' }`,
          {
            'is-bold': this.bold,
            'is-block': this.block
          }
        ]
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-span
    display: inline-block
    font-size: 16px
    color: #404143
    letter-spacing: 0
    text-align: left
    overflow:hidden
    white-space:nowrap
    text-overflow:ellipsis
    &.is-large
      font-size: 18px
      line-height: 30px

    &.is-medium
      font-size: 16px
      line-height: 28px

    &.is-small
      font-size: 14px
      line-height: 26px

    &.is-mini
      font-size: 12px
      line-height: 24px

    &.is-bold
      font-weight: bolder

    &.is-block
      display: block
</style>
