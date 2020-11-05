<template>
  <div class="trust-autoLoading">
    <slot
      v-if="loaded"
    />
    <Loading
      v-bind="$attrs"
      v-else
    />
  </div>
</template>

<script>
  import Loading from "../Loading/index.vue"

  const Hook = {
    activeated: 'activeated',
    created: 'created'
  }

  export default {
    name: "AutoLoading",
    components: { Loading },
    props: {
      hook: {
        type: String,
        default: Hook.activeated
      },
      always: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        loaded: false
      }
    },
    created() {
      this.hook === Hook.created && this.onLoading()
    },
    activated() {
    
      this.hook === Hook.activeated && this.onLoading()
    },
    methods: {
      onLoading() {
        this.always && (this.loaded = false)
        this.$emit('load', () => this.loaded = true)
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-autoLoading
    width: 100%
    height: 100%
    overflow: auto
    -webkit-overflow-scrolling: touch
</style>
