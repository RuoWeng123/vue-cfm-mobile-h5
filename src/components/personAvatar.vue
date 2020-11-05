<template>
  <div class="customer-customer">
    <div class="customer-icon">
      <avatar :username="customer.name.slice(0,6)"
              :size="60"
              style="width: 70px;height: 70px;margin-left: 10px;"
              v-if="customer.name"></avatar>
    </div>
    <div class="customer-detail ml10">
      <div class="customer-name mb5">
        <span class="customer-user-name mr10">{{ customer.name }}</span>
      </div>
      <div class="customer-status">
        <SelectData
          class="customer-picker"
          style="color: currentColor; font-size: inherit;"
          :max="1"
          @obj="changeStatus"
          :list="categoryList"
          v-model="customer.current_status"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { getCatetoryList, getCustomerById, updateCustomerStatus } from '@/common/api'
  import Avatar from 'vue-avatar'
  import { Toast } from 'vant'

  export default {
    name: 'personAvatar',
    props: ['customerId', 'showTag'],
    components: { Avatar },
    data () {
      return {
        customer: {},
        categoryList: []
      }
    },
    methods: {
      onInit () {
        getCatetoryList().then(res => {
          this.categoryList = res.category_list.map(item => {
            return {
              value: item.follow_status,
              label: item.follow_status
            }
          })
        })
        this.getTargetCustomer()
      },
      getTargetCustomer () {
        if (!this.customerId) return
        let id = this.customerId
        getCustomerById({ externalUserId: id }).then(res => {
          this.customer = res.data.top
        })
      },
      changeStatus (data) {
        let params = {
          'external_user_id': this.customerId,
          'follow_status': data[0].value
        }
        updateCustomerStatus(params).then(res => {
          Toast.success('操作成功')
        })
        console.log('udpate status', data)
      }
    },
    mounted () {
      this.onInit()
    },
    watch: {
      customerId: function (val, old) {
        this.onInit()
      }
    }
  }
</script>

<style lang="less"
       scoped>
  .customer-customer {
    width: 100%;
    height: 100px;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;

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
        align-customers: flex-start;

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
        align-customers: flex-start;
      }
    }
  }
</style>
