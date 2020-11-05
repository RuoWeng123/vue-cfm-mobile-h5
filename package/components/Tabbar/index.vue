<script type="text/jsx">
  import SafeArea from '../SafeArea/index.vue'
  import TabPanles from '../TabPanles/index.vue'
  import tabbarItem from './tabbarItem'
  import theme from '../../mixins/theme.js'

  const TabbarQuick = 'TabbarQuick'
  const TabbarPanel = 'TabbarPanel'
  export default {
    name: 'Tabbar',
    components: { SafeArea, TabPanles, tabbarItem },
    mixins: [theme],
    provide() {
      return {
        Tabbar: this
      }
    },
    props: {
      value: {
        required: true,
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
        panels: []
      }
    },
    render(h) {
      let panels = this.renderPanel(h)
      let header = this.renderHeader(h)
      return h('div', { attrs: { class: 'trust-tabbar' } }, [panels, header])
    },
    methods: {
      getNodesByTag(tag) {
        if (!this.$slots.default) return []
        return this.$slots.default.filter(item => item.componentOptions && item.componentOptions.tag === tag)
      },
      appendPanel(child) {
        const index = this.$slots.default.indexOf(child.$vnode)
        this.panels.splice(index, 1, child)
      },
      removePanel(child) {
        const index = this.panels.indexOf(child)
        if (index > -1) this.panels.splice(index, 1)
      },
      renderPanel() {
        return (
          <TabPanles
            class="trust-tabbar-container"
            value={ this.active }
            panels={ this.panels }
            slider={ this.slider }
            fastClick={ true }
            onInput={ val => this.active = val }>
            { this.getNodesByTag(TabbarPanel) }
          </TabPanles>
        )
      },
      renderHeader() {
        let children = this.panels.map((panel, index) => {
          return (
            <tabbarItem
              style={ { color: this.active === index ? this.$theme.color_active : '' } }
              panel={ panel }
              active={ index === this.active }
              onClick={
                () => {
                  this.active = index
                  this.$emit('tab-click', index)
                }
              }/>
          )
        })
        let quick = this.getNodesByTag(TabbarQuick)
        if (quick && quick.length) {
          quick = quick[0]
          let index = quick.componentOptions.propsData.index || Math.floor(children.length / 2)
          children.splice(index, 0, quick)
        }
        return (
          <SafeArea
            class="trust-tabbar-header"
            position="bottom">
            { children }
          </SafeArea>
        )
      }
    },
    watch: {
      'active'(val, oldVal) {
        this.$emit('change', val, oldVal)
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">

  .trust-tabbar
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
      height: 100%

    &-header
      position: relative
      display: flex
      flex-direction: row
      height: 55px
      background-color: #ffffff
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1)

    &-panel
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow-x: hidden
      overflow-y: auto
      -webkit-overflow-scrolling: touch

      &::-webkit-scrollbar
        display: none

</style>
