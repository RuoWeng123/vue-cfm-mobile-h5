<template>
  <Page
    class="template-menuEdit"
    title="菜单设置"
    :back="true"
    :rightData="rightData">
    <div
      class="template-menuEdit-item"
      v-for="(item, index) in currentData"
      :key="index">
      <div class="template-menuEdit-item-title">
        {{ item.title }}
      </div>
      <ul class="template-menuEdit-item-content">
        <li
          class="template-menuEdit-item-row"
          v-for="(child, key) in item.children"
          :key="key">
          <span>
            <img
              class="template-menuEdit-item-row-img"
              :src="child.img">
            <span class="template-menuEdit-item-row-text">
              {{ child.text }}
            </span>
          </span>
          <Change v-model="child.selected"/>
        </li>
      </ul>
    </div>
  </Page>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'TemplateMenuEdit',
    props: {
      value: {}
    },
    data () {
      return {
        currentData: []
      }
    },
    computed: {
      rightData () {
        const icon = {
          layout: 'Icon',
          icon: 'trust-icon icon_compile',
          click: () => {
            const val = _.cloneDeep(this.currentData)
            this.$emit('input', val)
            this.$emit('change', val)
            this.$router.back()
          }
        }
        return JSON.stringify(this.value) === JSON.stringify(this.currentData) ? [] : [icon]
      }
    },
    watch: {
      value: {
        immediate: true,
        handler () {
          this.currentData = _.cloneDeep(this.value)
        }
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .template-menuEdit

    &-item
      background: #ffffff
      margin-top: 10px

      &-title
        display: flex
        justify-content: space-between
        align-items: center
        padding: 14px 20px 10px
        font-family: PingFangSC-Medium
        font-size: 18px
        color: #4A4A4A
        letter-spacing: -0.43px

      &-row
        display: flex
        justify-content: space-between
        align-items: center
        margin: 0 20px
        padding: 12px 0
        border-bottom: 1px solid #F0F0F0

        &:last-child
          border-bottom: none

        &-img
          display: inline-block
          vertical-align: middle
          margin-left: 4px
          width: 32px
          height: 32px

        &-text
          margin-left: 10px
          font-family: PingFangSC-Regular
          font-size: 14px
          color: #000000
          letter-spacing: -0.34px

        &-btn
          font-family: PingFangSC-Regular
          font-size: 14px
          color: #999999
          letter-spacing: -0.34px
          text-align: right
</style>
