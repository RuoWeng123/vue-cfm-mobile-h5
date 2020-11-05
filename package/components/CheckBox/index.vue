<template>
  <label
    class="trust-checkBox"
    :class="inline ? 'is-inline' : 'is-block'">
    <span
      class="trust-checkBox-label"
      v-if="pos === 'right'">
      <slot>{{label}}</slot>
    </span>
    <span class="trust-checkBox-wrapper">
      <input
        class="trust-checkBox-input"
        v-model="currentValue"
        :disabled="disabled"
        :value="name"
        type="checkbox"
      />
      <span
        class="trust-checkBox-core"
        :class="{ 'is-simple': simple }"
        :style="coreStyle"
      />
    </span>
    <span
      class="trust-checkBox-label"
      v-if="pos === 'left'">
      <slot>{{label}}</slot>
    </span>
  </label>
</template>

<script type="text/jsx">
  import theme from '../../mixins/theme.js'

  export default {
    name: 'CheckBox',
    mixins: [theme],
    props: {
      inline: {
        default: true
      },
      simple: {
        default: false
      },
      pos: {
        default: 'left'
      },
      disabled: {
        default: false
      },
      value: {
        default: () => ([])
      },
      name: {
        required: true
      },
      label: {
        default: ''
      }
    },
    computed: {
      currentValue: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('input', val)
        }
      },
      coreStyle() {
        return {
          color: this.$theme.color_active
        }
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">

  .trust-checkBox
    padding: 10px
    align-items: center

    &.is-block
      display: flex

      .trust-checkBox-label
        flex: 1

    &.is-inline
      display: inline-flex

    &-wrapper
      margin: 0 6px

    &-label
      font-size: 14px

    &-input
      display: none

      &:checked + .trust-checkBox-core
        background-color: currentColor

        &.is-simple
          background-color: transparent

        &::after
          transform: rotate(45deg) scale(1)

      &[disabled] + .trust-checkBox-core
        background-color: #d9d9d9
        border-color: #d9d9d9

    &-core
      position: relative
      display: inline-block
      vertical-align: middle
      width: 20px
      height: 20px
      border-radius: 50%
      border: 1px solid currentColor

      &::after
        position: absolute
        content: " "
        top: 4px
        left: 7px
        width: 4px
        height: 8px
        border-width: 0 2px 2px 0
        border-style: solid
        transform: rotate(45deg) scale(0)
        transition: transform .2s
        border-color: #ffffff


      &.is-simple
        border: 1px solid transparent

        &::after
          top: 3px
          width: 5px
          height: 10px
          border-color: currentColor

</style>
