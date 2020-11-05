<template>
  <div
    class="trust-btnGroup"
    :class="currentClass">
    <slot/>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'BtnGroup',
    provide () {
      return {
        BtnGroup: this
      }
    },
    computed: {
      currentClass () {
        return {
          'is-edge': this.edge,
          'is-noBorder': this.noBorder
        }
      }
    },
    props: {
      edge: Boolean,
      noBorder: Boolean
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-btnGroup
    position: relative
    display: flex
    padding: 0 5px
    margin: 10px 0

    .trust-button
      flex: 1
      margin: 0 5px

    &.is-edge
      margin: 0
      padding: 0

      .trust-button
        margin: 0
        border-radius: 0

    &.is-noBorder

      .trust-button
        border: none
</style>
