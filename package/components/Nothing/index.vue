<template>
  <div class="trust-nothing">
    <span class="trust-nothing-wrap">
      <i class="trust-nothing-icon trust-icon icon_nothing"/>
      <p class="trust-nothing-text">{{ label }}</p>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Nothing',
  props: {
    label: {
      type: String,
      default: '暂无内容'
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-nothing
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    height: 100%
    text-align: center
    color: #d1d1d1

    &-wrap
      position: relative
      top: -40px

    &-icon
      font-family: PingFangSC-Regular
      font-size: 80px

    &-text
      margin-top: 10px
      font-family: PingFangSC-Regular
      font-size: 16px
</style>
