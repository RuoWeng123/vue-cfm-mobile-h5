<template>
  <Page
    title="个人信息"
    theme="white"
    :border="true"
    :back="true">
    <div class="panel">
      <div class="row">
        <span>姓名</span>
        <span>{{ UserInfo.name }}</span>
      </div>
      <div class="row">
        <span>账户</span>
        <span> {{ UserInfo.id }}</span>
      </div>
      <div class="row">
        <span>职位</span>
        <span> {{ UserInfo.job }}</span>
      </div>
      <div class="row">
        <span>密码</span>
        <span>******</span>
      </div>
    </div>
  </Page>
</template>

<script>
  import { UserInfo } from '@/config'

  export default {
    storage (storage) {
      return storage
        .key(UserInfo)
        .hook('activated')
        .build({
          UserInfo: {}
        })
    }
  }
</script>

<style
  scoped
  lang="stylus">
  .panel {
    margin-top: 20px;
    background: #FFFFFF;
  }

  .row {
    color: #4A4A4A;
    margin: 0 20px;
    display: flex;
    justify-content: space-between;
    line-height: 55px;
    border-bottom: 1px solid #E9E9E9;

    &:last-child {
      border-bottom: none;
    }
  }
</style>
