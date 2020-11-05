<template>

  <Page :header="false"
        theme="white"
        :footer="false">
    <van-row>
      <van-col span="6">
        <div class="header">
          <van-button
            type="info"
            size="small"
            @click="addCategory">新增分类
          </van-button>
        </div>
        <div class="category-list">
          <div v-for="item in categoryList"
               class="category-item"
               :key="item.group_id"
               @click="clickCategory(item)"
               @dblclick="editCategory(item)"
               @touchstart="gotouchstart"
               @touchmove="gotouchmove"
               @touchend="gotouchend(item)"
          >
            {{item.group_name}}
          </div>
        </div>
      </van-col>
      <van-col span="17"
               offset="1">
        <quick-reply :group-name="selectedCategory.group_name"
                     :group-id="selectedCategory.group_id"></quick-reply>
      </van-col>
    </van-row>


    <Popup
      v-model="categoryDialog"
      pos="center">
      <div class="trust-confirm">
        <p class="trust-confirm-title">
          {{isEditCategory ? '编辑' : '新增'}}
        </p>
        <div class="trust-confirm-desc">
          <Input type="text"
                 v-model="categoryName"
                 placeholder="分类名称"/>
        </div>
        <div class="trust-confirm-btnWrap">
          <div
            class="trust-confirm-cancel"
            @click="categoryDialog = false">
            取消
          </div>
          <div
            class="trust-confirm-confirm"
            @click="onSubmitCategory">
            确 定
          </div>
        </div>
      </div>
    </popup>
    <Popup
      v-model="dialogDeleteCategoryVisible"
      pos="center">
      <div class="trust-confirm">
        <p class="trust-confirm-title">
          提示
        </p>
        <p class="trust-confirm-desc">
          删除后不可恢复，请确认删除
        </p>
        <div class="trust-confirm-btnWrap">
          <div
            class="trust-confirm-cancel"
            @click="dialogDeleteCategoryVisible = false">
            取消
          </div>
          <div
            class="trust-confirm-confirm"
            @click="deleteCategoryOk">
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

  import messageList from '@/components/listDrop'
  import quickReply from './quickReply'
  import * as R from 'ramda'

  export default {
    name: 'gimmick',
    components: { quickReply },
    data () {
      return {
        replyDialog: false,
        categoryDialog: false,
        dialogDeleteVisible: false,
        dialogDeleteCategoryVisible: false,
        searchKeyword: null,
        categoryList: [],
        replyList: [],
        categoryName: null,
        replyContent: null,
        isEditCategory: false,
        isEditReply: false,
        selectedCategory: {
          group_name: null,
          group_id: undefined
        },
        selectedReply: null,
        tableOptions: [],
        timeOutEvent: 0
      }
    },
    methods: {
      onInit () {
        getQuickReplyList().then(res => {
          let list = res.data.data.map(v => v.group)
          this.categoryList = list.map(v => {
            return Object.assign({}, v, { content: v.group_name })
          })
          this.selectedCategory = this.categoryList[0]
        }).catch(err => {
          this.$message.error('服务器错误')
          this.categoryList = []
        })
      },
      addCategory () {
        this.categoryDialog = true
        this.isEditCategory = false
        this.categoryName = null
      },
      onShowEditCategory () {
        this.isEditCategory = true
      },
      editCategory (row) {
        this.isEditCategory = true
        this.categoryDialog = true
        this.selectedCategory = row
        this.categoryName = R.clone(row.group_name)
      },
      deleteCategory (item) {
        this.dialogDeleteCategoryVisible = true
        this.selectedCategory = item

      },
      deleteCategoryOk () {
        deleteReplyCategory({ name: this.selectedCategory.group_name }).then(res => {
          this.onInit()
          this.dialogDeleteCategoryVisible = false
        })
      },
      onSubmitCategory () {
        if (this.isEditCategory) {
          let params = {
            old_name: this.selectedCategory.group_name,
            new_name: this.categoryName
          }
          editReplyCategory(params).then(res => {
            this.onInit()
            this.isEditCategory = false
            this.categoryDialog = false
          })
        } else {
          addReplyCategory({ name: this.categoryName }).then(res => {
            this.onInit()
            this.isEditCategory = false
            this.categoryDialog = false
          })
        }
      },

      clickCategory (item) {
        this.selectedCategory = item
        //this.$router.push({ path: '/hk_config/quickReply', query: { ...item } })
        //this.getReply()
      },

      onEdit (row) {
        this.isEditReply = true
        this.replyDialog = true
        this.selectedReply = row
        this.replyContent = R.clone(row.Content)
      },

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
      getReply () {
        getReplyOfCategory({ group_name: this.selectedCategory.group_name }).then(res => {
          this.tableOptions = res.data.data.quick_msg_contents
        })
      },
      gotouchstart () {
        let that = this
        clearTimeout(this.timeOutEvent)//清除定时器
        that.timeOutEvent = 0
        that.timeOutEvent = setTimeout(function () {

        }, 600)//这里设置定时
      },
      //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
      gotouchend (item) {
        clearTimeout(this.timeOutEvent)
        if (this.timeOutEvent != 0) {
          //这里写要执行的内容（尤如onclick事件）
          this.deleteCategory(item)
        }
      },
//如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
      gotouchmove () {
        clearTimeout(this.timeOutEvent)//清除定时器
        this.timeOutEvent = 0
      }
    },
    mounted () {
      this.onInit()
    }
  }
</script>

<style lang="less"
       scoped>
  .header {
    padding: 5px;
    text-align: center;
  }

  .category-list {

    .category-item {
      height: 30px;
      line-height: 30px;
      background: #F6F6F6;
      padding: 5px 10px;
      margin-bottom: 4px;
      font-size: 14px;
    }
  }

  .left-container {
    height: 100vh;
    box-sizing: border-box;
    overflow-y: auto;
    padding: 10px 10px 60px;


    .content {
    }

    .footer {
      display: flex;
      justify-items: center;
    }
  }

  .right-container {
    padding: 14px;
    background: #ffffff;
    box-shadow: 2px 2px 2px #E4E4E4,2px -2px 2px #E4E4E4, -2px 2px 2px #E4E4E4,-2px -2px 2px #E4E4E4;
  }
</style>
