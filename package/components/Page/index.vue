<template>
  <div
    class="trust-page"
    :style="currentPageStyle">
    <Header
      v-if="header"
      v-bind="$attrs"
      v-on="$listeners">
      <slot
        name="right"
        slot="right"
        v-if="$slots.right"/>
      <slot
        name="title"
        v-if="$slots.title"/>
      <slot
        name="left"
        slot="left"
        v-if="$slots.left"/>
    </Header>
     <slot name="top"/>
    <div class="trust-page-body">
      <slot/>
    </div>
    <SafeArea
      v-if="footer"
      position="bottom"/>
  </div>
</template>

<script>
  import theme from '../../mixins/theme.js'
  import SafeArea from '../SafeArea/index.vue'
  import Header from '../Header/index.vue'

  export default {
    name: 'Page',
    mixins: [theme],
    components: {
      SafeArea,
      Header
    },
    props: {
      header: {
        default: true
      },
      footer: {
        default: true
      },
      bgColor: {}
    },
    computed: {
      currentPageStyle() {
        return {
          background: this.bgColor
        }
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-page
    display: flex
    flex-direction: column
    width: 100%
    height: 100%
    background: #f8f8fa

    &-body
      position: relative
      user-select: none
      overflow: auto
      -webkit-overflow-scrolling: touch
      flex: 1
      overflow-x: hidden
      background: #fff
</style>
