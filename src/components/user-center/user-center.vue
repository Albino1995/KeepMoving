<template>
  <div class="user-center-wrapper">
    <nav class="breadcrumb">
      <span class="active">个人信息</span>
      <span>订单</span>
      <span>地址簿</span>
    </nav>
    <div class="form-wrapper">
      <span class="title">用户信息</span>
      <span class="information">昵称</span>
      <span class="information-value">{{userInfo.name}}</span>
      <span class="information">称呼</span>
      <span class="information-value">{{userInfo.call}}</span>
      <span class="information">性别</span>
      <span class="information-value">{{userInfo.gender}}</span>
      <span class="information">电话号码</span>
      <span class="information-value">{{userInfo.mobile}}</span>
      <span class="information">电子邮箱</span>
      <span class="information-value">{{userInfo.email}}</span>
    </div>
    <div class="button-wrapper">
      <button class="button">编辑</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getUserInfo} from 'api/api'

  const id = 1

  export default {
    data() {
      return {
        userInfo: {}
      }
    },
    activated() {
      this.getInfo()
    },
    methods: {
      getInfo() {
        getUserInfo(id).then((res) => {
          this.userInfo = res.data
          console.log(this.userInfo)
          if (this.userInfo.gender === 'female') {
            this.userInfo.gender = '女'
            this.userInfo.call = '女士'
          } else {
            this.userInfo.gender = '男'
            this.userInfo.call = '先生'
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .user-center-wrapper
    display: flex
    flex-direction: column
    .breadcrumb
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
      align-self: center
      padding: 50px
      margin: 30px 0
      width: 500px
      border: 1px solid #000000
      display: flex
      flex-direction: column
      .title
        font-size: 24px
        font-weight: 700
        margin-bottom: 30px
      .information
        font-size: 13px
        margin: 10px 0
      .information-value
        font-size: 13px
        margin: 5px 0 20px 0
    .button-wrapper
      align-self center
      margin-bottom: 30px
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
</style>
