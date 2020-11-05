<template>
  <Ripple
    class="trust-headerItem-back"
    @click="onClick">
    <i class="iconfont icon-left"/>
    <!-- <span>返回</span> -->
  </Ripple>
</template>

<script>
  import Ripple from '../../Ripple/index.vue'

  export default {
    props: {
      options: {}
    },
    components: {
      Ripple
    },
    methods: {
      onClick() {
         this.$router.back();
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-headerItem-back
    display: inline-flex
    align-items: center
    justify-content: center
    padding-right: 2px
    height: 40px

    i
      font-size: 20px

    span
      font-family: PingFangSC-Regular
      font-size: 14px
</style>
