<template>
  <div class="user-center-wrapper">
    <nav class="breadcrumb">
      <span class="active">个人信息</span>
      <span>订单</span>
      <span>地址簿</span>
    </nav>
    <div class="form-wrapper">
      <span class="title">用户信息</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .user-center-wrapper
    display: flex
    flex-direction: column
    .breadcrumb
      text-align: center
      border-top: 1px solid #d3d3d3
      border-bottom: 1px solid #d3d3d3
      margin-bottom: 30px
      display: flex
      justify-content: center
      height: 50px
      span
        align-self center
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
      .title
        font-size: 24px
        font-weight: 700
</style>
