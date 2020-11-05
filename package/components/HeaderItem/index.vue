<template>
  <component
    :is="currentLayout"
    :options="options"/>
</template>

<script>
  import components from './components/index.js'

  export default {
    name: 'HeaderItem',
    props: {
      options: {}
    },
    computed: {
      currentLayout () {
        return components['Column' + this.options.layout]
      }
    }
  }
</script>
