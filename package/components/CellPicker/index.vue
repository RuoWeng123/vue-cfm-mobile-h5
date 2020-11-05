<template>
  <div class="trust-cellPicker">
    <span class="trust-cellPicker-title">
      {{ label || title }}
        <span style="color:red" v-if="required">*</span>
    </span>
    <SelectDate
      :maxDate='maxDate'
      :minDate='minDate'
      :title="title"
      v-bind="$attrs"
      v-model="currentValue"
    />
  </div>
</template>

<script>
  import SelectDate from '../SelectDate/index.vue'

  export default {
    name: 'CellPicker',
    components: { SelectDate },
    props: {
      label: {},
      value: {},
      title: {},
        required:{
        type: Boolean,
        default: false
      },
      maxDate:{},
      minDate:{}
    },
 
    computed: {
      currentValue: {
        get () {
          return this.value
        },
        set (val) {
          this.$emit('input', val)
        }
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-cellPicker
    display: flex
    align-items: center
    justify-content: space-between
    background: #FFFFFF
    padding: 10px 15px

    &-title
      font-family: PingFangSC-Medium
      font-size: 16px
      line-height: 40px
      color: #4A4A4A
      letter-spacing: -0.39px

</style>
