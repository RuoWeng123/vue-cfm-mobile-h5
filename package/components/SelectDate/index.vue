<template>
  <div
    class="trust-date"
    :class="{ 'is-select': value }">
    <span @click="onPicker">
      <span>{{ value || title }}</span>
      <i class="trust-icon icon_select"/>
    </span>
    <Picker
      v-model="currentValue"
      :title="title"
      :format="format"
      :maxDate='maxDate'
      :minDate='minDate'
      :showTemplate="showTemplate"
      ref="picker"
    />
  </div>
</template>

<script>
  import Picker from '../Picker/index.vue'

  export default {
    name: 'SelectDate',
    components: { Picker },
    props: {
      value: {},
      format: {
        type: String,
        default: 'YYYY.MM.DD'
      },
      showTemplate: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: '选择日期'
      },
       maxDate:{},
      minDate:{}
    },
    computed: {
      currentValue: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('input', val)
        }
      }
    },
    methods: {
      onPicker() {
        this.$refs.picker.show()
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">

  .trust-date
    font-family: PingFangSC-Regular
    font-size: 14px
    color: #A2A2A2

    &.is-select
      color: #4A4A4A

    i
      color: currentColor

</style>
