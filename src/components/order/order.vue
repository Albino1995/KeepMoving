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
                <span>支付日期</span><span v-text="_getOrderTime(orderDetail.pay_time)"></span>
                <span>收货人</span><span>{{orderDetail.signer_name}}</span>
                <span>总额</span><span>{{orderDetail.order_mount}}</span>
                <button v-if="_getType(item) === '待支付'" class="pay-button" @click="goPay(item)">立即支付</button>
              </div>
              <div class="good-list">
                <ul v-if="orderDetail">
                  <li v-for="good in orderDetail.goods" class="item-detail">
                    <img :src="good.goods.img[0].image" width="160" height="160"/>
                    <div class="item-desc">
                      <span class="name">{{good.goods.goods.name}}</span>
                      <span class="price">￥&nbsp;&nbsp;{{good.goods.goods.price}}</span>
                      <span>商品编号&nbsp;&nbsp;&nbsp;&nbsp;{{good.goods.goods.goods_sn}}</span>
                      <span>数量&nbsp;&nbsp;&nbsp;&nbsp;{{good.goods_num}}</span>
                      <span>颜色&nbsp;&nbsp;&nbsp;&nbsp;{{good.goods.goods_color}}</span>
                      <span>尺码&nbsp;&nbsp;&nbsp;&nbsp;{{good.goods.goods_size}}</span>
                    </div>
                    <div class="total">
                      <span>总价:￥&nbsp;{{good.goods_num * good.goods.goods.price}}</span>
                    </div>
                  </li>
                </ul>
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
      document.title = '订单列表|KeepMoving'
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
      goPay(item) {
        window.location.href = item.alipay_url
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
        margin-bottom: 10px
        span
          font-size: 13px
          margin: 5px 0
        .pay-button
          cursor: pointer
          height: 40px
          width: 100px
          margin: 10px 0
          color: #ffffff
          background-color: #000000
          border: none
          outline: none
          &:hover
            color: #000000
            background-color: #ffffff
            border: 0.5px solid #9a9a9a
            transition: all 0.3s
      .good-list
        width: 100%
        ul
          .item-detail
            display: flex
            border-top: 0.5px solid #9a9a9a
            padding: 20px
            justify-content: space-between
            .item-desc
              display: flex
              flex-direction: column
              .name
                font-size: 15px
              .price
                font-size: 15px
                color: #8b0000
                margin-bottom: 10px
            .total
              span
                font-size: 12px
      ul
        margin-bottom: 80px
        li
          .order-preview
            display: flex
            justify-content: space-between
            .type
              margin: 0 20px
</style>
