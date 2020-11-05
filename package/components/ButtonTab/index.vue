<template>
  <div class="trust-buttonTab">
    <span
      class="trust-buttonTab-item"
      @click="handlerClick(index)"
      :style="itemStyle(index)"
      :class="{ 'is-active': active === index }"
      v-for="(bar, index) in renderList"
      :key="index">
      {{bar.text}}
      <span class="trust-buttonTab-badge">
        <Badge
          v-if="bar && bar.badge"
          v-bind="bar.badge"/>
      </span>
    </span>
    <span
      class="trust-buttonTab-mask"
      :style="maskStyle"/>
    <span
      class="trust-buttonTab-fake"
      :style="fakeStyle"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import Badge from '../Badge/index.vue'
  import theme from '../../mixins/theme.js'

  export default {
    name: 'ButtonTab',
    mixins: [theme],
    components: { Badge },
    props: {
      list: {
        type: Array,
        default: () => ([])
      },
      value: {
        type: Number,
        default: 0
      },
      autoClearBadge: {
        type: Boolean,
        default: true
      },
      borderColor: {
        type: String,
        default: null
      },
      defaultFillColor: {
        type: String,
        default: null
      },
      activeFillColor: {
        type: String,
        default: null
      },
      defaultColor: {
        type: String,
        default: null
      },
      activeColor: {
        type: String,
        default: null
      },
      tabWidth: {
        type: String,
        default: '70px'
      },
      tabHeight: {
        type: String,
        default: '30px'
      },
      tabSize: {
        type: String,
        default: '14px'
      }
    },
    computed: {
      maskStyle () {
        return {
          backgroundColor: this.activeFillColor || this.$theme.color_active,
          transform: `translate3d(${ this.active }00%, 0, 0)`,
          width: this.tabWidth,
          borderRadius: parseInt(this.tabHeight) / 2 + 'px'
        }
      },
      fakeStyle () {
        return {
          borderColor: this.borderColor || this.$theme.color_active,
          backgroundColor: this.defaultFillColor,
          borderRadius: parseInt(this.tabHeight) / 2 + 'px'
        }
      }
    },
    data () {
      return {
        active: this.value,
        renderList: this.getRenderList(this.list)
      }
    },
    created () {
      this.clearBadge(this.active)
    },
    methods: {
      itemStyle (index) {
        const activeColor = this.activeColor || this.$theme.color_active
        return {
          color: this.active === index ? '#FFFFFF' : activeColor,
          width: this.tabWidth,
          height: this.tabHeight,
          lineHeight: this.tabHeight,
          fontSize: this.tabSize
        }
      },
      getRenderList (list) {
        return list.map(item => {
          if (typeof item === 'string') {
            return {
              text: item,
              badge: null
            }
          }
          return item
        })
      },
      handlerClick (index) {
        this.active = index
      },
      clearBadge (active) {
        if (this.autoClearBadge) {
          let tab = this.renderList[active]
          if (tab) {
            tab.badge = null
          }
          this.renderList.splice(active, 1, tab)
        }
      }
    },
    watch: {
      'list' (val) {
        this.renderList = [].concat(this.getRenderList(val))
        if (this.active >= this.renderList.length) {
          this.active = 0
        }
        this.clearBadge(this.active)
      },
      'value' (val) {
        this.active = val
      },
      'active' (val) {
        this.clearBadge(val)
        this.$emit('input', val)
        this.$emit('change', val)
      }
    }
  }
</script>


<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-buttonTab
    position: relative
    display: inline-block
    text-align: center
    white-space: nowrap
    z-index: 1000
    line-height: 1

    &-mask
      position: absolute
      top: 0
      left: 0
      z-index: -1
      content: " "
      height: 100%
      transition: all .3s cubic-bezier(.645, .045, .355, 1)

    &-item
      position: relative
      display: inline-block
      transition: all .3s cubic-bezier(.645, .045, .355, 1)

    &-badge
      position: relative
      top: -3px
      left: 5px

    &-fake
      position: absolute
      top: 0
      right: 0
      left: 0
      bottom: 0
      z-index: -2
      border-width: 1px
      border-style: solid

</style>
