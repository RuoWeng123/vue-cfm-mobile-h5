<template>
  <div
    class="trust-checkList"
    :class="{ 'is-limit': max > 1 && max <= currentValue.length }"
    @change="$emit('change', currentValue)">
    <slot name="title">
      <div
        class="trust-checkList-title"
        v-if="title">
        {{title}}
      </div>
    </slot>
    <div class="trust-checkList-wrapper">
      <CheckBox
        v-for="(option, index) in checklist"
        v-model="currentValue"
        v-bind="$attrs"
        :disabled="option && option.disabled"
        :inline="false"
        :name="getValue(option)"
        :key="index">
        <slot v-bind="option">
          {{ getLabel(option) }}
        </slot>
      </CheckBox>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import CheckBox from "../CheckBox/index.vue"
  import _ from 'lodash'

  export default {
    name: 'CheckList',
    components: { CheckBox },
    props: {
      labelKey: {
        default: 'label'
      },
      valueKey: {
        default: 'value'
      },
      max: {
        type: Number
      },
      title: {
        type: String
      },
      list: {
        required: true
      },
      value: {
        type: Array
      }
    },
    data(){
      return{
        checklist:this.list
      }
    },
    computed: {
      currentValue: {
        get() {
          return this.value
        },
        set(val) {
          if (this.max === 1 && val.length > 1) val.shift()
          if (this.max > 1 && val.length > this.max) val.pop()
          this.$emit('input', val)
        }
      }
    },
   
    methods: {
      getLabel(obj) {
        return _.get(obj, this.labelKey)
      },
      getValue(obj) {
        return this.valueKey ? _.get(obj, this.valueKey) : obj
      }
    },
    watch:{
      list(){
       this.checklist = this.list
     
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-checkList
    display: flex
    flex-direction: column
    width: 100%
    height: 100%
    flex: 1
    background-color: #ffffff

    &.is-limit
      .trust-checkBox-input + .trust-checkBox-core:not(:checked)
        pointer-events: none
        background-color: #d9d9d9
        border-color: #d9d9d9

    &-title
      color: #333333
      line-height: 30px
      font-size: 14px
      padding: 0 10px
      border-bottom: 1px solid #f2f3f4

    &-wrapper
      flex: 1
      overflow: auto
      -webkit-overflow-scrolling: touch

      &::-webkit-scrollbar
        display: none
</style>
