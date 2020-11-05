<template>
  <div class="trust-collapse">
    <div @click="onToggle">
      <slot :active="isActive" name="title" />
    </div>
    <CollapseTransition v-show="isActive">
      <div class="trust-collapse-content">
        <slot :active="isActive" />
      </div>
    </CollapseTransition>
  </div>
</template>

<script type="text/ecmascript-6">
import CollapseTransition from './CollapseTransition'

export default {
  name: 'Collapse',
  components: { CollapseTransition },
  props: {
    data: {},
  },
  computed: {
    isActive () {
      return this.$parent.currentValue.indexOf(this.data) > -1
    },
  },
  watch: {
      isActive (val) {
        if(val) {
          this.$emit('open')
        } else {
          this.$emit('close')
        }
      }
    },
  methods: {
    onToggle () {
      this.$parent.onToggle(this.data)
    } 
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">

.trust-collapse
  background: #FFFFFF
  border-radius: 4px
  margin: 10px

  &-content
    transform-origin: top center
    transition: all .3s cubic-bezier(.645, .045, .355, 1);

  &-ScaleFade

    &-enter, &-leave-active
      opacity: 0
      transform: scaleY(0)
</style>
