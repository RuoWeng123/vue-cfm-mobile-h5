<template>
  <Page
    :header="false"
    theme="white"
    :footer="false">
<!--    <div class="filter-container pt10 mb16 pl10">-->
<!--      <Input-->
<!--        v-model="keyword"-->
<!--        placeholder="输入关键字过滤"-->
<!--        type="text"-->
<!--        @change="onChange"-->
<!--      />-->
<!--      <img class="filter-icon"-->
<!--           src="@/assets/filter.png"-->
<!--           @click="changeShowPopup"/>-->
<!--    </div>-->
    <van-list @load="getList"
              :finished="finished"
              finished-text="没有更多了"
              class="customer-container">
      <div class="customer-item"
           v-for="item in customerList"
           @click="changeSelectedCustomer(item)"
           :key="item.external_user_id">
        <person-avatar :customer-id="item.external_user_id" :show-tag="true"></person-avatar>
      </div>
    </van-list>

  </Page>
</template>

<script>
  import { getCustomerList, getCatetoryList } from '@/common/api'
  import PersonAvatar from '@/components/personAvatar'

  import * as R from 'ramda'
  export default {
    components: { PersonAvatar },
    data () {
      return {
        keyword: '',
        selectedIndex: 0,
        currentPage: 1,
        total: 1,
        loading: false,
        finished: false,
        showFilterCover: false,
        showPopup: false,
        modal: {},
        categoryList: [],
        filterFields: {
          company: [],
          customer: [],
          sex: [],
          status: [],
          birthday: []
        },
        companyTagList: [
          { value: '电商', label: '电商' },
          { value: '医美', label: '医美' },
          { value: '教育', label: '教育' }
        ],
        customerTagList: [
          { value: '90后', label: '90后' },
          { value: '70后', label: '70后' },
          { value: '医美大佬', label: '医美大佬' }
        ],
        sexTagList: [
          { value: '男', label: '男' },
          { value: '女', label: '女' },
          { value: '未知', label: '未知' }
        ],
        statusTagList: [
          { value: '初步沟通', label: '初步沟通' },
          { value: '有意向', label: '有意向' },
          { value: '无意向', label: '无意向' }
        ],
        birthdayTagList: [
          { value: '1月', label: '1月' },
          { value: '2月', label: '2月' },
          { value: '3月', label: '3月' },
          { value: '4月', label: '4月' },
          { value: '5月', label: '5月' },
          { value: '6月', label: '6月' },
          { value: '7月', label: '7月' },
          { value: '8月', label: '8月' },
          { value: '9月', label: '9月' },
          { value: '10月', label: '10月' },
          { value: '11月', label: '11月' },
          { value: '12月', label: '12月' }
        ],
        customerList: []
      }
    },
    methods: {
      onChange () {

      },
      go (item) {
        this.$router.push({ path: item.path, query: item.query })
      },
      changeShowPopup () {
        this.showPopup = true
      },
      changeSelectedCustomer (row) {
        this.$router.push({ path: '/customer/index', query: { customer_id: row.external_user_id } })
      },
      getData () {

      },
      onModelSubmit () {
        this.showPopup = false
      },
      getList () {
        if(this.currentPage > this.total){
          return
        }
        let params = {
          //days: day,
          pageSize: 10,
          pageIndex: this.currentPage
        }
        getCustomerList(params).then(res => {
          console.log(res)
          let list = res.data.clients_list.map( item =>{
            item.tags = item.tags.slice(0,2)
            return item
          })
          this.currentPage++
          this.customerList = this.customerList.concat(list)
          this.customerList = R.uniqBy(R.prop('external_user_id'),this.customerList)
          this.total = res.data.total_page

          // 数据全部加载完成
          if (res.data.clients_list.length === 0) {
            this.finished = true
          }
        })
      },
      onInit () {
        getCatetoryList().then(res => {
          this.categoryList = res.category_list.map(item => {
            return {
              value: item.follow_status,
              label: item.follow_status
            }
          })
        })
        this.getList()
      }
    },
    mounted () {
      this.onInit()
    },
    created () {

    }
  }
</script>
<style lang="less"
       scoped>
  .container {
    padding: 15px 14px 0px 14px;
  }


  .filter-container {
    width: calc(100% - 20px);
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }

  .filter-input {
    width: calc(100% - 20px);
  }

  .filter-icon {
    width: 30px;
    height: 30px;
    margin-left: 10px;
  }

  .customer-container {
    width: calc(100% - 20px);
    height: 100vh;
    padding-left: 10px;
  }

  .customer-item {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    .customer-icon {
      width: 95px;
      height: 95px;
      padding-top: 5px;
    }


    .customer-detail {
      width: calc(100% - 100px);
      height: 100px;
      padding: 14px 0px 5px 10px;

      .customer-name {
        display: flex;
        align-items: flex-start;

        .customer-user-name {
          width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .customer-sex {
          width: 25px;
          height: 25px;
        }
      }

      .customer-status {
        display: flex;
        height: 40px;
        line-height: 40px;
        align-items: flex-start;
      }
    }
  }


  .customer-picker {
    width: 80px;
  }

  .customer-tag-container {
    display: inline-flex;
    align-items: flex-start;
    align-content: flex-start;
    padding-top: 5px;

    .tag-item {
      display: inline-block;
      width: auto;
      height: 30px;
      line-height: 30px;
      padding-left: 5px;
      padding-right: 5px;
      margin-left: 5px;
      background: #f4f4f4;
      border-radius: 2px;
      font-size: 12px;
      color: #3c3c3c;
    }
  }

  .customer-tag {
    height: 30px;
    line-height: 40px;
  }

  .modal-content {
    padding-top: 15px;
    padding-left: 15px;
    padding-right: 15px;
  }

  .popup-footer {
    display: inline-flex;
    align-items: flex-end;
    height: 50px;
    width: 100%;
    justify-content: flex-end;
  }
</style>
