<template>
  <Popup
    :value="visiable"
    @input="onClose"
    pos="center">
    <div class="trust-confirm">
      <p class="trust-confirm-title">
        {{title}}
      </p>
      <p class="trust-confirm-desc">
        {{desc}}
      </p>
      <div class="trust-confirm-btnWrap">
        <div
          class="trust-confirm-cancel"
          @click="onCancel">
          {{ cancelText }}
        </div>
        <div
          class="trust-confirm-confirm"
          @click="onConfirm">
          {{ confirmText }}
        </div>
      </div>
    </div>
  </Popup>
</template>

<script type="text/ecmascript-6">
  import Popup from '../../components/Popup/index.vue'

  export default {
    components: { Popup },
    data () {
      return {
        visiable: false,
        title: '',
        desc: '',
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
          desc = '您确定要提交吗？',
          confirmText = '确认',
          cancelText = '取消',
          sync = true,
          confirm,
          cancel
        } = config
        this.confirmText = confirmText
        this.cancelText = cancelText
        this.title = title
        this.desc = desc
        this.sync = sync
        this.confirm = confirm
        this.cancel = cancel
        this.visiable = true
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
        this.confirm && this.confirm()
      }
    }
  }
</script>

<style
  lang="stylus"
  type="text/stylus"
  rel="stylesheet/stylus">
  .trust-confirm
    display: flex
    flex-direction: column
    height: 184px
    color: #101010

    &-title
      text-align: center
      line-height: 50px
      letter-spacing: 1px
      font-size: 18px

    &-desc
      flex: 1
      text-indent: 10px
      padding: 0 20px
      font-size: 15px
      line-height: 22px
      overflow-x: hidden
      overflow-y: auto

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
      color: #999999
      flex: 1

      &:active
        background: #F0F0F0

    &-confirm
      font-family: PingFangSC-Medium
      font-size: 14px
      color: #4A4A4A
      flex: 1
      border-left: 1px solid #F0F0F0

      &:active
        background: #F0F0F0

</style>
