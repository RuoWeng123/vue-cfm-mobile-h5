<template>
  <div
    class="trust-tabs-panel"
    :class="{'is-scroll': scroll}">
    <slot/>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'TabPanel',
    inject: {
      Tabs: {
        default: () => {
          return {}
        }
      }
    },
    props: {
      text: {
        type: String,
        default: ''
      },
      badge: {
        type: Object,
        default: null
      },
      scroll: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
      this.Tabs && this.Tabs.appendPanel(this)
    },
    destroyed () {
      this.Tabs && this.Tabs.removePanel(this)
    }
  }
</script>
