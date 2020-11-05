<template>
  <div
    class="w-panel"
    @click="$emit('click')">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'WeatherPanel'
  }
</script>

<style
  lang="stylus"
  type="text/stylus"
  rel="stylesheet/stylus">
  .w-panel
    margin: 10px
    margin-bottom :20px
    padding: 16px
    background: #F8F8FA
    border-radius: 4px
    box-shadow: 0 2px 10px 0 rgba(15, 0, 121, 0.09)
</style>
