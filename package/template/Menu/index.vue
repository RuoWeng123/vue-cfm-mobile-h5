<template>
  <div class="template-menu-wrap">
    <div
      class="template-menu"
      v-for="(item, index) in currentData"
      :key="index">
      <div class="template-menu-header">
        <span class="template-menu-header-title">
          <slot name="title">{{ item.title }}</slot>
        </span>
        <span
          class="template-menu-header-more"
          @click="onMore(item)">
          <slot name="more">
            <span v-if="item.more">
              {{ item.more }}
            </span>
          </slot>
        </span>
      </div>
      <div class="template-menu-body">
        <Ripple
          @click="onDetail(child)"
          class="template-menu-item"
          v-for="(child, key) in item.children"
          :key="key">
          <span>
            <img
              class="template-menu-item-img"
              :src="child.img">
            <p class="template-menu-item-text">{{ child.text }}</p>
          </span>
        </Ripple>
      </div>
    </div>
  </div>
</template>

<script>
  import Ripple from '../../components/Ripple/index.vue'

  export default {
    name: 'TemplateMenu',
    components: { Ripple },
    props: {
      data: {}
    },
    computed: {
      currentData() {
        return this.data.filter(v => v.children && v.children.length)
      }
    },
    methods: {
      onDetail (child) {
        child.click && child.click(child)
      },
      onMore (item) {
        item.moreClick && item.moreClick(item)
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .template-menu
    background: #ffffff

    + .template-menu
      margin-top: 20px

    &-header
      display: flex
      justify-content: space-between
      align-items: center
      padding: 14px 20px

      &-title
        font-family: PingFangSC-Medium
        font-size: 18px
        color: #4A4A4A
        letter-spacing: -0.43px

      &-more
        font-family: PingFangSC-Regular
        font-size: 14px
        color: #999999
        letter-spacing: -0.34px

    &-item
      width: 25%
      display: inline-flex
      align-items: center
      justify-content: center
      padding: 8px 0

      &-img
        width: 54px
        height: 54px

      &-text
        font-family: PingFangSC-Regular
        font-size: 14px
        color: #666666
        letter-spacing: -0.34px
</style>
