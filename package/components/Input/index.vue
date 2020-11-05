<template>
  <div class="trust-input">
    <input
      class="trust-input-core"
      autocapitalize="off"
      autocorrect="off"
      :class="{ 'is-clearable': clearable }"
      :disabled="currentDisabled"
      v-model="key"
      v-bind="$attrs"
      ref="input"
      @blur="onBlur"
      @focus="onFocus"
    />
    <i v-if="currentMic" class="trust-input-mic" @click="audio" />
    <i
      class="trust-input-clear trust-icon icon_roundclose_fill mugua iconguanbi"
      :class="mic ? 'has-mic' : ''"
      v-if="currentClearable"
      @click="clear"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import { throttle } from '../../utils/throttle.js'
import form from '../../mixins/form.js'

export default {
  name: 'Input',
  mixins: [form],
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    throttle: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
      mic: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      key: this.value
    }
  },
  computed: {
    currentDisabled() {
      return this.disabled || this.$disabled
    },
    currentClearable() {
      return !this.currentDisabled && this.clearable && this.key
    },
     currentMic () {
      return !this.currentDisabled && this.mic
    }
  },
  methods: {
    clear() {
      this.key = ''
    },
    blur() {
      this.$refs.input.blur()
    },
    focus() {
      this.$refs.input.focus()
    },
     audio () {
    },
    onBlur () {
      this.$emit('blur')
    },
    onFocus () {
      this.$emit('focus')
    }

  },
  watch: {
    key(val) {
      this.$emit('input', val)
      const fn = (v) => this.$emit('change', v)
      if (!this.throttle) {
        fn(val)
      } else {
        if (!this._throttleInstance) this._throttleInstance = throttle(fn, 500, 2000)
        this._throttleInstance(val)
      }
    },
    value(val) {
      this.key = val
    }
  }
}
</script>

<style
  lang="stylus"
  type="text/stylus"
  rel="stylesheet/stylus">
  .trust-input
    font-family: PingFangSC-Regular
    flex: 1
    position: relative
    display: flex
    width: 100%
    height: 100%
    font-size: 16px
    color: #4A4A4A
    text-align: inherit

    &-core
      flex: 1
      height: 100%
      border: 0
      outline: 0
      resize: none
      color: inherit
      text-align: inherit
      font-size: inherit
      padding-right: 10px

      &.is-clearable
        padding-right: 30px

      &:focus, &:disabled
        border: 0
        outline: 0
        resize: none

      &:disabled
        background-color: transparent

      &::-webkit-input-placeholder
        font-size: inherit
        color: #A2A2A2

    &-clear
      position: absolute
      top: 50%
      right: 0
      font-size: 14px
      padding: 5px
      color: #bbbbbb
      transform: translate3d(0, -50%, 0)

      &.has-mic
        right: 20px

    &-mic
      position: absolute
      top: 50%
      right: 5px
      font-size: 18px
      padding: 5px
      color: #bbbbbb
      transform: translate3d(0, -50%, 0)
</style>