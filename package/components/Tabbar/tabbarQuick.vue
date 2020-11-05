<template>
  <yt-view
    @click="doClick"
    class="trust-tabbar-quick">
    <slot>
      <i class="trust-icon icon_add"/>
    </slot>
  </yt-view>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'TabbarQuick',
    props: {
      index: {
        type: Number
      }
    },
    methods: {
      doClick (e) {
        this.$emit('click', e)
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-tabbar-quick
    width: 70px
    height: 55px
    line-height: 55px
    text-align: center
    background-color: #3d54cd

    i
      font-size: 24px
      color: #ffffff
</style>
