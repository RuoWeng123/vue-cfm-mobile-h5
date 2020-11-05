<template>
  <Popup v-model="visiable" appendToBody pos="bottom">
    <div class="trust-select-header">
      {{ title }}

       <Input
        :placeholder="'请输入关键字'"
        :clearable="true"
        v-model="keyword"
        v-bind="$attrs"
        v-show="filterable"
      />
      <Btn
        v-if="list.length && max > 1 && currentValue.length"
        class="trust-select-btn"
        @click="confirm"
        size="small"
      >
        确认
      </Btn>
    </div>
    <div
      class="trust-select-container trust-select-noInfo"
      v-if="list.length === 0"
    >
      暂无内容!
    </div>
    <CheckList
      v-else
      :max="max"
      :list="checklist"
      v-bind="$attrs"
      @input="change"
      v-model="currentValue"
      class="trust-select-container"
    />
  </Popup>
</template>

<script type="text/ecmascript-6">
import CheckList from "../CheckList/index.vue"
import Popup from "../Popup/index.vue"
import Btn from "../Btn/index.vue"

export default {
  name: 'Select',
  components: { CheckList, Popup, Btn },
  props: {
    title: {},
    list: {},
    max: {
      default: 99
    },
    value: {},
    filterable:{
      default:false,
      type:Boolean
    }
  },
  data() {
    return {
      visiable: false,
      keyword:'',
      checklist:this.list,
      currentValue: []
    }
  },
 
  methods: {
    show() {
      this.visiable = true
    },
    hide() {
      this.visiable = false
      this.$emit('cancel')
    },
    confirm() {
      this.visiable = false
      const val = this.max === 1 ? this.currentValue[0] : this.currentValue
      this.$emit('input', val)
    },
    change(val) {
      
      this.currentValue = val
      if (this.max === 1 && val.length) this.confirm()
    },
    indexSelect(index){
      let newlist = [];
      if(index=="" || index==null ){

          return this.list;
      }else{

          for(var i=0; i<this.list.length; i++)
            {
              if((this.list[i].label).indexOf(index)>-1){
              var tempJson = {
                  "label":this.list[i].label,
                  "value":this.list[i].value
              };
              newlist.push(tempJson);
              }
            }
           
            return newlist;
      }
    }

  },
  deactivated () {
    this.currentValue = []
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        if (this.max === 1) {
          this.currentValue = [this.value]
  
          
        } else {
          this.currentValue = this.value ? this.value : []
        }
      }
    },
    keyword(v){
     this.checklist =  this.indexSelect(v)
    },
    list(){
      this.checklist =this.list
    }
  }
}
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
.trust-select
  &-header
    position: relative
    text-align: center
    line-height: 42px
    font-size: 14px
    color: #333333
    border-bottom: 1px solid #ECECEC

  &-btn
    position: absolute !important
    right: 10px
    top: 50%
    transform: translate3d(0, -50%, 0)

  &-container
    text-align: left
    height: 220px
    box-sizing: border-box

  &-noInfo
    font-size: 14px
    color: #909090
    padding-top: 100px
    text-align: center
</style>
