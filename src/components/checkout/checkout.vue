<template>
  <div class="checkout-wrapper">
    <div class="address-form">
      <span class="title">快递</span>
      <div class="delivery">
        <span>邮递类型</span>
        <span>送货上门</span>
      </div>
      <div class="address">
        <span>邮递地址</span>
        <el-select v-model="singleAddress"
                   placeholder="请选择"
                   size="small"
                   class="selection"
        >
          <el-option
            v-for="item in address"
            :key="item.signer_name + '，' + item.signer_mobile  + '，' + item.province + item.city + item.district + item.address"
            :value="item.signer_name + '，' + item.signer_mobile  + '，' + item.province + item.city + item.district + item.address"
          >
          </el-option>
        </el-select>
      </div>

    </div>
    <div class="pay-form">
      <span class="title">付款</span>
      <div class="pay">
        <span>付款方式</span>
        <span>支付宝付款</span>
      </div>
    </div>
    <div class="bottom">
      <button class="pay-button-wait" v-if="!singleAddress">立即支付</button>
      <button class="pay-button" @click="goPay" v-if="singleAddress">立即支付</button>
      <span class="total">总价: <span class="money">￥{{total}}</span></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getAddress, getShoppingCart, addOrder} from 'api/api'

  export default {
    data() {
      return {
        address: {},
        shoppingCart: {},
        total: 0,
        singleAddress: ''
      }
    },
    activated() {
      document.title = '确认订单信息|KeepMoving'
      this.total = 0
      this.singleAddress = ''
      getAddress().then((res) => {
        this.address = res.data
      })
      getShoppingCart().then((res) => {
        this.shoppingCart = res.data
        // 没有商品返回购物车组件
        if (!this.shoppingCart.length) {
          this.$router.push({path: '/shopping_cart'})
        }
        this.shoppingCart.forEach((item) => {
          this.total += item.goods.goods.price * item.nums
        })
      })
    },
    methods: {
      goPay() {
        this._normalizeItem()
        let params = {}
        params.address = this.singleAddress.address
        params.signer_name = this.singleAddress.signer_name
        params.signer_mobile = this.singleAddress.signer_mobile
        // 取得参数后将singleAddress置为空字符串，防止多次提交的报错
        this.singleAddress = ''
        addOrder(params).then((res) => {
          window.location.href = res.data.alipay_url
        })
      },
      _normalizeItem() {
        let item = this.singleAddress.split('，')
        this.singleAddress = {}
        this.singleAddress.signer_name = item[0]
        this.singleAddress.signer_mobile = item[1]
        this.singleAddress.address = item[2]
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .checkout-wrapper
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    .address-form
      display: flex
      flex-direction: column
      width: 700px
      border: 1px solid #d3d3d3
      background-color: rgb(248, 248, 248)
      margin: 50px 0 10px 0
      padding: 20px
      .title
        font-size: 13px
        margin-bottom: 20px
      div
        margin-bottom: 10px
        display: flex
        flex-direction: column
        span
          font-size: 13px
          margin: 5px 0

      .address
        .selection
          width: 55%
          margin: 5px 0
    .pay-form
      display: flex
      flex-direction: column
      width: 700px
      border: 1px solid #d3d3d3
      background-color: rgb(248, 248, 248)
      margin: 10px 0 100px 0
      padding: 20px
      .title
        font-size: 13px
        margin-bottom: 20px
      .pay
        margin-bottom: 10px
        display: flex
        flex-direction: column
        span
          font-size: 13px
          margin: 5px 0
    .bottom
      right: 0
      left: 0
      bottom: 0
      position: fixed
      z-index: 50
      padding: 40px
      background-color: #ffffff
      .pay-button-wait
        cursor: not-allowed
        height: 40px
        width: 100px
        color: #ffffff
        background-color: #808080
        border: none
        outline: none
      .pay-button
        cursor: pointer
        height: 40px
        width: 100px
        color: #ffffff
        background-color: #000000
        border: none
        outline: none
        &:hover
          color: #000000
          background-color: #ffffff
          border: 0.5px solid #9a9a9a
          transition: all 0.3s
      .total
        font-size: 15px
        margin-left: 30px
        .money
          font-weight: 700
</style>
