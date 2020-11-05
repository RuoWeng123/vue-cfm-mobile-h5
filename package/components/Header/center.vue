<template>
  <div class="trust-header-center">
    <transition>
      <div
        class="trust-header-center-default"
        v-show="!input && $slots.default">
        <slot/>
      </div>
    </transition>
    <transition>
      <Input
        class="trust-header-center-input"
        :class="`is-${inputTheme}`"
        @change="onChange"
        v-model="currentValue"
        v-show="input"
        v-bind="$attrs"
        v-on="$attrs"
        :placeholder="placeholder"
        ref="input"
      />
    </transition>
  </div>
</template>

<script>
  import Input from "../Input/index.vue"

  export default {
    components: { Input },
    props: {
      input: {},
      inputTheme: {
        type: String,
        default: 'dark'
      },
      placeholder: {
        type: String,
        default: '搜索'
      }
    },
    data() {
      return {
        currentValue: ''
      }
    },
    methods: {
      onChange() {
        this.$emit('change', this.currentValue)
      }
    },
    watch: {
      input: {
        immediate: true,
        handler(val) {
          this.$nextTick(() => {
            val && this.$refs.input.focus()
          })
        }
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-header-center
    display: flex
    justify-content: center
    align-items: center
    height: 100%

    &-default
      flex: 1
      font-family: PingFangSC-Medium
      font-size: 18px
      text-align: center
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap

    &-input
      font-size: 14px
      height: 28px
      border-radius: 4px
      overflow: hidden

      &.is-light

        .trust-input-core
          background: #F5F6FA
          padding-left: 10px

      &.is-dark

        .trust-input-core
          background: rgba(255, 255, 255, 0.2)
          padding-left: 10px
          color: #FFFFFF

          &::-webkit-input-placeholder
            color: #FFFFFF

        .trust-input-clear
          color: #FFFFFF
</style>
