<template>
  <div class="container">
    <div class="footer">
      上海冰丰科技有限公司
    </div>
    <div class="content">
      <div class="popup">
        <div class="error-container">
          <div class="logo"></div>
          <div class="title mb10">
            好客跟进•专业访客管理服务平台
          </div>
          <div class="button-area mb10">
            <van-button type="primary" @click="onLogin" block>授权登录</van-button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {AuthLogin, setToken } from '@/common/api'

  export default {
    mounted() {
      this.onInit()
    },
    methods: {
      onInit(){
        if(this.$route.fullPath.indexOf('?')){
          let Authorization = this.$route.fullPath.split('=')[1] ? this.$route.fullPath.split('=')[1] : null
          if (Authorization) {
            setToken(Authorization)
            this.$router.push({path:'/basic/main'})
          }
        }else{
          this.onLogin()
        }

      },
      onLogin(){
        AuthLogin().then(res =>{
          console.log("页面返回",res.data.url)
          if(!res.data || !res.data.url){
            this.$message.error("服务器错误")
            return
          }
          window.location.href = res.data.url
        }).catch(err =>{

        })
      }
    }
  }
</script>

<style
  lang="less"
  scoped>
  .container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column-reverse;

    .content{
      width: 100%;
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      .popup{
        width:360px;
        height: 460px;
        display: block;


        .error-container{
          display: flex;
          justify-content: center;
          flex-direction: column;
          width: auto;
          height: 100%;
          padding: 14px;
          align-items: center;


          a{
            text-decoration: none;
          }
          .logo{
            width: 150px;
            height: 150px;
            background: url('~@/assets/logo-white.png') no-repeat center center;
            background-size: contain;
          }
          .title{
            width: 100%;
            display: block;
            align-items: center;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
          }
          .info{
            font-size: 14px;
            width: 100%;
            display: block;
            text-align: center;
            color: #535353;
          }
          .button-area{
            width: 100%;
            display: block;
            text-align: center;
            height: 50px;
            line-height: 50px;
          }
          .redirected{
            width: 100%;
            display: block;
            text-align: center;
            font-size: 14px;
          }
        }
      }
    }

    .footer{
      width: 100%;
      height: 60px;
      text-align: center;
      line-height: 60px;
      font-size: 12px;
      color:gray;
    }
  }
</style>

