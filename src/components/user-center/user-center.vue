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
      <span class="information-value" v-show="!editFlag">{{userInfo.name}}</span>
      <el-input v-model="userInfo.name" placeholder="请输入内容" class="information-value" v-show="editFlag"></el-input>
      <span class="information">称呼</span>
      <span class="information-value">{{userInfo.call}}</span>
      <span class="information">性别</span>
      <div class="information-value" v-show="editFlag">
        <el-radio v-model="userInfo.gender" label="1">男</el-radio>
        <el-radio v-model="userInfo.gender" label="2">女</el-radio>
      </div>
      <span class="information-value" v-show="!editFlag">{{userInfo.gender}}</span>
      <span class="information">电话号码</span>
      <span class="information-value">{{userInfo.mobile}}</span>
      <span class="information">电子邮箱</span>
      <span class="information-value" v-show="!editFlag">{{userInfo.email}}</span>
      <el-input v-model="userInfo.email" placeholder="请输入内容" class="information-value" v-show="editFlag"></el-input>
    </div>
    <div class="button-wrapper">
      <button class="button" @click="editInfo" v-show="!editFlag">编辑</button>
      <button class="button-cancel" @click="cancelUpdateInfo" v-show="editFlag">取消</button>
      <button class="button" @click="updateInfo" v-show="editFlag">保存信息</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getUserInfo, updateUserInfo} from 'api/api'

  export default {
    data() {
      return {
        userInfo: {},
        editFlag: false
      }
    },
    activated() {
      this.getInfo()
    },
    methods: {
      getInfo() {
        getUserInfo().then((res) => {
          this.userInfo = res.data
          if (this.userInfo.gender === 'female') {
            this.userInfo.gender = '女'
            this.userInfo.call = '女士'
          } else {
            this.userInfo.gender = '男'
            this.userInfo.call = '先生'
          }
        })
      },
      editInfo() {
        this.editFlag = true
      },
      cancelUpdateInfo() {
        this.editFlag = false
      },
      updateInfo() {
        let params = {}
        params.name = this.userInfo.name
        params.mobile = this.userInfo.mobile
        params.email = this.userInfo.email
        if (this.userInfo.gender === '1') {
          params.gender = 'male'
        } else {
          params.gender = 'female'
        }
        updateUserInfo(params).then(() => {
          this.editFlag = false
          this.$router.go(0)
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
        width: 280px
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
        margin: 0 20px
        &:hover
          color: #000000
          background-color: #ffffff
          border: 0.5px solid #000000
          transition: all 0.3s
      .button-cancel
        cursor: pointer
        color: #000000
        background-color: #ffffff
        border: 0.5px solid #000000
        height: 40px
        width: 80px
        outline: none
        margin: 0 20px
        &:hover
          color: #ffffff
          background-color: #000000
          border: none
          transition: all 0.3s
</style>
