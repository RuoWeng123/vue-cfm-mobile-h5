<template>
  <img
    v-bind="$attrs"
    v-on="$listeners"
    :src="currentSrc"
    @error="onError"
  />
</template>

<script>
  export default {
    name: "Img",
    props: {
      src: {},
      errorSrc: {}
    },
    computed: {
      currentSrc() {
        return this.error ? this.errorSrc : this.src
      }
    },
    data() {
      return {
        error: false
      }
    },
    methods: {
      onError() {
        this.error = true
      }
    }
  }
</script>

<style>
</style>
