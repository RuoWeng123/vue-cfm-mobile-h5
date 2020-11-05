<template>
  <div
    class="trust-cellTextarea"
    :class="`is-${type}`">
    <div class="trust-cellTextarea-title">
      <slot>{{label}}</slot>
      <span style="color:red" v-if="required">*</span>
    </div>
    <div class="trust-cellTextarea-body">
      <textarea
        class="trust-cellTextarea-input"
        v-model="currentValue"
        :placeholder="_disabled ? disabledPlaceholder : placeholder"
        :disabled="_disabled"
        ref="input"
      />
      <div
        class="trust-cellTextarea-count"
        v-if="showCount && !_disabled"
        @click="focus">
        <span>{{currentValue.length}} / {{max}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import form from '../../mixins/form.js'
  import Autosize from 'autosize'

  export default {
    name: 'CellTextarea',
    mixins: [form],
    props: {
      type: {
        type: String,
        default: 'column'
      },
      placeholder: {
        type: String,
        default: '请输入'
      },
      disabledPlaceholder: {
        type: String,
        default: '暂无内容'
      },
      label: {
        type: String,
        default: ''
      },
      autosize: {
        type: Boolean,
        default: true
      },
      value: {
        type: String,
        default: ''
      },
      showCount: {
        type: Boolean,
        default: false
      },
      max: {
        type: Number,
        default: 1000
      },
      disabled: {
        type: Boolean,
        default: false
      },
       required:{
        type: Boolean,
        default: false
      }
    },
    computed: {
      _disabled () {
        return this.disabled || this.$disabled
      },
      currentValue: {
        get () {
          return this.value
        },
        set (val) {
          if (val.length > this.max) {
            val = val.slice(0, this.max)
            this.$refs.input.value = val
          }
          this.$emit('input', val)
        }
      }
    },
    mounted () {
      !this.autosize || this.bindAutosize()
    },
    methods: {
      updateAutosize () {
        Autosize.update(this.$refs.input)
      },
      bindAutosize () {
        Autosize(this.$refs.input)
      },
      unbindAutosize () {
        Autosize.destroy(this.$refs.input)
      },
      focus () {
        this.$refs.textarea.focus()
      }
    },
    beforeDestroy () {
      this.unbindAutosize()
    },
    watch: {
      autosize (val) {
        this.unbindAutosize()
        !val || this.bindAutosize()
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-cellTextarea
    display: flex
    background-color: #fff
    padding: 8px 15px

    &.is-column
      flex-direction: column

      .trust-cellTextarea-body
        margin-left: 0

      .trust-cellTextarea-title
        line-height: 40px

    &-title
      font-family: PingFangSC-Medium
      font-size: 16px
      color: #4A4A4A
      letter-spacing: -0.39px
      line-height: 50px

    &-body
      margin-left: 15px
      position: relative
      flex: 1
      display: flex
      flex-direction: column

    &-count
      color: #B2B2B2
      text-align: right
      height: 20px
      font-size: 14px

    &-input
      width: 100%
      font-size: 14px
      min-height: 90px
      resize: none
      border: none
      outline: none
      color: #4a4a4a

      &::-webkit-input-placeholder
        color: #A2A2A2

      &:focus
        border: none
        outline: none

      &:disabled
        background-color: transparent

</style>
