<template>
  <Page
    title="好客跟进"
    :header="false"
    :footer="false">
    <Tabbar v-model="page">
      <TabbarPanel
        text="概览"
        font="iconfont iconshouyen"
        activeFont="iconfont iconshouyey">
        <TabbarHome/>
      </TabbarPanel>
      <TabbarPanel
        text="客户"
        font="iconfont iconxitongn"
        activeFont="iconfont iconxitongy">
        <TabbarMenu/>
      </TabbarPanel>
      <TabbarPanel
        text="工具"
        font="iconfont iconshezhin"
        activeFont="iconfont iconshezhiy">
        <TabbarConfig/>
      </TabbarPanel>
    </Tabbar>
  </Page>
</template>

<script>
  import TabbarHome from './home.vue'
  import TabbarMenu from './menu.vue'
  import TabbarConfig from './config.vue'

  export default {
    components: { TabbarHome, TabbarMenu, TabbarConfig },
    data () {
      return {
        page: 0
      }
    }
  }
</script>
