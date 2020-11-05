<template>
  <div
    class="trust-panel"
    @click="$emit('click')">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'Panel'
  }
</script>

<style
  lang="stylus"
  type="text/stylus"
  rel="stylesheet/stylus">
  .trust-panel
    margin: 10px
    padding: 16px
    background: #FFFFFF
    box-shadow: 0 2px 10px 0 rgba(15, 0, 121, 0.09)
    border-radius: 2px
</style>
