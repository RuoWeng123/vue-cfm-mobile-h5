<template>
  <div
    class="trust-flex"
    :class="{
      'trust-flex-col': orient === 'vertical',
      'trust-flex-row': orient === 'horizontal'
    }"
    :style="styles">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Flex',
  props: {
    gutter: {
      type: Number,
      default: 8
    },
    orient: {
      type: String,
      default: 'horizontal'
    },
    justify: String,
    align: String,
    wrap: String,
    direction: String
  },
  computed: {
    styles () {
      const styles = {
        'justify-content': this.justify,
        '-webkit-justify-content': this.justify,
        'align-items': this.align,
        '-webkit-align-items': this.align,
        'flex-wrap': this.wrap,
        '-webkit-flex-wrap': this.wrap,
        'flex-direction': this.direction,
        '-webkit-flex-direction': this.direction
      }
      return styles
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-flex
    width: 100%
    text-align: left
    display: flex
    display: -webkit-flex
    box-align: center
    align-items: center

    .trust-flex-item
      flex: 1
      -webkit-flex: 1
      min-width: 20px
      width: 0

      &:first-child
        margin-left: 0 !important
        margin-top: 0 !important

  .trust-flex-row
    box-direction: row
    box-orient: horizontal
    flex-direction: row

  .trust-flex-col
    box-orient: vertical
    flex-direction: column

    > .trust-flex-item
      width: 100%

</style>
