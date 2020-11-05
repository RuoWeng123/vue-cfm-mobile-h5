<template>
  <Pull
    class="trust-list"
    :top-load-method="down ? pullDown : null"
    :bottom-load-method="up ? pullUp : null"
    :havedown="haveDown"
    ref="pull">
    <Nothing v-if="list.length === 0"/>
    <slot name="header"/>
    <slot
      v-for="(item, index) in list"
      :row="item"
      :index="index"
    />
    <slot name="footer"/>
  </Pull>
</template>

<script type="text/ecmascript-6">
  import Nothing from "../Nothing/index.vue"
  import Pull from "../Pull/index.vue"

  const Hook = {
    created: 'created',
    activeated: 'activeated',
    All:'all'
  }

  export default {
    name: 'List',
    components: { Nothing, Pull },
    props: {
      hook: {
        type: String,
        default: Hook.activeated
      },
      limit: {
        type: Number,
        default: 20
      },
      down: {
        type: Boolean,
        default: true
      },
      up: {
        type: Boolean,
        default: true
      },
      haveDown:{
        type: Boolean,
        default: true
      }
    },

    data() {
      return {
        list: []
      }
    },

    methods: {
      pullDown(done) {
        this.$emit('load', {
          pageSize: this.limit,
          pageNum: 1
        }, (err, data) => {
          if (err) {
            done('fail')
          } else {
            this.list = data
            done()
          }
        })
      },

      pullUp(done) {
        if(!this.haveDown){
           done()
          return 
        }else{
        this.$emit('load', {
          pageSize: this.limit,
          pageNum: Math.ceil((this.list.length / this.limit) + 1)
        }, (err, data) => {
          if (err) {
            done('fail')
          } else {
            this.list = [].concat(this.list, data)
            done()
          }
        })
        }
        
      },
      startPull() {
        this.$nextTick(() => {
          this.$refs.pull && this.$refs.pull.startPull()
        })
      }
    },

    mounted() {
      this.hook === Hook.activeated && this.startPull()
     this.hook === Hook.All &&this.startPull()
     
    },

    activated() {
      this.hook === Hook.activeated && this.startPull()
      this.hook === Hook.All &&this.startPull()
       this.list=[]
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .trust-list-nothing
    color: #606060
    display: block
    margin: 0 auto
    font-size: 70px
    text-align: center
</style>
