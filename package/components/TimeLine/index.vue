<template>
  <div class="trust-timeLine">
    <div class="trust-timeLine-wrapper" v-for="(item, index) in list" :key="index">
      <span class="trust-timeLine-core" :class="{'is-current': index === 0}"></span>
      <div class="trust-timeLine-row">
        <!-- @slot 定制右侧样式-->
        <slot v-bind="item">
          <p class="trust-timeLine-desc">{{item.desc}}</p>
          <p class="trust-timeLine-time">{{item.time}}</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'TimeLine',
    props: {
      /**
       * 数据列表 [{time, desc}]
       */
      list: {
        type: Array,
        default () {
          return []
        }
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-timeLine
    &-wrapper
      &:first-of-type {
        &::before {
          display: none;
        }
      }
      &:last-of-type {
        &::after {
          display: none;
        }
      }

    &-row
      padding: 4px 0
      border-bottom: 1px solid #f1f1f1

    &-desc
      font-size: 16px
      color: #333333
      line-height: 36px

    &-time
      margin-top: 4px
      line-height: 34px
      font-size: 14px
      color: #666666

    &-wrapper
      position: relative
      box-sizing: border-box
      padding-left: 40px
      background-color: #ffffff

      &::before, &::after
        content: ' '
        display: inline-block
        position: absolute
        left: 20px
        width: 1px
        background-color: #d9d9d9

      &::before {
        top: 0;
        height: 20px;
      }

      &::after {
        top: 20px;
        bottom: 0;
      }

    &-core
      position: absolute
      display: inline-block
      top: 16px
      left: 16px
      border-radius: 50%
      width: 8px
      height: 8px
      z-index: 10
      background-color: #d9d9d9

      &.is-current
        top: 12px
        left: 10px
        width: 12px
        height: 12px
        border-radius: 50%
        background-color: #46baff
        border: 4px solid #b5e3ff
</style>
