<template>
  <div class="register-wrapper">
    <div class="form-wrapper">
      <div class="title">
        <span class="bolder">注册</span>
        <span class="bold">请填写下表来成为KeepMoving的注册用户</span>
        <span>我们将会保存您提供的资料以方便您在网上购物。</span>
      </div>
      <div class="form">
        <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="70px"
                 class="demo-ruleForm">
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="ruleForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input v-model="ruleForm.code">
              <el-button slot="append" @click="sendCode" ref="code">获取验证</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="密 码" prop="password">
            <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <span class="alert">{{alertText}}</span>
          <div class="form-bottom">
            <span class="reg-tips">已有账户?
              <router-link class="reg-link" to="/login">
                [登录]
              </router-link>
            </span>
            <button class="register" @click="register">注 册</button>
          </div>
        </el-form>
      </div>
    </div>
    <confirm @confirm="goIndex"
             text="欢迎成为KeepMoving会员,稍后将跳转至首页或者可以点击下方按钮前往首页"
             :cancelShow=false ref="confirm"></confirm>
  </div>
</template>

<script type="text/ecmascript-6">
  import Confirm from 'base/confirm/confirm'
  import {register, getCode} from 'api/api'
  import cookie from 'common/js/cookie'
  import {mapMutations} from 'vuex'

  const Minute = 60000

  export default {
    data() {
      return {
        ruleForm: {
          mobile: '',
          code: '',
          password: ''
        },
        sendFlag: false,
        alertText: ''
      }
    },
    activated() {
      cookie.delCookie('token')
      cookie.delCookie('name')
      this.setUserInfo()
    },
    watch: {
      'ruleForm.mobile': 'defaultAlertText'
    },
    methods: {
      sendCode() {
        if (this.sendFlag === true) {
          return
        }
        this.sendFlag = true
        if (this.sendFlag === true) {
          let params = {}
          params.mobile = this.ruleForm.mobile
          getCode(params).then((res) => {
          }).catch((err) => {
            this._doErr(err)
          })
          this.$refs.code.$el.innerHTML = '已发送'
          this.$refs.code.$el.style.cursor = 'not-allowed'
          setTimeout(() => {
            this.sendFlag = false
            this.$refs.code.$el.innerHTML = '获取验证'
            this.$refs.code.$el.style.cursor = 'default'
          }, Minute)
        }
      },
      register() {
        let params = {}
        params.username = this.ruleForm.mobile
        params.code = this.ruleForm.code
        params.password = this.ruleForm.password
        if (!this.ruleForm.mobile) {
          this.alertText = '手机不能为空'
          return
        }
        if (!this.ruleForm.code) {
          this.alertText = '验证码不能为空'
          return
        }
        if (!this.ruleForm.password) {
          this.alertText = '密码不能为空'
          return
        }
        register(params).then((res) => {
          cookie.setCookie('name', res.data.username, 7)
          cookie.setCookie('token', res.data.token, 7)
          this.setUserInfo()
          this._showConfirm()
        }).catch((err) => {
          this._doErr(err)
        })
      },
      defaultAlertText() {
        this.alertText = ''
      },
      goIndex() {
        // 点击确认后取消自动跳转首页的计时器
        clearTimeout(this.confirmTimer)
        this.$router.push({path: '/index'})
        this.$refs.confirm.hide()
      },
      _doErr(obj) {
        for (let i in obj) {
          this.alertText = obj[i][0]
          break
        }
      },
      _showConfirm() {
        this.$refs.confirm.show()
        this.confirmTimer = setTimeout(() => {
          this.$router.push({path: '/index'})
          this.$refs.confirm.hide()
        }, 5000)
      },
      ...mapMutations({
        setUserInfo: 'SET_USER_INFO'
      })
    },
    components: {
      Confirm
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .register-wrapper
    width: 100%
    display: flex
    justify-content: center
    align-content: center
    padding-bottom: 30px
    .form-wrapper
      padding: 50px
      margin: 30px 0
      width: 500px
      border: 0.5px solid #d3d3d3
      .title
        span
          display: block
          padding-bottom: 30px
        .bolder
          font-size: 24px
          font-weight: 700
        .bold
          font-size: 18px
          font-weight: 700
      .form
        .alert
          color: #f56c6c
          font-size: 12px
          margin-left: 50px
        .form-bottom
          display: flex
          flex-direction: column
          /*justify-content: flex-end*/
          .reg-tips
            margin-top: 10px
            padding-top: 10px
            font-size: 12px
            .reg-link
              color: #ffA500
          .register
            color: #ffffff
            align-self: flex-end
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
