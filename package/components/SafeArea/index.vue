<template>
  <div
    class="trust-safeArea"
    :class="currentClass">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'SafeArea',
    props: {
      position: {}
    },
    computed: {
      currentPlatform () {
        const isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        return isIOS ? 'ios' : 'android'
      },
      currentClass () {
        return [
          `is-${this.currentPlatform}`,
          `is-${this.position}`
        ]
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-safeArea
    &.is-ios
      &.is-top
        padding-top: constant(safe-area-inset-top)
        padding-top: env(safe-area-inset-top)

      &.is-bottom
        padding-bottom: constant(safe-area-inset-bottom)
        padding-bottom: env(safe-area-inset-bottom)

    &.is-android
      &.is-top
        padding-top: 24px

</style>
