<template>
  <Ripple
    @click="handlerClick"
    class="trust-tabbar-item"
    :class="{'is-active': active}">
    <span class="trust-tabbar-item-core">
      <i
        class="trust-tabbar-item-icon"
        :class="currentIcon"
        v-if="currentIcon"
      />
      <p
        v-if="panel && panel.text"
        class="trust-tabbar-item-text">
        {{panel.text}}
      </p>
      <Badge
        v-if="panel && panel.badge"
        class="trust-tabbar-item-badge"
        v-bind="panel.badge"
      />
    </span>
  </Ripple>
</template>

<script type="text/ecmascript-6">
  import Ripple from '../Ripple/index.vue'
  import Badge from '../Badge/index.vue'

  export default {
    name: 'TabbarItem',
    components: { Ripple, Badge },
    props: {
      panel: {},
      active: {
        type: Boolean
      }
    },
    computed: {
      currentIcon() {
        const { font, activeFont } = this.panel
        return this.active ? (activeFont || font) : font
      }
    },
    methods: {
      handlerClick(e) {
        this.$emit('click', e)
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-tabbar-item
    flex: 1
    display: flex
    align-items: center
    justify-content: center
    text-align: center
    flex-direction: column
    height: 100%
    color: #999999

    &-core
      position: relative
      padding: 5px 8px

      .trust-tabbar-item-badge
        position: absolute
        top: 5px
        left: 80%

    &-img
      width: 20px
      height: 20px

    &-icon
      font-size: 20px

    &-text
      font-size: 12px

</style>
