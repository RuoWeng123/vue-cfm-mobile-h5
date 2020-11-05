<template>
  <Ripple
    @click="onClick"
    class="trust-button"
    :style="currentButtonStyle"
    :class="currentButtonClass">
    <i
      v-if="icon"
      :class="icon"
      class="trust-button-icon"
    />
    <span
      class="trust-button-text"
      v-if="$slots.default">
      <slot/>
    </span>
    <Spinner
      v-if="currentLoading"
      v-bind="currentLoadingOption"
      class="trust-button-loading"
    />
  </Ripple>
</template>

<script type="text/ecmascript-6">
  import Spinner from '../Spinner/index.vue'
  import Ripple from '../Ripple/index.vue'
  import theme from '../../mixins/theme.js'
  import form from '../../mixins/form.js'
  import { validator } from '../../utils/validator.js'

  export default {
    name: 'Btn',
    mixins: [theme, form],
    components: { Spinner, Ripple },
    props: {
      theme: {
        default: null
      },
      size: {
        type: String,
        default: 'block'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      edge: {
        type: Boolean,
        default: false
      },
      plain: {
        type: Boolean,
        default: false
      },
      round: {
        type: Boolean,
        default: false
      },
      circle: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String
      },
      loading: {
        type: Boolean,
        default: null
      },
      loadingOption: {
        type: Object
      },
      model: {
        type: Object
      },
      rules: {
        type: [Object, Array]
      },
      validator: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      currentButtonStyle () {
        if (this.theme) return {}
        const { color_background, color_border, color_font } = this.$theme || {}
        if (this.plain) {
          return {
            background: '#FFFFFF',
            borderColor: color_border,
            color: color_font
          }
        } else {
          return {
            background: color_background,
            borderColor: color_border,
            color: '#FFFFFF'
          }
        }
      },
      currentButtonClass () {
        return [
          this.theme ? 'trust-button__' + this.theme : '',
          this.size ? 'trust-button__' + this.size : '',
          {
            'is-plain': this.plain,
            'is-round': this.round,
            'is-circle': this.circle,
            'is-disabled': this.disabled,
            'is-edge': this.currentEdge,
            'is-loading': this.currentLoading
          }
        ]
      },
      currentLoadingOption () {
        return {
          color: '#FFFFFF',
          size: '20px',
          type: 'ios-small',
          ...this.loadingOption
        }
      },
      currentModel () {
        return this.model || this.$model
      },
      currentRules () {
        return this.rules || this.$rules
      },
      currentLoading () {
        return this.loading && this.InLoading
      },
      currentEdge () {
        return this.edge || this.$edge
      }
    },
    data () {
      return {
        InLoading: false
      }
    },
    methods: {
      async onClick (e) {
        if (this.InLoading) return
        if (this.validator && this.currentModel && this.currentRules) {
          const { success, message } = await validator(this.currentModel, this.currentRules)
          if (!success) {
            return this.$emit('error', message)
          }
        }
        if (!this.loading) {
          this.$emit('click', e)
        } else {
          this.InLoading = true
          this.$emit('confirm', e, () => this.InLoading = false)
        }
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-button
    position: relative
    display: inline-block
    vertical-align: middle
    line-height: 1.2
    white-space: nowrap
    text-align: center
    margin: 0
    transition: .3s
    overflow: hidden
    border-width: 1px
    border-style: solid
    font-weight: normal

    &__white
      color: #333333
      background-color: #FFFFFF
      border-color: #FFFFFF

      &.is-plain
        color: #333333
        background-color: #FFFFFF
        border-color: #FFFFFF

    &__black
      color: #FFFFFF
      background-color: #333333
      border-color: #333333

      &.is-plain
        color: #333333
        background: #FFFFFF
        border-color: #333333

    &__blue
      color: #FFFFFF
      background-color: #46BAFF
      border-color: #46BAFF

      &.is-plain
        color: #46BAFF
        background: #FFFFFF
        border-color: #46BAFF

    &__red
      color: #FFFFFF
      background-color: #FF5050
      border-color: #FF5050

      &.is-plain
        color: #FF5050
        background: #FFFFFF
        border-color: #FF5050

    &__block
      display: block
      margin: 10px
      padding: 12px 20px
      font-size: 16px
      border-radius: 4px

      &.is-round
        padding: 12px 20px
        border-radius: 22px

    &__normal
      padding: 9px 18px
      font-size: 15px
      border-radius: 4px

      &.is-round
        padding: 9px 18px
        border-radius: 20px

    &__medium
      padding: 7px 16px
      font-size: 14px
      border-radius: 4px

      &.is-round
        padding: 7px 16px
        border-radius: 18px

    &__small
      padding: 5px 13px
      font-size: 13px
      border-radius: 4px

      &.is-round
        padding: 5px 13px
        border-radius: 16px

    &__mini
      padding: 3px 8px
      font-size: 12px
      border-radius: 4px

      &.is-round
        padding: 3px 8px
        border-radius: 14px

    &.is-edge
      margin: 0
      border-radius: 0

    &.is-circle
      display: inline-block
      line-height: 1em
      font-size: 18px
      border-radius: 50%
      padding: 11px 12px

    &.is-loading, &.is-disabled
      pointer-events: none

      &:before
        pointer-events: none
        content: ''
        position: absolute
        left: -1px
        top: -1px
        right: -1px
        bottom: -1px
        border-radius: inherit
        background-color: rgba(255, 255, 255, 0.2)

    &-loading, &-text
      display: inline-block
      vertical-align: middle

    &-text
      line-height: 20px

    &-icon
      display: inline-block
      vertical-align: middle
</style>
