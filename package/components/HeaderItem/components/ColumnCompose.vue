<template>
  <Ripple
    class="trust-headerItem-compose"
    @click="onClick">
    {{ currentText  }}
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
      currentIcon () {
        return this.options.icon
      },
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
  .trust-headerItem-compose
    display: inline-flex
    align-items: center
    justify-content: center
    padding: 0 4px
    height: 40px
    font-size: 12px

    i
      margin-left: 3px
      font-size: 15px
</style>
