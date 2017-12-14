<template>
  <div>
    <ul>
      <li class="title footer-list-detail">
        <router-link tag="a" :to="`${link}`">{{title}}</router-link>
      </li>
      <li class="footer-list-detail">
        <router-link tag="a" :to="`${link}-sneakers`">踩的</router-link>
      </li>
      <li class="footer-list-detail">
        <router-link tag="a" :to="`${link}-clothing`">穿的</router-link>
      </li>
      <li class="footer-list-detail">
        <router-link tag="a" :to="`${link}-accessories`">戴的</router-link>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      link: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  a
    color: #f5f5f5
    &:hover
      transition: all 0.3s
      color: #d3d3d3
  div
    margin: 0 10px 0 10px
    width: 100px
    display: inline-block
    font-size: 14px
    font-weight: lighter
    ul
      .footer-list-detail
        padding-top: 12px
        letter-spacing: 2px
      .title
        font-size: 20px
        font-weight: 600
        letter-spacing: 3px
        padding-bottom: 15px
        &:hover
          transition: all 0.2s
          color: #d3d3d
          padding-bottom: 12px
          border-bottom: 0.5px solid #d3d3d3
</style>
