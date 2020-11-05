<template>
  <Ripple
    @click="handlerClick"
    class="trust-tabs-item">
    <p
      v-if="panel && panel.text"
      class="trust-tabs-text">
      {{panel.text}}
      <Badge
        v-if="panel && panel.badge"
        class="trust-tabs-badge"
        v-bind="panel.badge"/>
    </p>
  </Ripple>
</template>

<script type="text/ecmascript-6">
  import Ripple from '../Ripple/index.vue'
  import Badge from '../Badge/index.vue'

  export default {
    inject: {
      Tabs: {
        default: () => ({})
      }
    },
    components: { Ripple, Badge },
    props: {
      panel: {}
    },
    methods: {
      handlerClick (e) {
        this.$emit('click', e)
      }
    },
    mounted () {
      this.Tabs && this.Tabs.appendTab(this)
    },
    destroyed () {
      this.Tabs && this.Tabs.removeTab(this)
    }
  }
</script>
