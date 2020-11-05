<script type="text/jsx">
  import SafeArea from '../SafeArea/index.vue'
  import HeaderItem from '../HeaderItem/index.vue'
  import HeaderCenter from './center.vue'
  import theme from '../../mixins/theme.js'

  export default {
    name: 'Header',
    props: {
      back: {
        type: Boolean,
        default: false
      },
      input: {
        type: Boolean,
        default: false
      },
      title: {},
      titleMargin: {
        type: String,
        default: '0px 45px 0px 45px'
      },
      leftData: {},
      rightData: {},
      theme: {
        type: String
      },
      inputTheme: {},
      border: {
        type: Boolean,
        default: true
      },
      placeholder: {}
    },
    mixins: [theme],
    components: { SafeArea, HeaderItem, HeaderCenter },
    computed: {
      currentHeaderStyle() {
        if (this.theme) return {}
        const { color_background, color_gradient } = this.$theme
        return {
          backgroundColor: color_background,
          background: color_gradient,
          color: "#FFFFFF"
        }
      },
      currentTitleStyle() {
        return {
          margin: this.titleMargin
        }
      }
    },
    render() {
      return (
        <SafeArea
          style={ this.currentHeaderStyle }
          class={ this.theme ? `trust-header__${ this.theme }` : '' }
          position="top">
          <div class={ ['trust-header', { 'is-border': this.border, 'is-shadow': this.shadow }] }>
            { this.renderLeft() }
            { this.renderCenter() }
            { this.renderRight() }
          </div>
        </SafeArea>
      )
    },
    methods: {
      renderLeft() {
        let child = this.$slots.left
        let data = (this.back ? [{ layout: 'Back' }] : []).concat(this.leftData || [])
        if (data.length) {
          child = data.map(item => {
            return (
              <HeaderItem options={ item }/>
            )
          })
        }
        return (
          <div class="trust-header-left">
            { child }
          </div>
        )
      },
      renderRight() {
        let child = this.$slots.right
        if (this.rightData && this.rightData.length) {
          child = this.rightData.map(item => {
            return (
              <HeaderItem options={ item }/>
            )
          })
        }
        return (
          <div class="trust-header-right">
            { child }
          </div>
        )
      },
      renderCenter() {
        return (
          <HeaderCenter
            style={ this.currentTitleStyle }
            input={ this.input }
            inputTheme={ this.inputTheme }
            placeholder={ this.placeholder }
            onChange={ key => this.$emit('change', key) }>
            { this.$slots.default || this.title }
          </HeaderCenter>
        )
      }
    }
  }
</script>

<style
  lang="stylus"
  type="text/stylus"
  rel="stylesheet/stylus">
  .trust-header
    position: relative
    width: 100%
    height: 44px

    &__white
      background: #FFFFFF
      color: #4A4A4A
      transition: all .3s ease

    &__transparent
      background: transparent
      color: #FFFFFF
      transition: all .3s ease
      margin-bottom: -44px;
      z-index: 1;
    &.is-border
      border-bottom: 1px solid #E9E9E9

    &.is-shadow
      box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.06)

    &-left
      position: absolute
      left: 5px
      bottom: 2px
      display: inline-flex

    &-right
      position: absolute
      right: 10px
      bottom: 2px
      display: inline-flex
</style>
