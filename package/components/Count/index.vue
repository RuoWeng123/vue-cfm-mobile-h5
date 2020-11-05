<template>
  <div class="trust-count">
    <transition name="trust-count-anim">
      <span
        class="trust-count-reduce"
        @click="onReduce"
        v-if="alwaysShowReduce || num !== min">
        <Ripple
          class="trust-count-icon"
          :class="{'is-disabled': num === min}"
          :ripple="num !== min"
          circle>
          <i
            class="trust-icon icon_roundreduce_fil"
            :style="iconStyle"/>
        </Ripple>
      </span>
    </transition>
    <span class="trust-count-num">
      {{alwaysShowNum ? num : num === min ? '' : num}}
    </span>
    <span
      class="trust-count-add"
      @click="onAdd">
      <Ripple
        class="trust-count-icon"
        :class="{'is-disabled': num === max}"
        :ripple="num !== max"
        circle>
        <i
          class="trust-icon icon_roundadd_fill"
          :style="iconStyle"/>
      </Ripple>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  import Ripple from '../Ripple/index.vue'
  import theme from '../../mixins/theme.js'

  export default {
    name: 'Count',
    mixins: [theme],
    components: { Ripple },
    props: {
      max: {
        type: Number,
        default: 100
      },
      min: {
        type: Number,
        default: 0
      },
      value: {
        type: Number,
        default: 0
      },
      step: {
        type: Number,
        default: 1
      },
      alwaysShowNum: {
        type: Boolean,
        default: false
      },
      alwaysShowReduce: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      num: {
        get () {
          return this.value
        },
        set (num) {
          if (num < this.min) {
            num = this.min
          }
          if (num > this.max) {
            num = this.max
          }
          this.$emit('input', num)
        }
      },
      iconStyle () {
        return {
          color: this.$theme.color_active
        }
      }
    },
    methods: {
      onAdd (e) {
        if (this.num === this.max) return
        this.num = this.num + this.step
        this.$emit('add', e)
        this.$emit('change', e)
      },

      onReduce (e) {
        if (this.num === this.min) return
        this.num = this.num - this.step
        this.$emit('reduce', e)
        this.$emit('change', e)
      }
    }
  }
</script>

<style
  lang="stylus"
  type="text/stylus"
  rel="stylesheet/stylus">
  .trust-count
    position: relative
    display: inline-block
    padding: 0 44px
    font-size: 0
    line-height: 1

    &-reduce, &-add
      position: absolute
      display: inline-block
      vertical-align: middle
      top: 50%

    &-reduce
      left: 0
      transform: translate3d(0, -50%, 0)
      transition: all .3s cubic-bezier(.645, .045, .355, 1)

    &-add
      left: 100%
      transform: translate3d(-100%, -50%, 0)

    &-icon
      padding: 10px

      i
        font-size: 24px

      &.is-disabled
        color: #d9d9d9

    &-num
      display: inline-block
      vertical-align: middle
      text-align: center
      min-width: 15px
      font-size: 14px
      color: #606266

    &-anim
      &-enter, &-leave-active
        opacity: 0.1;
        left: 100% !important;
        transform: translate3d(-100%, -50%, 0) rotate(180deg) !important;
</style>
