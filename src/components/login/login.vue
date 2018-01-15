<template>
  <div class="login-wrapper">
    <div class="form-wrapper">
      <div class="title">
        <span class="bolder">登录</span>
        <span class="bold">我已经是 KeepMoving 的用户</span>
        <span>请输入您的电子邮箱地址和密码来登陆。</span>
      </div>
      <div class="form">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="50px"
                 class="demo-ruleForm">
          <el-form-item label="账 户" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密 码" prop="password">
            <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <span class="alert" v-show="alertFlag">账户或密码错误</span>
          <div class="form-bottom">
            <span class="reg-tips">没有账户?
              <router-link class="reg-link" to="/register">
                [立即注册]
              </router-link>
            </span>
            <span class="third-part-login">
              使用第三方登录:&nbsp;
              <a href="http://127.0.0.1:8000/login/weibo/">
                <i class="fa fa-weibo fa-style"></i>
              </a>
            </span>
            <button class="login" @click="login">登 录</button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {login} from 'api/api'
  import cookie from 'common/js/cookie'
  import {mapMutations} from 'vuex'

  export default {
    data() {
      let checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入账户'))
        }
      }
      let validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'))
        }
      }
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {
              validator: checkUsername,
              trigger: 'blur'
            }
          ],
          password: [
            {
              validator: validatePass,
              trigger: 'blur'
            }
          ]
        },
        alertFlag: false
      }
    },
    created() {
      this.alertFlag = false
    },
    watch: {
      'ruleForm.username': 'defaultAlertFlag',
      'ruleForm.password': 'defaultAlertFlag'
    },
    methods: {
      login() {
        let params = {
          username: this.ruleForm.username,
          password: this.ruleForm.password
        }
        if (params.username && params.password) {
          login(params).then((res) => {
            console.log(res.data)
            cookie.setCookie('name', params.username, 7)
            cookie.setCookie('token', res.data.token, 7)
            this.setUserInfo()
          }, () => {
            this.alertFlag = true
          })
        }
      },
      defaultAlertFlag() {
        this.alertFlag = false
      }
    },
    ...mapMutations({
      setUserInfo: 'SET_USER_INFO'
    })
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .login-wrapper
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
          span
            display: block
            padding: 3px
          .reg-tips
            padding-top: 10px
            font-size: 12px
            .reg-link
              color: #ffA500
          .third-part-login
            font-size: 15px
            font-weight: 700
            color: #808080
            .fa-style
              color: #ff0000
              font-size: 20px
          .login
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
