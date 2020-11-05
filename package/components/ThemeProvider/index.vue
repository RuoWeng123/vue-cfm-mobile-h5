<script>
  import Theme from './theme.js'

  export default {
    name: 'ThemeProvider',
    provide () {
      return {
        ThemeProvider: this
      }
    },
    props: {
      theme: {
        type: String,
        default: 'DarkBlue'
      }
    },
    computed: {
      currentTheme () {
        return Theme[this.theme]
      }
    },
    render () {
      return this.$slots.default
    }
  }
</script>
