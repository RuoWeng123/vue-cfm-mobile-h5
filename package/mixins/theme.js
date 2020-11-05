export default {
  inject: {
    ThemeProvider: {
      default: {}
    }
  },
  computed: {
    $theme () {
      return this.ThemeProvider.currentTheme
    }
  }
}
