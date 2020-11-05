<template>
  <div class="trust-cellSelect">
    <span class="trust-cellSelect-title">
     
      {{ label }}
      
       <span class="trust-cellSelect-edit" v-if="router">
         <router-link  :to="{path:router,query: {type:query}}">添加</router-link>
    
    </span>
      <span style="color:red" v-if="required">*</span>
    </span>
   
    <SelectData
      v-model="currentValue"
      :list="source"
      v-bind="$attrs"
      :filterable="filterable"
      @name="v=>getname(v)"
      @obj="v=>getobj(v)"
    />
  </div>
</template>

<script>
  import SelectData from "../SelectData/index.vue"

  export default {
    name: 'CellSelect',
    components: { SelectData },
    props: {
      label: {},
      value: {},
      source: {},
      router:{},
      query:{},
      filterable:{
        default:false,
      type:Boolean
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
    },
    methods:{
      getname(v){

         this.$emit('name', v)
      },
      getobj(v){
          this.$emit("obj", v);
      }
    }
    
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-cellSelect
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
    &-edit 
      color:rgba(90, 110, 226,0.5)
</style>
