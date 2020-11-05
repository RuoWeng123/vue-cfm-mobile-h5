<template>
  <div
    class="trust-slider"
    ref="scroll">
    <div
      class="trust-slider-container"
      :style="wrapStyle">
      <div
        class="trust-slider-item"
        v-for="(item, index) in list"
        :key="index">
        <slot
          :item="item"
          :index="index"
        />
      </div>
    </div>
    <slot name="dot">
      <div
        v-if="dots && list.length > 1"
        class="trust-slider-dots">
        <span
          class="trust-slider-dot"
          :class="{ 'is-active': index === value}"
          v-for="(item, index) in list"
          :key="index"
        />
      </div>
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    name: 'Slider',
    props: {
      list: {
        type: Array,
        default () {
          return []
        }
      },
      dots: {
        type: Boolean,
        default: false
      },
      value: {
        type: Number,
        default: 0
      },
      preventDefault: {
        type: Boolean,
        default: true
      }
    },
    mounted () {
      this.initScroll()
    },
    computed: {
      wrapStyle () {
        return `width: ${ 100 * this.list.length }%`
      }
    },
    methods: {
      initScroll () {
        setTimeout(() => {
          if (this.scroll) {
            this.scroll.refresh()
          } else {
            this.scroll = new BScroll(this.$refs.scroll, {
              scrollX: true,
              snap: true,
              click: true,
              deceleration: 0.01,
              preventDefault: this.preventDefault
            })
            this.scroll.on('scrollEnd', () => {
              let page = this.scroll.getCurrentPage().pageX
              this.$emit('input', page)
            })
          }
          try {
            this.scroll.goToPage(this.value, 0, 0)
          } catch (e) {
            console.log(e)
          }
        }, 30)
      }
    },
    watch: {
      'list' () {
        this.initScroll()
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .trust-slider
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    font-size: 0

    &-container
      display: flex
      width: 100%
      height: 100%
      font-size: 0

    &-item
      position: relative
      flex: 1

    &-dots
      position: absolute
      bottom: 8px
      left: 50%
      transform: translate3d(-50%, 0, 0)

    &-dot
      display: inline-block
      width: 10px
      height: 10px
      border-radius: 5px
      margin: 0 3px
      transition: width .2s ease
      background-color: #FFFFFF
      opacity: 0.5

      &.is-active
        width: 20px
        opacity: 1
</style>
