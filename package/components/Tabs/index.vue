<template>
  <div class="trust-tabs">
    <div
      class="trust-tabs-header"
      ref="header">
      <tab-item
        @click="active = index"
        v-for="(panel, index) in panels"
        :key="index"
        :panel="panel"
        :style="getTabStyle(index)"
        :active="active === index"/>
      <div
        class="trust-tabs-line"
        ref="line"/>
    </div>
    <TabPanles
      class="trust-tabs-container"
      @move="_moveLine"
      @reset="_resetLine"
      v-model="active"
      :panels="panels"
      :slider="slider"
      listen>
      <slot/>
    </TabPanles>
  </div>
</template>

<script type="text/ecmascript-6">
  import theme from '../../mixins/theme.js'
  import tabItem from './tabItem'
  import TabPanles from '../TabPanles/index.vue'
  import { requestAnimationFrame } from '../../utils/requestAnimationFrame.js'

  export default {
    name: 'Tabs',
    mixins: [theme],
    provide() {
      return {
        Tabs: this
      }
    },
    components: { tabItem, TabPanles },
    props: {
      value: {
        type: Number,
        default: 0
      },
      slider: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      active: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('input', val)
        }
      }
    },
    data() {
      return {
        panels: [],
        tabItems: []
      }
    },
    methods: {
      _setLine(line, left, width) {
        line.setAttribute('style', `left: ${ left }px; width: ${ width }px; color: ${ this.$theme.color_active }`)
      },

      _resetLine() {
        let line = this.$refs.line
        if (!line) return
        let el = this.tabItems[this.active].$el
        let left = el.offsetLeft
        let width = el.offsetWidth
        this._setLine(line, left, width)
      },

      _moveLine(percent) {
        let line = this.$refs.line
        let len = this.tabItems.length
        if (!line || len === 0 || this.active < 0 || this.active >= this.panels.length) return
        let el = this.tabItems[this.active].$el
        let nextIndex = percent < 0 ? Math.min(this.active + 1, this.tabItems.length - 1) : Math.max(this.active - 1, 0)
        if (nextIndex === this.active) return
        let nextEl = this.tabItems[nextIndex].$el
        let left = el.offsetLeft
        let width = el.offsetWidth
        let nextLeft = nextEl.offsetLeft
        let nextWidth = nextEl.offsetWidth
        let deltaLeft = (nextLeft - left) * percent / 100
        let deltaWidth = (nextWidth - width) * percent / 100
        left = percent < 0 ? left - deltaLeft : left + deltaLeft
        width = percent < 0 ? width - deltaWidth : width + deltaWidth
        this._setLine(line, left, width)
      },

      _handler(val = this.active) {
        let len = this.tabItems.length
        if (len === 0) return
        val = val < 0 ? 0 : val
        val = val >= len ? len - 1 : val
        let el = this.tabItems[val].$el
        if (val !== len - 1) {
          this._scrollHeader(el)
        }
        this._scrollLine(el)
      },

      _scrollLine(el) {
        let line = this.$refs.line
        let left = el.offsetLeft
        let width = el.offsetWidth
        line && this._setLine(line, left, width)
      },

      _scrollHeader(el) {
        let header = this.$refs.header
        let rect = el.getBoundingClientRect()
        let move = window.innerWidth / 2 - (rect.x + rect.width / 2)
        if (header) {
          this._setScroll(header, header.scrollLeft, -move, 'scrollLeft')
        }
      },

      _setScroll(el, start, move, direction = 'scrollLeft') {
        let count = 0
        const step = () => {
          const scrollDuration = 15
          el[direction] += move / scrollDuration
          if (++count < scrollDuration) {
            requestAnimationFrame(step)
          }
        }
        requestAnimationFrame(step)
      },

      appendPanel(child) {
        const index = this.$slots.default.indexOf(child.$vnode)
        this.panels.splice(index, 1, child)
      },

      removePanel(child) {
        const index = this.panels.indexOf(child)
        if (index > -1) {
          this.panels.splice(index, 1)
        }
      },

      appendTab(child) {
        this.tabItems.push(child)
      },

      removeTab(child) {
        const index = this.tabItems.indexOf(child)
        if (index > -1) {
          this.tabItems.splice(index, 1)
        }
      },

      getTabStyle(index) {
        return this.active === index ? { color: this.$theme.color_active } : {}
      }
    },
    watch: {
      active() {
        this._handler()
      },
      tabItems() {
        this._handler()
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-tabs
    position: relative
    display: flex
    flex-direction: column
    width: 100%
    height: 100%
    flex: 1
    overflow: hidden

    &-container
      position: relative
      flex: 1

    &-header
      position: relative
      display: flex
      flex-direction: row
      height: 44px
      background-color: #ffffff
      overflow-x: auto
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1)

      &::-webkit-scrollbar
        display: none

    &-line
      position: absolute
      bottom: 0
      z-index: 10
      height: 4px
      border-radius: 2px
      transition: all .3s cubic-bezier(.645, .045, .355, 1)
      backface-visibility: hidden
      background-color: currentColor

    &-panel
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow-x: hidden
      overflow-y: auto

      &.is-scroll
        overflow-y: auto

      &::-webkit-scrollbar
        display: none

    &-item
      font-size: 14px
      flex: 1
      display: flex
      align-items: center
      justify-content: center
      white-space: nowrap
      height: 100%
      padding: 0 25px

    &-text
      position: relative

    &-badge
      margin-left: 12px

      &.is-dot
        margin-left: 4px
</style>
