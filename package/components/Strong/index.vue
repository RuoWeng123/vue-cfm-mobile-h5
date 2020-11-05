<template>
  <span
    class="trust-strong"
    :style="currentStyle"
    :class="`is-${ type }`">
    <slot/>
  </span>
</template>

<script>
  export default {
    name: 'Strong',
    props: {
      size: {
        type: String,
        default: '140%'
      },
      type: {}
    },
    computed: {
      currentStyle () {
        return {
          fontSize: this.size
        }
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-strong
    &.is-success
      color: #0AB877

    &.is-error
      color: #E6394E

    &.is-outline
      color: #D7D7D9
</style>
