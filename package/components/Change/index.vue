<template>
  <label
    class="trust-change"
    :class="{ 'is-closely': closely }">
    <span class="trust-change-label">
      <slot>{{ label }}</slot>
    </span>
    <span class="trust-change-wrapper">
      <input
        class="trust-change-input"
        type="checkbox"
        :disabled="_disabled"
        v-model="currentValue"/>
      <span
        class="trust-change-core"
        :style="coreStyle"/>
    </span>
  </label>
</template>

<script type="text/ecmascript-6">
  import theme from '../../mixins/theme.js'

  export default {
    name: 'Change',
    mixins: [theme],
    props: {
      closely: {
        type: Boolean,
        default: false
      },
      value: {
        type: Boolean,
        default: false
      },
      label: String,
      disabled: {
        type: Boolean,
        default: false
      },
      color: {
        type: String
      }
    },
    computed: {
      _disabled () {
        return this.disabled
      },
      currentValue: {
        get () {
          return this.value
        },
        set (val) {
          this.$emit('input', val)
          this.$emit('change', val)
        }
      },
      coreStyle () {
        return {
          color: this.currentValue ? (this.color || this.$theme.color_active) : ''
        }
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-change
    position: relative
    font-size: 0
    padding: 6px 10px
    background-color: #fff
    display: flex
    align-items: center
    justify-content: space-between

    &.is-closely
      justify-content: flex-start

    &-label
      display: inline-block
      vertical-align: middle
      margin-right: 8px
      line-height: 1.5
      font-size: 14px
      color: #303133

    &-wrapper
      display: inline-block
      vertical-align: middle

    &-input
      display: none

      &:checked + .trust-change-core
        border-color: currentColor
        background-color: currentColor

        &::before
          transform: scale(0)

        &::after
          transform: translateX(20px)

    &-core
      position: relative
      display: inline-block
      box-sizing: border-box
      width: 52px
      height: 32px
      border-radius: 26px
      border: 1px solid #cccccc
      background-color: #d9d9d9
      transition: all .3s cubic-bezier(.645, .045, .355, 1)

      &::after, &::before
        content: " "
        position: absolute
        top: 0
        left: 0
        transition: all .3s cubic-bezier(.645, .045, .355, 1)
        border-radius: 15px

      &::after
        width: 30px
        height: 30px
        box-shadow: 0 1px 3px rgba(0, 0, 0, .4)
        background-color: #ffffff

      &::before
        width: 50px
        height: 30px
        background-color: #fdfdfd

</style>
