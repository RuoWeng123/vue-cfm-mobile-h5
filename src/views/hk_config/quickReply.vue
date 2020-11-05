<template>
  <Page :header="false"
        theme="white"
        :footer="false">
    <div class="header">
      <van-button
            type="info"
           size="small"
           @click="onCreate">新增话术
      </van-button>
      <Input v-model="keyword"
             :clearable="false"
             style="width: 30vw;float:right;height: 30px;line-height:30px;margin-right:10px;"
             placeholder="请输入关键字搜索"/>
    </div>
    <message-list :list="replyList"
                  style="width: 100%"
                  @share="onShare"
                  @jump="clickReply"
                  @edit="onEdit"
                  @delete="onDelete"/>
    <Popup
      v-model="dialogDeleteVisible"
      :appendToBody="true"
      pos="center">
      <div class="trust-confirm">
        <p class="trust-confirm-title">
        <p class="trust-confirm-title">
          提示
        </p>
        <p class="trust-confirm-desc">
          删除后不可恢复，请确认删除
        </p>
        <div class="trust-confirm-btnWrap">
          <div
            class="trust-confirm-cancel"
            @click="onCancel">
            取消
          </div>
          <div
            class="trust-confirm-confirm"
            @click="deleteOk">
            确 定
          </div>
        </div>
      </div>
    </popup>

    <Popup
      v-model="replyDialog"
      :appendToBody="true"
      :height="300"
      pos="center">
      <div class="trust-confirm-edit">
        <p class="trust-confirm-title">
          {{isEditReply ? '编辑' : '新增'}}
        </p>
        <div class="trust-confirm-edit-desc">
          <Input type="textarea"
                 v-model="replyContent"
                 placeholder="快速回复内容"/>
        </div>
        <div class="trust-confirm-btnWrap">
          <div
            class="trust-confirm-cancel"
            @click="replyDialog = false">
            取消
          </div>
          <div
            class="trust-confirm-confirm"
            @click="onSubmitReply">
            确 定
          </div>
        </div>
      </div>
    </popup>
  </Page>
</template>

<script>
  import {
    getQuickReplyList,
    addReplyCategory,
    editReplyCategory,
    deleteReplyCategory,
    deleteReplyOfCategory,
    updateReplyOfCategory,
    createReplyOfCategory,
    getReplyOfCategory
  } from '@/common/api'
  import * as R from 'ramda'
  import messageList from '@/components/listDrop'
  export default {
    name: 'quickReplay',
    props:{
      groupName: {
        type:String,
        default: ""
      },
      groupId: {
        type:String,
        default: ""
      }
    },
    components: { messageList },
    data () {
      return {
        title:"快速回复",
        keyword:null,
        replyDialog: false,
        dialogDeleteVisible: false,
        isEditReply: false,
        selectedReply: null,
        replyContent: null,
        replyList: [],
        selectedCategory:{
          group_name: null,
          group_id: null
        }
      }
    },
    mounted () {
      this.getReply()
    },
    methods: {
      onCreate () {
        if (!this.selectedCategory || !this.selectedCategory.group_id) {
          this.$message.info('请优先选择一个分类')
          return
        }
        this.isEditReply = false
        this.replyDialog = true
        this.selectedReply = null
        this.replyContent = null
      },
      onDelete (row) {
        this.dialogDeleteVisible = true
        this.selectedReply = row
      },
      onCancel () {
        this.dialogDeleteVisible = false
      },
      onShare(row){
       //需要agentConifg

      },
      deleteOk () {
        let params = {
          group_id: this.selectedCategory.group_id,
          item_id: this.selectedReply.ItemId
        }
        this.dialogDeleteVisible = false
        deleteReplyOfCategory(params).then(res => {
          this.$message.success('操作成功')
          this.getReply()
        })
      },
      onSubmitReply () {
        if (this.isEditReply) {
          this.updateReply()
        } else {
          this.createReply()
        }
      },
      updateReply () {
        let params = {
          group_id: this.selectedCategory.group_id,
          quick_msg_contents: [
            {
              item_id: this.selectedReply.ItemId,
              content_type: 0,
              content: this.replyContent
            }
          ]
        }
        updateReplyOfCategory(params).then(res => {
          this.getReply()
          this.replyDialog = false
        })
      },
      createReply () {
        let params = {
          group_id: this.selectedCategory.group_id,
          quick_msg_contents: [
            {
              content_type: 0,
              content: this.replyContent
            }
          ]
        }
        createReplyOfCategory(params).then(res => {
          this.getReply()
          this.replyDialog = false
        })
      },
      onEdit (row) {
        this.isEditReply = true
        this.replyDialog = true
        this.selectedReply = row
        this.replyContent = R.clone(row.Content)
      },
      clickReply (row) {
        var _this = this

      },
      getReply () {
        getReplyOfCategory({ group_name: this.groupName }).then(res => {
          this.replyList = res.data.data.quick_msg_contents.map(v => {
            return Object.assign({}, v, { content: v.Content })
          })
          console.log(this.replyList)
        })
      }
    },
    watch:{
      groupName: {
        deep: true,
        handle: function(val, old){
          this.getReply()
        }
      },
      groupId: function(val){
        this.selectedCategory.group_id = val
        this.getReply()
      }
    }
  }
</script>


<style
  lang="stylus"
  type="text/stylus"
  rel="stylesheet/stylus">
  .header {
    padding: 5px;
  }

  .trust-confirm-edit
    display: flex
    flex-direction: column
    height: 300px
    color: #101010
    &-title
      text-align: left
      line-height: 50px
      letter-spacing: 1px
      padding-left: 16px
      font-size: 14px
      color: #333333

    &-desc
      flex: 1
      text-indent: 10px
      padding: 0 20px
      font-size: 14px
      line-height: 22px
      overflow-x: hidden
      overflow-y: auto

    &-btnWrap
      display: flex
      text-align: center
      font-size: 14px
      height: 45px
      line-height: 45px
      border-top: 1px solid #F0F0F0

    &-cancel
      font-family: PingFangSC-Regular
      font-size: 14px
      color: #999999
      flex: 1

      &:active
        background: #F0F0F0

    &-confirm
      font-family: PingFangSC-Medium
      font-size: 14px
      color: #4A4A4A
      flex: 1
      border-left: 1px solid #F0F0F0

      &:active
        background: #F0F0F0



  .trust-confirm
    display: flex
    flex-direction: column
    height: 184px
    color: #101010

    &-title
      text-align: left
      line-height: 50px
      letter-spacing: 1px
      padding-left: 16px
      font-size: 14px
      color: #333333

    &-desc
      flex: 1
      text-indent: 10px
      padding: 0 20px
      font-size: 14px
      line-height: 22px
      overflow-x: hidden
      overflow-y: auto

    &-btnWrap
      display: flex
      text-align: center
      font-size: 14px
      height: 45px
      line-height: 45px
      border-top: 1px solid #F0F0F0

    &-cancel
      font-family: PingFangSC-Regular
      font-size: 14px
      color: #999999
      flex: 1

      &:active
        background: #F0F0F0

    &-confirm
      font-family: PingFangSC-Medium
      font-size: 14px
      color: #4A4A4A
      flex: 1
      border-left: 1px solid #F0F0F0

      &:active
        background: #F0F0F0

</style>
