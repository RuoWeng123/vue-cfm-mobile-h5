<template>
  <Popup
    :value="visiable"
    @input="onHide"
    pos="bottom">
    <SafeArea
      class="trust-actionSheet"
      position="bottom">
      <Ripple
        @click="onClick(item)"
        class="trust-actionSheet-item"
        v-for="(item, index) in list"
        :key="index">
        {{item.text}}
      </Ripple>
      <Ripple
        v-if="showCancel"
        @click="onHide"
        class="trust-actionSheet-item trust-actionSheet-cancel">
        取消
      </Ripple>
    </SafeArea>
  </Popup>
</template>

<script type="text/ecmascript-6">
  import SafeArea from '../../components/SafeArea/index.vue'
  import Popup from '../../components/Popup/index.vue'
  import Ripple from '../../components/Ripple/index.vue'

  export default {
    components: { SafeArea, Popup, Ripple },
    data () {
      return {
        visiable: false,
        showCancel: true,
        cancel: null,
        list: []
      }
    },
    methods: {
      show ({ list = [], cancel = null, showCancel = true }) {
        this.list = list
        this.cancel = cancel
        this.showCancel = showCancel
        this.visiable = true
      },
      onHide () {
        this.visiable = false
        this.cancel && this.cancel()
      },
      onClick (item) {
        this.visiable = false
        if (item && item.click) {
          item.click(item)
        }
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-actionSheet
    background: #f8f6fa

    &-item
      text-align: center
      line-height: 50px
      background: #FFFFFF

    &-cancel
      margin-top: 10px
</style>
