<template>
  <div class="address-wrapper">
    <nav class="breadcrumb">
      <router-link tag="span" to="/me/info">个人信息</router-link>
      <router-link tag="span" to="/me/order">订单</router-link>
      <span class="active">地址簿</span>
    </nav>
    <div class="form-wrapper">
      <span class="title">地址簿</span>
      <span class="add-default" v-show="!address.length">请点击下方按钮去添加您的收货信息</span>
      <ul v-show="address.length">
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
          <button class="button" @click="_showConfirm(item)">删除地址</button>
        </li>
      </ul>
      <div class="new-address" v-show="addShowFlag">
        <span class="add-information" >所属地区</span>
        <v-distpicker @province="getProvince"  @city="getCity" @area="getArea"></v-distpicker>
        <span class="add-information">详细地址</span>
        <el-input v-model="params.address" placeholder="请输入内容" class="information-input"></el-input>
        <span class="add-information">收货人姓名</span>
        <el-input v-model="params.signer_name" placeholder="请输入内容" class="information-input"></el-input>
        <span class="add-information">收货人联系方式</span>
        <el-input v-model="params.signer_mobile" placeholder="请输入内容" class="information-input"></el-input>
      </div>
      <span class="alert" v-show="alertFlag">请按要求填写完整信息</span>
      <div class="button-add" @click="addUserAddress" v-show="addShowFlag">确认添加</div>
      <div class="button-add" @click="_showNewAddress">新增地址</div>
    </div>
    <confirm text="您确实想删除这个地址吗" @confirm="deleteUserAddress" ref="confirm"></confirm>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getAddress, deleteAddress, addAddress} from 'api/api'
  import Confirm from 'base/confirm/confirm'
  import VDistpicker from 'v-distpicker'

  export default {
    data() {
      return {
        address: [],
        deleteItem: {},
        params: {},
        addShowFlag: false,
        alertFlag: false
      }
    },
    activated() {
      document.title = '地址簿|KeepMoving'
      this.params = {}
      this.deleteItem = {}
      this.addShowFlag = false
      this.alertFlag = false
      this.getUserAddress()
    },
    watch: {
      'params.address': '_hideAlert',
      'params.signer_name': '_hideAlert',
      'params.signer_mobile': '_hideAlert'
    },
    methods: {
      getUserAddress() {
        getAddress().then((res) => {
          this.address = res.data
        })
      },
      addUserAddress() {
        addAddress(this.params).then(() => {
          this.$router.go(0)
        }).catch(() => {
          this.alertFlag = true
        })
      },
      deleteUserAddress() {
        deleteAddress(this.deleteItem.id).then(() => {
          this.$router.go(0)
        })
      },
      getProvince(data) {
        this._hideAlert()
        this.params.province = data.value
      },
      getCity(data) {
        this._hideAlert()
        this.params.city = data.value
      },
      getArea(data) {
        this._hideAlert()
        this.params.district = data.value
      },
      _hideAlert() {
        this.alertFlag = false
      },
      _showNewAddress() {
        this.addShowFlag = true
      },
      _showConfirm(item) {
        this.deleteItem = item
        this.$refs.confirm.show()
      }
    },
    components: {
      Confirm,
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
      .add-default
        font-size: 13px
        margin: 50px 0
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
      .new-address
        width: 100%
        display: flex
        flex-direction: column
        border: 1px solid #000000
        padding: 20px 20px 40px 20px
        margin-bottom: 20px
        .add-information
          font-size: 13px
          margin: 20px 0
        .information-input
          width: 350px
      .alert
        font-size: 13px
        color: #8b0000
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
