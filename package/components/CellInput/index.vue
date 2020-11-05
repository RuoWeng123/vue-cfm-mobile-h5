<template>
  <div class="trust-cellInput">
    <span class="trust-cellInput-title">
     
      {{ label }}
       <span style="color:red" v-if="required">*</span>
    </span>
    <span class="trust-cellInput-input">
      <Input
        :placeholder="placeholder"
        :clearable="false"
        v-model="currentValue"
        v-bind="$attrs"
        :disabled="isdisable"
      />
    </span>
  </div>
</template>

<script>
  import Input from '../Input/index.vue'

  export default {
    name: 'CellInput',
    components: { Input },
    props: {
      label: {},
      value: {},
      placeholder: {
        type: String,
        default: '请输入'
      },
      isdisable:{
        type: Boolean,
        default: false
      },
      required:{
        type: Boolean,
        default: false
      }
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
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-cellInput
    display: flex
    justify-content: space-between
    background: #FFFFFF
    padding: 10px 15px

    &-title
      font-family: PingFangSC-Medium
      font-size: 16px
      line-height: 40px
      color: #4A4A4A
      letter-spacing: -0.39px

    &-input
      flex: 1
      text-align: right
      margin: 0 5px 0 10px
      color: #4a4a4a

      .trust-input-core
        padding-right: 0

</style>
