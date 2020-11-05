<template>
  <div class="trust-tabbar-panel">
    <slot/>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'TabbarPanel',
    inject: {
      Tabbar: {
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
      font: {
        type: String,
        default: ''
      },
      activeFont: {
        type: String,
        default: ''
      },
      src: {
        type: String,
        default: ''
      },
      activeSrc: {
        type: String,
        default: ''
      },
      badge: {
        type: Object
      }
    },
    mounted() {
      this.Tabbar && this.Tabbar.appendPanel(this)
    },
    destroyed() {
      this.Tabbar && this.Tabbar.removePanel(this)
    }
  }
</script>
