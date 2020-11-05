<template>
  <Spinner
    v-bind="$attrs"
    :class="`is-${position}`"
    class="trust-loading"/>
</template>

<script>
  import Spinner from '../Spinner/index.vue'

  export default {
    name: 'Loading',
    props: {
      position: {
        type: String,
        default: 'top'
      }
    },
    components: { Spinner }
  }
</script>

<style
  lang="stylus"
  type="text/stylus"
  rel="stylesheet/stylus">
  .trust-loading
    position: absolute
    left: 50%

    &.is-top
      top: 40px
      transform: translate3d(-50%, 0, 0)

    &.is-bottom
      bottom: 40px
      transform: translate3d(-50%, 0, 0)

    &.is-center
      top: 50%
      transform: translate3d(-50%, -50%, 0)
</style>
