<template>
  <Ripple
    class="trust-headerItem-icon"
    @click="onClick"
    circle>
    <i :class="currentIcon"/>
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
    computed: {
      currentIcon() {
        return this.options.icon
      },
      currentClick() {
        return this.options.click
      }
    },
    methods: {
      onClick(...args) {
        this.currentClick && this.currentClick(...args)
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-headerItem-icon
    display: inline-flex
    width: 32px
    height: 32px
    margin-bottom: 4px
    align-items: center
    justify-content: center

    i
      font-size: 18px
</style>
