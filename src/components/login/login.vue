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
          <el-form-item label="密 码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
          </el-form-item>
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
            <div class="button-group">
              <button class="login" @click="login">登 录</button>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      let checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入账户'))
        }
      }
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        }
      }
      return {
        ruleForm: {
          username: '',
          pass: ''
        },
        rules: {
          username: [
            {
              validator: checkUsername,
              trigger: 'blur'
            }
          ],
          pass: [
            {
              validator: validatePass,
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      login() {
        console.log('login')
      }
    },
    components: {}
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
      width: 500px
      margin-top: 18px
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
        .form-bottom
          .reg-tips
            padding-top: 10px
            font-size: 12px
            .reg-link
              color: #ffA500
          .third-part-login
            margin-left: 245px
            font-size: 15px
            font-weight: 700
            color: #808080
            .fa-style
              color: #ff0000
              font-size: 20px
          .button-group
            margin: 30px 0 0 420px
            .login
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
