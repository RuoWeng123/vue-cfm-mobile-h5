<template>
  <Page
    class="template-login"
    :header="false"
    bgColor="#ffffff">
    <img
      class="template-login-logo"
      :src="logo">
    <span class="template-login-title">
      {{ title }}
    </span>
    <span class="template-login-desc">
      {{ desc }}
    </span>
    <div class="template-login-info">
      <transition name="template-login-fade">
        <div
          class="template-login-message"
          v-if="message">
          <i class="trust-icon icon_warn_fill"/>
          <span>{{ message }}</span>
        </div>
      </transition>
    </div>
    <div class="template-login-username">
      <Input
        v-model="currentValue.username"
        placeholder="用户名"
        type="text"
      />
    </div>
    <div class="template-login-password">
      <Input
        v-model="currentValue.password"
        placeholder="密码"
        :type="close ? 'password' : 'text'"
        :clearable="false"
      />
      <i
        :class="close ? 'template-login-password-eyeclose icon_eye_close' : 'template-login-password-eyeopen icon_eye_open'"
        class="trust-icon icon_eye_close"
        @click="close = !close"
      />
    </div>
    <div
      class="template-login-submit"
      @click="onLogin">
      {{ currentBtn }}
    </div>
    <a 
      @click="onPrivacy" 
      class="template-login-privacy">
      {{privacy}}
    </a>
    <div class="template-login-footer">
      {{ footer }}
    </div>
  </Page>
</template>

<script>
  const LoginText = ['登录', '登录中...']
  const Message = ['请输入用户名！', '请输入密码！', '请稍后...', '登录成功！']

  export default {
    name: 'TemplateLogin',
    props: {
      logo: {},
      title: {},
      desc: {},
      footer: {},
      value: {},
      auto: {},
      privacy:{},
      privacyPath:{}
    },
    computed: {
      currentValue: {
        get() {
          return this.value || {}
        },
        set(val) {
          this.$emit('input', val)
        }
      },
      currentBtn() {
        return this.inLoading ? LoginText[1] : LoginText[0]
      }
    },
    data() {
      return {
        close: true,
        message: '',
        inLoading: false
      }
    },
    created() {
      this.auto && this.value && this.onLogin()
    },
    methods: {
      onLogin() {
        if (this.inLoading) return
        if (!this.currentValue.username) {
          this.message = Message[0]
        } else if (!this.currentValue.password) {
          this.message = Message[1]
        } else {
          this.message && (this.message = Message[2])
          this.inLoading = true
          this.$emit('login', this.currentValue, (err) => {
            this.message = err ? err.message : ''
            this.inLoading = false
          })
        }
      },
      onPrivacy(){
        this.$router.push('/basic/privacy')
      }
    }
  }
</script>

<style
  lang="stylus"
  type="text/stylus"
  rel="stylesheet/stylus">
  .template-login
    position: relative
    width: 100%
    height: 100%
    overflow: auto
    -webkit-overflow-scrolling: touch

    &-logo
      width: 86px
      height: 86px
      display: block
      margin: 78px auto 10px

    &-title
      display: block
      font-family: PingFangSC-Medium
      font-size: 24px
      color: #000000
      letter-spacing: 1.14px
      text-align: center

    &-desc
      display: block
      text-align: center
      font-family: PingFangSC-Medium
      font-size: 14px
      color: #777777
      letter-spacing: 0.67px
      line-height: 24px

    &-privacy
      display: block
      text-align: center
      font-family: PingFangSC-Medium
      font-size: 14px
      color: #007FFF
      margin-top 10px
      letter-spacing: 0.67px
      line-height: 24px
      text-decoration:none

    &-info
      padding-top: 15px
      height: 70px
      box-sizing: border-box

    &-username
      margin: 10px 20px 0
      height: 52px
      border-bottom: 1px solid #F0F0F0

    &-password
      position: relative
      margin: 10px 20px 0
      height: 52px
      border-bottom: 1px solid #F0F0F0
      padding-right: 45px

      &-eyeopen, &-eyeclose
        bottom: 50%
        right: 0
        color: #999999
        position: absolute
        transform: translateY(50%)

      &-eyeopen
        bottom: 52%
        font-size: 18px
        right: 2px

      &-eyeclose
        font-size: 16px

    &-message
      display: flex
      align-items: center
      height: 28px
      line-height: 28px
      margin: 10px 53px
      border-radius: 4px
      background: #faeced
      transition: all .3s ease

      i
        display: inline-block
        vertical-align: middle
        color: #E6394E
        margin: 0 15px

      span
        font-family: PingFangSC-Regular
        font-size: 14px
        color: #E6394E
        letter-spacing: 0
        text-align: left

    &-submit
      font-size: 14px
      text-align: center
      color: #ffffff
      margin: 30px 20px 0
      line-height: 44px
      background: #8795DE
      border-radius: 100px

    &-footer
      position: absolute
      width: 100%
      bottom: 10px
      font-family: PingFangSC-Regular
      font-size: 12px
      color: #A2A2A2
      letter-spacing: 0.57px
      text-align: center

    .template-login-fade-enter, .template-login-fade-leave-active
      opacity: 0
</style>
