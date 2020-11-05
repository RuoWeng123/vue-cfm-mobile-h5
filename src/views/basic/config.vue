<template>
  <Page
    :header="false"
    theme="white"
    :footer="false">
    <div class="container">
      <div class="flex-wrp"
           v-for="item in unitList"
           :key="item.value"
           @click="jumpToTarget(item)">
        <div class="flex-item">
          <img class="div-image"
               :src="item.path"/>
          <span>{{item.label}}</span>
        </div>
      </div>
    </div>
  </Page>
</template>

<script>
  import { UserInfo } from '@/config'
  import { browser } from 'trust'

  export default {
    data () {
      return {
        unitList: [
          { value: '渠道二维码', label: '渠道二维码', path: require('@/assets/qrcode.png'), router:'/hk_config/qrCode' },
          { value: '群激活码', label: '群激活码', path: require('@/assets/group_qrcode.png') },
          { value: '删人提醒', label: '删人提醒', path: require('@/assets/delete_warning.png') },
          { value: '流失客户', label: '流失客户', path: require('@/assets/customer_loose.png') },
          { value: '朋友圈展示', label: '朋友圈展示', path: require('@/assets/moments.png') },
          { value: '客户跟进', label: '客户跟进', path: require('@/assets/customer_note.png') },
          { value: '快速恢复', label: '快速恢复', path: require('@/assets/quick_reply.png'), router:'/hk_config/gimmick' }
        ]
      }
    },
    storage (storage) {
      return storage
        .key(UserInfo)
        .hook('activated')
        .build({
          UserInfo: {},
          LastUser: {}
        })
    },
    methods: {
      jumpToTarget (data) {
        //this.$router.push('/basic/main')
        if(data.router){
          this.$router.push(data.router)
        }
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: stretch;
    align-content: flex-start;
    padding-top: 10px;
  }

  .flex-wrp {
    width: 25vw;
    height: 100px;

  }

  .flex-item {
    width: 100%;
    height: 100%;
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .view-image {
    width: 60px;
    height: 60px;
  }
</style>
