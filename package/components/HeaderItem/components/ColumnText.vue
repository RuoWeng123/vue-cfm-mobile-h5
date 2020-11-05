<template>
  <Ripple
    class="trust-headerItem-text"
    @click="onClick">
    {{ currentText }}
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
      currentText () {
        return this.options.text
      },
      currentClick () {
        return this.options.click
      }
    },
    methods: {
      onClick (...args) {
        this.currentClick && this.currentClick(...args)
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-headerItem-text
    display: inline-flex
    align-items: center
    justify-content: center
    padding: 0 8px
    height: 40px
    font-size: 14px
</style>
