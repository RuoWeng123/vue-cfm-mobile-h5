<template>
  <div
    class="trust-card"
    :class="{
      'is-edge': edge,
      'is-shadow': shadow
    }">
    <div
      class="trust-card-header"
      v-if="title || this.$slots.header">
      <slot name="header">
        <span class="trust-card-header-title">
          {{ title }}
        </span>
        <span
          @click="onMore"
          class="trust-card-header-more">
          <slot name="more">
            <span v-if="more" :class="moreclass">
              {{ more }} <i v-if="moreicon" class="trust-icon icon_right"/>
            </span>
          </slot>
        </span>
      </slot>
    </div>
    <div
      class="trust-card-body"
      :style="bodyStyle">
      <slot/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Card',
    props: {
      title: {},
      more: {},
      moreclass:{},
      moreicon:{
        default:true
      },
      shadow: {
        default: true
      },
      edge: {
        default: true
      },
      bodyStyle: {}
    },
    methods: {
      onMore (e) {
        this.$emit('onMore', e)
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-card
    margin: 10px
    border-radius: 4px
    background-color: #ffffff

    &.is-edge
      margin: 0
      border-radius: 0

      & + .trust-card
        margin-top: 10px

    &.is-shadow
      box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.06)

    &-header
      display: flex
      align-items: center
      justify-content: space-between
      border-bottom: 1px solid #E9E9E9
      padding: 14px

      &-title
        font-family: PingFangSC-Medium
        font-size: 16px
        color: #4A4A4A
        letter-spacing: 0
        line-height: 18px

      &-more
        font-family: PingFangSC-Regular
        font-size: 14px
        color: #9B9B9B
        letter-spacing: -0.34px

        i
          margin-left: -4px

</style>
