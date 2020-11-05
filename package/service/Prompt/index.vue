<template>
  <Popup
    :value="visiable"
    @input="onClose"
    pos="center">
    <div class="trust-prompt">
      <p class="trust-prompt-title">
        {{title}}
      </p>
      <p class="trust-prompt-content">
        <Input
          class="trust-prompt-input"
          v-model="input"
          ref="input"/>
      </p>
      <div class="trust-prompt-btnWrap">
        <div
          class="trust-prompt-cancel"
          @click="onCancel">
          {{ cancelText }}
        </div>
        <div
          class="trust-prompt-confirm"
          @click="onConfirm">
          {{ confirmText }}
        </div>
      </div>
    </div>
  </Popup>
</template>

<script type="text/ecmascript-6">
  import Input from '../../components/Input/index.vue'
  import Popup from '../../components/Popup/index.vue'

  export default {
    components: { Input, Popup },
    data () {
      return {
        visiable: false,
        title: '',
        input: '',
        confirmText: '',
        cancelText: '',
        confirm: null,
        cancel: null
      }
    },
    methods: {
      show (config = {}) {
        const {
          title = '温馨提示',
          input = '',
          confirmText = '确认',
          cancelText = '取消',
          sync = true,
          confirm,
          cancel
        } = config
        this.confirmText = confirmText
        this.cancelText = cancelText
        this.title = title
        this.input = input
        this.sync = sync
        this.confirm = confirm
        this.cancel = cancel
        this.visiable = true
        this.$nextTick(() => {
          this.$refs.input.focus()
        })
      },
      onClose () {
        if (!this.sync) return
        this.onCancel()
      },
      onCancel () {
        this.visiable = false
        this.cancel && this.cancel()
      },
      onConfirm () {
        this.visiable = false
        this.confirm && this.confirm(this.input)
      }
    }
  }
</script>


<style
  lang="stylus"
  type="text/stylus"
  rel="stylesheet/stylus">
  .trust-prompt
    display: flex
    flex-direction: column
    height: 184px
    color: #101010

    &-title
      text-align: center
      line-height: 50px
      letter-spacing: 1px
      font-size: 18px

    &-content
      flex: 1
      display: flex
      text-indent: 10px
      padding: 0 20px
      font-size: 15px
      line-height: 22px
      overflow-x: hidden
      overflow-y: auto
      box-sizing: border-box

    &-input
      flex: 1
      font-family: PingFangSC-Regular
      height: 40px
      font-size: 14px
      text-align: left
      padding: 0 10px
      color: #4a4a4a
      margin-top: 12px
      border-radius: 10px
      border: 1px solid #F0F0F0

    &-btnWrap
      display: flex
      text-align: center
      font-size: 14px
      height: 45px
      line-height: 45px
      border-top: 1px solid #F0F0F0

    &-cancel
      font-family: PingFangSC-Regular
      font-size: 14px
      color: #404040
      flex: 1

      &:active
        background: #F0F0F0

    &-confirm
      font-weight: bold
      font-family: PingFangSC-Medium
      font-size: 14px
      color: #4A4A4A
      flex: 1
      border-left: 1px solid #F0F0F0

      &:active
        background: #F0F0F0

</style>
