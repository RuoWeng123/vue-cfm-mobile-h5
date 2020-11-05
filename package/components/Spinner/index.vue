<template>
  <span
    class="trust-spinner"
    :class="[`trust-spinner__${type}`]"
    :style="styles"/>
</template>

<script>
  import Spinner from './spinner'

  export default {
    name: 'Spinner',
    mounted () {
      Spinner(this.$el, this.type, this.size)
    },
    props: {
      type: {
        type: String,
        default: 'ios'
      },
      size: {
        type: String,
        default: '28px'
      },
      color: {
        type: String,
        default: null
      }
    },
    computed: {
      styles () {
        return {
          width: this.size,
          height: this.size,
          stroke: this.color,
          fill: this.color
        }
      }
    }
  }
</script>

<style
  lang="stylus"
  type="text/stylus"
  rel="stylesheet/stylus">
  .trust-spinner
    vertical-align: middle
    display: inline-block
    width: 28px
    height: 28px
    stroke: #333
    fill: #333

    svg
      width: 28px
      height: 28px

    &__spiral

      .start
        stop-color: #fff
        stop-opacity: 0

      .stop
        stop-color: #333
</style>
