<template>
  <div class="order-wrapper">
    <nav class="breadcrumb">
      <router-link tag="span" to="/me/info">个人信息</router-link>
      <span class="active">订单</span>
      <router-link tag="span" to="/me/address">地址簿</router-link>
    </nav>
    <div class="form-wrapper">
      <span class="title">订单</span>
      <ul>
        <el-collapse accordion>
          <li v-for="item in order">
            <el-collapse-item>
              <template slot="title">
                <div class="order-preview" @click="getUserOrderDetail(item)">
                  <span>{{item.order_sn}}</span>
                  <span v-html="_getType(item)" class="type" :style='{color : _getColorValue(item)}'>
                  </span>
                </div>
              </template>
              <div class="order-detail">
                <span>配送地址</span><span>{{orderDetail.address}}</span>
                <span>订单日期</span><span v-text="_getOrderTime(orderDetail.pay_time)"></span>
                <span>收货人</span><span>{{orderDetail.signer_name}}</span>
                <span>总额</span><span>{{orderDetail.order_mount}}</span>
              </div>
            </el-collapse-item>
          </li>
        </el-collapse>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getOrder, getOrderDetail} from 'api/api'

  export default {
    data() {
      return {
        order: [],
        orderDetail: {}
      }
    },
    activated() {
      this.getUserOrder()
    },
    methods: {
      getUserOrder() {
        getOrder().then((res) => {
          this.order = res.data
        })
      },
      getUserOrderDetail(item) {
        getOrderDetail(item.id).then((res) => {
          this.orderDetail = res.data
        })
      },
      _getType(item) {
        if (item.pay_status === 'TRADE_SUCCESS') {
          return '已支付'
        }
        if (item.pay_status === 'TRADE_CLOSED') {
          return '关闭交易'
        }
        return '待支付'
      },
      _getColorValue(item) {
        if (item.pay_status === 'TRADE_SUCCESS') {
          return '#228b22'
        }
        if (item.pay_status === 'TRADE_CLOSED') {
          return '#8b0000'
        }
        return '#ff8c00'
      },
      _getOrderTime(str) {
        let patt = new RegExp('(.*)T.*')
        if (patt.exec(str)) {
          return patt.exec(str)[1]
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .order-wrapper
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    .breadcrumb
      width: 100%
      text-align: center
      border-top: 1px solid #d3d3d3
      border-bottom: 1px solid #d3d3d3
      margin: 20px 0 30px 0
      display: flex
      justify-content: center
      align-items: center
      height: 50px
      span
        font-size: 13px
        margin 0 100px
        height: 17px
        padding: 1px
        border-bottom 1px solid #ffffff
        &:hover
          border-bottom 1px solid #000000
          transition: all 0.6s
      .active
        border-bottom 1px solid #000000
    .form-wrapper
      width: 600px
      display: flex
      flex-direction: column
      .title
        font-size: 24px
        font-weight: 700
        margin-bottom: 30px
      .order-detail
        display: flex
        flex-direction: column
        span
          font-size: 13px
          margin: 5px 0
      ul
        margin-bottom: 80px
        li
          .order-preview
            display: flex
            justify-content: space-between
            .type
              margin: 0 20px
</style>
