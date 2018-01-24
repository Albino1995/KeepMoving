<template>
  <div class="address-wrapper">
    <nav class="breadcrumb">
      <router-link tag="span" to="/me/info">个人信息</router-link>
      <router-link tag="span" to="/me/order">订单</router-link>
      <span class="active">地址簿</span>
    </nav>
    <div class="form-wrapper">
      <span class="title">地址簿</span>
      <ul>
        <li v-for="(item, index) in address" class="address">
          <span class="number">地址{{index + 1}}</span>
          <div class="address-detail">
            <span class="information">省份</span>
            <span class="information-value">{{item.province}}</span>
            <span class="information">城市</span>
            <span class="information-value">{{item.city}}</span>
            <span class="information">区</span>
            <span class="information-value">{{item.district}}</span>
            <span class="information">详细地址</span>
            <span class="information-value">{{item.address}}</span>
            <span class="information">收货人姓名</span>
            <span class="information-value">{{item.signer_name}}</span>
            <span class="information">收货人联系方式</span>
            <span class="information-value">{{item.signer_mobile}}</span>
          </div>
          <button class="button">删除地址</button>
        </li>
      </ul>
      <div class="button-add">新增地址</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getAddress} from 'api/api'
  import VDistpicker from 'v-distpicker'

  export default {
    data() {
      return {
        address: []
      }
    },
    activated() {
      this.getUserAddress()
    },
    methods: {
      getUserAddress() {
        getAddress().then((res) => {
          this.address = res.data
        })
      }
    },
    components: {
      VDistpicker
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .address-wrapper
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
      ul
        .address
          width: 100%
          margin-bottom 25px
          display: flex
          flex-direction: column
          .number
            font-size: 13px
            margin-bottom: 5px
          .address-detail
            display: flex
            flex-direction: column
            border: 1px solid #000000
            padding: 20px
            margin-bottom: 20px
            .information
              font-size: 13px
              margin: 10px 0
            .information-value
              font-size: 13px
              margin: 5px 0 20px 0
              width: 280px

          .button
            cursor: pointer
            color: #ffffff
            background-color: #000000
            border: none
            height: 40px
            width: 80px
            outline: none
            &:hover
              color: #000000
              background-color: #ffffff
              border: 0.5px solid #000000
              transition: all 0.3s
      .button-add
        display: flex
        justify-content: center
        align-items: center
        font-size: 13px
        cursor: pointer
        color: #ffffff
        background-color: #000000
        border: 0.5px solid #000000
        height: 39px
        width: 79px
        outline: none
        margin: 20px 0 30px 0
        &:hover
          color: #000000
          background-color: #ffffff
          border: 0.5px solid #000000
          transition: all 0.3s
</style>
