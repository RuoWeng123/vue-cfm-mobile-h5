<template>
  <div class="trust-parallax">
    <div
      class="trust-parallax-bottom"
      :style="bottomStyle">
      <slot name="bottom"/>
    </div>
    <div
      class="trust-parallax-top"
      :style="topStyle">
      <slot name="top"/>
    </div>
    <div
      @scroll="onScroll"
      class="trust-parallax-body"
      ref="scroll">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ParallaxView',
  props: {
    start: {},
    end: {}
  },
  data () {
    return {
      top: 0,
      bottom: 1
    }
  },
  computed: {
    topStyle () {
      return {
        opacity: this.top
      }
    },
    bottomStyle () {
      return {
        opacity: this.bottom
      }
    }
  },
  methods: {
    onScroll (e) {
      this.setValue(e.target.scrollTop)
    },
    setValue (top) {
      const start = parseInt(this.start)
      const end = parseInt(this.end)
      const len = end - start
      if (top < start) {
        this.bottom = 1
        this.top = 0
      } else if (top > end) {
        this.bottom = 0
        this.top = 1
      } else {
        this.top = (top - start) / len
        this.bottom = (end - top) / len
      }
    }
  },
  activated () {
    this.setValue(this.$refs.scroll.scrollTop)
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-parallax
    position: relative
    width: 100%
    height: 100%
    overflow: hidden

    &-bottom
      position: absolute
      top: 0
      right: 0
      width: 100%
      z-index: 100

    &-top
      position: absolute
      top: 0
      right: 0
      width: 100%
      z-index: 100

    &-body
      width: 100%
      height: 100%
      overflow: auto
      -webkit-overflow-scrolling: touch

</style>
